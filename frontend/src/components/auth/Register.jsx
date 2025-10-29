import { useState } from "react";
import { Link } from "react-router-dom";
import greentubeLogo from "/greentube.svg";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Nouvel utilisateur :", formData);
  };

  return (
    <div className="auth-page">
      {/* Bouton/logo retour accueil */}
      <Link to="/" className="home-button">
        <img src={greentubeLogo} alt="Greentube" />
        Accueil
      </Link>

      <div className="auth-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Pseudo"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Créer un compte</button>
        </form>
        <p>
          Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
