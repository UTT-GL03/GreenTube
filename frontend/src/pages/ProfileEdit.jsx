// src/pages/ProfileEdit.jsx
import React, { useState, useEffect } from "react";
import { updateChannel } from "../api/backApi";

export default function ProfileEdit() {
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Pour l’aperçu de l’avatar
  useEffect(() => {
    if (!avatar) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatar);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("description", description);
    if (avatar) {
      form.append("avatar", avatar);
    }

    const channelId = localStorage.getItem("channelId"); // à adapter si besoin
    await updateChannel(channelId, form);

    alert("Profil mis à jour !");
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "100px",
        paddingInline: "16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>
          Modifier votre profil
        </h1>
        <p style={{ marginBottom: "24px", color: "#555" }}>
          Vous pouvez mettre à jour votre photo de profil ainsi que votre description de chaîne
        </p>

        {/* Aperçu avatar + input fichier */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <img
              src={
                previewUrl ||
                "/default-avatar.png" // image par défaut si tu en as une
              }
              alt="avatar preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <p style={{ fontSize: "0.8rem", color: "#777", marginTop: "4px" }}>
              Recommended: square image, at least 256×256px.
            </p>
          </div>
        </div>

        {/* Formulaire description */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="Describe your channel, what kind of content you create, etc."
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#eee",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                setDescription("");
                setAvatar(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#ff0000",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
