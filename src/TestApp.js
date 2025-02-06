import logo from "./logo.svg";
import "./App.css";
import RegisterForm from "./pages/register";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function TestApp() {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
}

export default TestApp;
