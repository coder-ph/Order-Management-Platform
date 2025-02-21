import React, {useState, useRef, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom"
import { MainButton} from "../assets";

const ResetPasswordPage = () => {
    const [code, setCode] = useState(['', '', '', ''])
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [timer, setTimer] = useState(45)
    const [resendDisabled, setResendDisabled] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const inputs = useRef([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const userEmail = location.state?.email || localStorage.getItem('resetEmail')
        if (userEmail) {
            setEmail(userEmail)
        }

        startResendTimer()
    }, [location])

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
                return prevTimer -1
            })
        }, 1000)
        return () => clearInterval(interval)
    }

    const validateCode = () => {
        const codeString = code.join('');
        if (codeString.length !== 4) {
            setError('Please enter 4 digits')
            return false
        }
        if (!/^\d{4}$/.test(codeString)) {
            setError('Code must contain numbers only')
            return false
        }
        return true
    }
    
    const handleChange = (e, index) => {
        const value = e.target.value
        if (value && !/^\d{4}$/.test(value)) return

        const newCode = [...code]
        setCode(newCode)
        setError('')

        // go to next input after typing
        if (value !== '' && index < 3) {
            inputs.current[index + 1].focus()
        }
    }

    const handleBackspace = (e, index) => {
        // move back after pressing backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index -1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        //pasting code
        const pasted = e.clipboardData.getData('text').slice(0, 4)
        if (!/^\d{4}$/.test(pasted)) {
            setError('Pasted content must contain numbers only')
            return
        }
        const newCode = pasted.split('').concat(Array(4).fill('')).slice(0, 4)
        setCode(newCode)
        setError('')
    }

    const handleGetResetPassword = async () => {
        if (!validateCode()) return

        setSubmitting(true)
        setError('')

        try {
            const verificationCode = code.join('')
            // add api here
            console.log('verifying code:', verificationCode)
            //sim api call
            await new Promise(resolve => setTimeout(resolve, 1000))

            //success? navigate to new password page
            navigate('/reset-password/newpassword')
        } catch (error) {
            setError('Verification failed. Please try again')
            console.error('verification failed:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleResend = async() => {
        if (resendDisabled) return

        try {
            setSubmitting(true)
            console.log('Resending code to:', email)
            //*
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            //reset timer and disable resend
            startResendTimer()
            setCode(['', '', '', ''])
            setError('')
            inputs.current[o].focus()
        } catch (error) {
            setError('Failed to resend the code. Please try again.')
            console.error('Resend failed:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleBackToSignIn = () => {
        navigate('/resendpassword')
    }

    return (
        <div className="reset-pass-continer">
            <div className="reset-pass-card">
                <div className="reset-pass-header">
                    <h2 className="reset-pass-subtitle">Enter Code</h2>
                    <p className="reset-pass-subtitle">We sent a code to {email}</p>
                </div>
                <div className="reset-pass-code-container">
                    {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={el = inputs.current[index] = el}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleBackspace(e, index)}
                          onPaste={handlePaste}
                          className={`reset-pass-input ${error && 'reset-pass-input-error'}`}
                          disabled={submitting}
                        />
                    ))}
                </div>

                {error && <div className="reset-pass-error">{error}</div>}
                
                {/*get reset password button*/}
                <MainButton
                  onClick={handleGetResetPassword}
                  disabled={submitting}
                  className='reset-pass-button'
                >
                    {submitting ? 'Verifying...' : 'Get Reset Password'}
                </MainButton>

                {/*resend code button*/}
                <MainButton
                  onClick={handleResend}
                  disabled={resendDisabled || submitting}
                  className={`reset-pass-resend-button ${resendDisabled || submitting ? 'disabled' : ''}`}
                >
                    {resendDisabled ? `Resend code in ${timer}` : 'Resend code'}
                </MainButton>

                <div className="reset-pass-footer">
                    <MainButton
                      onClick={handleBackToSignIn}
                      className='reset-pass-back-button'
                      disabled={submitting}
                    >
                        <span>Back to</span>
                        <span>Sign In</span>
                    </MainButton>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage