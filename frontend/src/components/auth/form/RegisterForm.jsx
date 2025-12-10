import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backApi } from "../../../api/backApi";
import { useAuth } from "../../../contexts/AuthContext";

function RegisterForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError("")
    if (formData.password !== formData.confirmPassword) {
      setError("Erreur inscription : Les mots de passe ne correspondent pas !");
      return;
    }
    try {

      const data = await backApi.register(
        formData.username,
        formData.email,
        formData.password
      );

      if (data.error) {
        setError("Erreur inscription : " + data.error);
        return;
      }
      login(data.user)
      navigate("/")
    } 
    catch (err) {
      setError("Erreur inscription : " + err);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="card-md rounded card-bg-opacity mx-auto my-auto py-3 px-2 text-center z-1000">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="input-text"
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input-text"
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="input-text"
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="text-red fs-sm mt-1">
            {error}
          </div>
        )}

        <button className="btn" type="submit">
          {loading ? "Chargement..." : "Créer un compte"}
        </button>
      </form>
      <p>
        Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
      </p>
    </div>
  );
}

export default RegisterForm;
