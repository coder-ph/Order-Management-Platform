import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MainButton } from "../Components/Buttons/Buttons";
import coverImage from "../assets/Images/inventory-management.jpg";
import "../assets/styles/ResetPasswordPage.css";
import axios from "axios"; 

const ResetPasswordPage = () => {
  const [code, setCode] = useState(["", "", "", ""])
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(45)
  const [resendDisabled, setResendDisabled] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const inputs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userEmail =
      location.state?.email || localStorage.getItem("resetEmail")
    if (userEmail) {
      setEmail(userEmail)
    }

    startResendTimer()
  }, [])

  const startResendTimer = () => {
    setResendDisabled(true)
    setTimer(45)

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }

  const validateCode = () => {
    const codeString = code.join("")
    if (codeString.length !== 4) {
      setError("Please enter 4 digits")
      return false
    }
    if (!/^\d{4}$/.test(codeString)) {
      setError("Code must contain numbers only")
      return false
    }
    return true
  }

  const handleChange = (e, index) => {
    const value = e.target.value
    if (value && !/^\d{1}$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError("")

    if (value !== "" && index < 3) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()

    const pasted = e.clipboardData.getData("text").slice(0, 4)
    if (!/^\d{4}$/.test(pasted)) {
      setError("Pasted content must contain numbers only")
      return
    }
    const newCode = pasted.split("").concat(Array(4).fill("")).slice(0, 4)
    setCode(newCode)
    setError("")
  }

  const handleGetResetPassword = async () => {
    if (!validateCode()) return

    setSubmitting(true)
    setError("")

    try {
      const verificationCode = code.join("")

      const response = await axios.post("/api/verify-reset-code", {
        email,
        code: verificationCode,
      })

      if (response.data.success) {
        navigate("/reset-password/newpassword", { state: { email } })
      } else {
        setError("Invalid code. Please try again.")
      }
    } catch (error) {
      setError("Verification failed. Please try again")
      console.error("Verification failed:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (resendDisabled) return

    try {
      setSubmitting(true)

      const response = await axios.post("/api/resend-reset-code", { email })

      if (response.data.success) {
        startResendTimer()
        setCode(["", "", "", ""])
        setError("")
        inputs.current[0]?.focus()
      } else {
        setError("Failed to resend the code. Please try again.")
      }
    } catch (error) {
      setError("Failed to resend the code. Please try again.")
      console.error("Resend failed:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="reset-pass-page">
      <div className="reset-pass-container">
        <div className="reset-pass-left">
          <h1>
            The Optimal<br></br> Order<br></br> Management System
          </h1>
          <p>Manage your orders with ease</p>
          <img src={coverImage} alt="cover" className="cover-image" />
        </div>
        <div className="reset-pass-right">
          <div className="reset-pass-header">
            <h2>Enter Code</h2>
            <p className="reset-pass-subtitle">
              We sent a code to <span>{email}</span>
            </p>
          </div>
          <div className="reset-pass-code-container">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                onPaste={handlePaste}
                className={`reset-pass-input ${
                  error && "reset-pass-input-error"
                }`}
                disabled={submitting}
              />
            ))}
          </div>

          {error && <div className="reset-pass-error">{error}</div>}

          <MainButton
            onClick={handleGetResetPassword}
            disabled={submitting}
            className="reset-pass-button"
            style={{ margin: "10px auto" }}
          >
            {submitting ? "Verifying..." : "Get Reset Password"}
          </MainButton>

          <MainButton
            onClick={handleResend}
            disabled={resendDisabled || submitting}
            className={`reset-pass-resend-button ${
              resendDisabled || submitting ? "disabled" : ""
            }`}
            style={{
              backgroundColor: "transparent",
              color: "#7e0404",
              border: "1px solid #7e0404",
            }}
          >
            {resendDisabled ? `Resend code in ${timer}s` : "Resend code"}
          </MainButton>

          <div className="reset-pass-footer">
            <Link to="/login">
              Back to <span>Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage;
