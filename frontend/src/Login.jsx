import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion :", { username, password });
    // future: appel API backend
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default Login;
