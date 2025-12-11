import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backApi } from "../../../api/backApi";
import { useAuth } from "../../../contexts/AuthContext";

function LoginForm() {
  // HOOKs
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // FUNCTIONs
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError("")
    try {
      const res = await backApi.login(identifier, password);

      if (!res.success) {
        setError(res.message);
        return;
      }
      login(res.data.user)
      navigate("/")
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false)
    }
  };

  //
  return (
    <div className="card-md rounded card-bg-opacity mx-auto my-auto py-3 px-2 text-center z-1000">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="input-text"
          type="text"
          placeholder="Nom d'utilisateur ou e-mail"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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

        {error && (
          <div className="text-red fs-sm mt-1">
            {error}
          </div>
        )}

        <button className="btn" type="submit">
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default LoginForm;
