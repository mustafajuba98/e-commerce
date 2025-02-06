import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import InputField from "../components/Inputfield";
import { useHistory } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const tempErrors = {};
    if (!formValues.fullName) tempErrors.fullName = "Full name is required";
    if (!formValues.username) tempErrors.username = "Username is required";
    if (!formValues.email) tempErrors.email = "Email is required";
    if (!formValues.password) tempErrors.password = "Password is required";
    if (formValues.password.length < 8)
      tempErrors.password = "Must be at least 8 characters";
    if (!formValues.confirmPassword)
      tempErrors.confirmPassword = "Confirm your password";
    if (formValues.confirmPassword !== formValues.password)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let users = JSON.parse(localStorage.getItem("userData")) || [];
    const { confirmPassword, ...userData } = formValues;
    
    const userExists = users.some(user => user.username === userData.username);
    const emailExists = users.some(user => user.email === userData.email);
    
    if (userExists) {
      setSnackbarMessage("Username already exists!");
      setShowSnackbar(true);
      return;
    }
    
    if (emailExists) {
      setSnackbarMessage("Email already exists!");
      setShowSnackbar(true);
      return;
    }
    
    users.push(userData);
    localStorage.setItem("userData", JSON.stringify(users));

    setSnackbarMessage("Registration successful!");
    setShowSnackbar(true);

    setTimeout(() => {
      history.push("/login");  // المفروض هحط هنا صفحة اللوجين 
    }, 2000);
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Register</h3>
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
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            isInvalid={Boolean(errors.email)}
            feedback={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            isInvalid={Boolean(errors.password)}
            feedback={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            isInvalid={Boolean(errors.confirmPassword)}
            feedback={errors.confirmPassword}
          />
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Register
          </Button>
        </Form>
        {showSnackbar && (
          <Alert variant="danger" className="mt-3">
            {snackbarMessage}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default RegisterForm;
