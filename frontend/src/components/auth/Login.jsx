import { useState } from "react";
import { Link } from "react-router-dom";
import greentubeLogo from "/greentube.svg";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion :", { username, password });
  };

  return (
    <div className="auth-page">
      <Link to="/" className="home-button">
        <img src={greentubeLogo} alt="Greentube" />
        Accueil
      </Link>

      <div className="auth-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            className="input-text"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-text"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn" type="submit">Se connecter</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
