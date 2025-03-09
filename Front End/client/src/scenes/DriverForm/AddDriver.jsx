import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import DasshboardHeader from "../../Components/DasshboardHeader";
import axios from "axios"; 

const initialValues = {
  name: "",
  defaultPassword: "",
  email: "",
  contact: "",
  address: "",
  rore: "driver",
};

const phonRegex = /^(?:\+254|254|0)?7\d{8}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  defaultPassword: yup.string().required("required"),
  email: yup.string().email("Invalid email address").required("required"),
  contact: yup
    .string()
    .matches(phonRegex, "phone number is not valid!")
    .required("required"),
  address: yup.string().required("required"),
  
});

const AddDriver = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      
      const response = await axios.post(
        "api/drivers",
        values
      );

      
      console.log("Driver created successfully:", response.data);
    } catch (error) {
      
      console.error("Error creating driver:", error);
    }
  };

  return (
    <Box mb="20px" p={5}>
      <DasshboardHeader
        title="Create User"
        subtitle="Create a new Driver Profile"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Default Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.defaultPassword}
                name="defaultPassword"
                error={!!touched.defaultPassword && !!errors.defaultPassword}
                helperText={touched.defaultPassword && errors.defaultPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />

              <Box
                gridColumn="span 4"
                display="flex"
                justifyContent="end"
                mt="20px"
                paddingRight="20px"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Create new Driver
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddDriver;
