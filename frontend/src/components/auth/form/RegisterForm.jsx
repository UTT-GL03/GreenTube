import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
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
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className="input-text"
            type="text"
            name="username"
            placeholder="Pseudo"
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
          <button className="btn" type="submit">Créer un compte</button>
        </form>
        <p>
          Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
        </p>
      </div>
  );
}

export default RegisterForm;
