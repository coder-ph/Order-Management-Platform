import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../Redux/Auth/authsActions";
import { selectisAuthenticated } from "../Redux/Auth/authsSelectors";

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectisAuthenticated);
  const [password, setShowPassword] = useState(fasle);

  const [showConfirmPassword, setShowConfirmPassword] = useState(fasle);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match")
        .required("Confirm password is required"),
    }),
  });
  return <div></div>;
};

export default SetNewPassword;
