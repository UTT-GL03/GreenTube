import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion :", { username, password });
  };

  return (
      <div className="card-md rounded card-bg-opacity mx-auto my-auto py-3 px-2 text-center z-1000">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
  );
}

export default LoginForm;
