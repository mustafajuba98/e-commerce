import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import InputField from "../components/Inputfield";
import { useHistory,Link } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);


  const regexPatterns = {
    fullName: /^[a-zA-Z0-9 ]+$/,
    username: /^[a-z0-9._,-]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      return "This field is required";
    }
    if (regexPatterns[name] && !regexPatterns[name].test(value)) {
      switch (name) {
        case "fullName":
          error = "Full name can only contain letters, numbers, and spaces";
          break;
        case "username":
          error = "Username can only contain lowercase letters, numbers, ., _, or -";
          break;
        case "email":
          error = "Invalid email format";
          break;
        case "password":
          error = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    let updatedErrors = { ...errors, [name]: validateField(name, value) };

    if (name === "confirmPassword" && value !== formValues.password) {
      updatedErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(updatedErrors);
  };

  const validate = () => {
    const tempErrors = {};
    Object.keys(formValues).forEach((key) => {
      tempErrors[key] = validateField(key, formValues[key]);
    });
    if (formValues.confirmPassword !== formValues.password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let users = JSON.parse(localStorage.getItem("userData")) || [];
    const { confirmPassword, ...userData } = formValues;

    if (users.some(user => user.username === userData.username)) {
      setSnackbarMessage("Username already exists!");
      setShowSnackbar(true);
      return;
    }
    if (users.some(user => user.email === userData.email)) {
      setSnackbarMessage("Email already exists!");
      setAlertVariant("danger");
      setShowSnackbar(true);
      return;
    }

    users.push(userData);
    localStorage.setItem("userData", JSON.stringify(users));

    setSnackbarMessage("Registration successful!");
    setAlertVariant("success");
    setShowSnackbar(true);

    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        {showSnackbar && <Alert variant={alertVariant} className="mb-4">{snackbarMessage}</Alert>}
        <h2 className="text-center mb-4 fw-bold fs-3">Register</h2>
        <Form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            isInvalid={Boolean(errors.fullName)}
            feedback={errors.fullName}
          />
          <InputField
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            isInvalid={Boolean(errors.username)}
            feedback={errors.username}
          />
          <InputField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            isInvalid={Boolean(errors.email)}
            feedback={errors.email}
          />
          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formValues.password}
            onChange={handleChange}
            isInvalid={Boolean(errors.password)}
            feedback={errors.password}
            showPasswordToggle
            onPasswordToggle={() => setPasswordVisible(!passwordVisible)}
          />
        <br />
          <InputField
            label="Confirm Password"
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            isInvalid={Boolean(errors.confirmPassword)}
            feedback={errors.confirmPassword}
            showPasswordToggle
            onPasswordToggle={() => setconfirmPasswordVisible(!confirmPasswordVisible)}
          />
          <Button variant="primary" type="submit" className="w-100 mt-3 fw-bold fs-3">
            Register
          </Button>
        </Form>
        <div className="mb-3"></div>
        <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-3">I already have an account</span>
                  <hr className="flex-grow-1" />
                </div>
        
                <div className="mb-3"></div>
                <div className="mb-3">
                 
                 <Link to="/Login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none">
                    Login
                  </Link>
                </div>
      </Card>
    </Container>
  );
};

export default RegisterForm;
