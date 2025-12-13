import { Link } from "react-router-dom";

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
      bg-full
      blur-overlay
    ">
      <Link to="/" className="
        absolute 
        top-0 left-0 
        m-2
        flex items-center gap-1
        p-2
        rounded-md
        bg-white 
        text-dark
        fw-bold
      ">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24" fill="green">
          <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
        </svg>
        Accueil
      </Link>
      {
        mode === "login" ? <LoginForm /> : <RegisterForm />
      }
    </div>
  );
}

export default Auth;
