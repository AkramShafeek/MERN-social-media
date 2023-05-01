import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    console.log("Registering");
    console.log(values);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name);

    const url = 'http://localhost:3001/auth/register/';

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const savedUserResponse = await axios.post(url, formData, config);
      onSubmitProps.resetForm();
      setPageType('login');
    } catch (error) {
      onSubmitProps.resetForm();
      navigate('/');
    }
  }

  const login = async (values, onSubmitProps) => {

    const url = 'http://localhost:3001/auth/login/';

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const loggedInResponse = await axios.post(url, JSON.stringify(values), config);
      onSubmitProps.resetForm();
      dispatch(setLogin({
        user: loggedInResponse.data.user,
        token: loggedInResponse.data.token
      }));
      navigate('/home');
    } catch (error) {
      onSubmitProps.resetForm();
      navigate('/');
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("in handle submit")
    console.log(values);
    console.log(onSubmitProps);
    // console.log(isLogin, isRegister)
    // return;
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns={"repeat(4,minmax(0,1fr"}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
            }}>
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstname"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastname"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn={"span 4"}
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    mulitple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Upload Profile Picture</p>
                          ) : (
                            <FlexBetween>
                              <Typography>
                                {values.picture.name}
                              </Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      );
                    }}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>

          <Box display={"grid"}>
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover" : {
                  backgroundColor: palette.primary.main
                }
              }}>
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Button
              variant="outlined"
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}>
              {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form;