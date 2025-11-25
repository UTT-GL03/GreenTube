import { Link } from "react-router-dom";
import greentubeLogo from "/greentube.svg";
import LoginForm from "../components/auth/form/LoginForm";
import RegisterForm from "../components/auth/form/RegisterForm";

function Auth({ mode = "login" }) {

  return (
    <div className="
      fixed top-0 left-0 
      w-full h-screen 
      flex flex-col justify-center items-center 
      relative
      bg-login-img 
      bg-cover 
      bg-center 
      bg-no-repeat 
      bg-fixed
      blur-overlay
    ">
      <Link to="/" className="
        absolute 
        top-0 left-0 
        mx-2 my-2
        flex items-center gap-1
        px-2 py-1
        rounded
        bg-white 
        shadow-header 
        text-dark
        fw-bold
      ">
        <img src={greentubeLogo} alt="Greentube" />
        Accueil
      </Link>
      {
        mode === "login" ? <LoginForm /> : <RegisterForm />
      }
    </div>
  );
}

export default Auth;
