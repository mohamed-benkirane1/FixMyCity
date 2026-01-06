import React, { useState, useEffect } from "react";

const SignalementForm = () => {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [type, setType] = useState("Accident de voiture");
  const [gravite, setGravite] = useState("Moyenne");
  const [solution, setSolution] = useState(""); // <-- nouveau champ
  const [position, setPosition] = useState({ lat: "", lng: "" });

  const solutions = ["Police", "Constatateur", "Pompiers", "Services municipaux", "Email"];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!solution) {
      alert("Veuillez choisir la solution à contacter !");
      return;
    }

    console.log({ description, media, type, gravite, solution, position });
    alert(`Signalement envoyé à ${solution} !`);

    // Réinitialisation du formulaire
    setDescription("");
    setMedia(null);
    setType("Accident de voiture");
    setGravite("Moyenne");
    setSolution("");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "#f9faff",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      maxWidth: "500px",
      margin: "30px auto"
    }}>
      <h3 style={{ color: "#0077b6", textAlign: "center", fontSize: "1.8rem" }}>Nouveau signalement</h3>

      {/* Type de problème */}
      <label style={{ fontWeight: "bold", color: "#023e8a" }}>
        Type de problème :
        <select value={type} onChange={e => setType(e.target.value)} style={{
          marginTop: "5px", padding: "10px", borderRadius: "12px", border: "1px solid #ccc", backgroundColor: "#fff", width: "100%"
        }}>
          <option>Accident de voiture</option>
          <option>Nid-de-poule / routes endommagées</option>
          <option>Feux rouges défectueux</option>
          <option>Panneaux de signalisation manquants ou illisibles</option>
          <option>Embouteillage / trafic bloqué</option>
          <option>Routes inondées</option>
          <option>Déchets / débris sur la route</option>
          <option>Trottoirs endommagés</option>
          <option>Chutes d’arbres / branches sur la route</option>
          <option>Animaux sur la route</option>
          <option>Travaux non signalés</option>
          <option>Éclairage public défectueux</option>
          <option>Passage piéton dangereux</option>
          <option>Vol ou vandalisme de mobilier urbain</option>
          <option>Autre</option>
        </select>
      </label>

      {/* Gravité */}
      <label style={{ fontWeight: "bold", color: "#023e8a" }}>
        Gravité :
        <select value={gravite} onChange={e => setGravite(e.target.value)} style={{
          marginTop: "5px", padding: "10px", borderRadius: "12px", border: "1px solid #ccc", backgroundColor: "#fff", width: "100%"
        }}>
          <option>Mineure</option>
          <option>Moyenne</option>
          <option>Grave</option>
        </select>
      </label>

      {/* Choix de la solution / contact */}
      <label style={{ fontWeight: "bold", color: "#023e8a" }}>
        Contacter :
        <select value={solution} onChange={e => setSolution(e.target.value)} style={{
          marginTop: "5px", padding: "10px", borderRadius: "12px", border: "1px solid #ccc", backgroundColor: "#fff", width: "100%"
        }}>
          <option value="">-- Choisir une solution --</option>
          {solutions.map((sol, i) => (
            <option key={i} value={sol}>{sol}</option>
          ))}
        </select>
      </label>

      {/* Description */}
      <label style={{ fontWeight: "bold", color: "#023e8a" }}>
        Description :
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Décris le problème..."
          rows={4}
          style={{ marginTop: "5px", padding: "12px", borderRadius: "12px", border: "1px solid #ccc", fontSize: "1rem", resize: "vertical", width: "100%", backgroundColor: "#fff" }}
          required
        />
      </label>

      {/* Photo */}
      <label style={{ fontWeight: "bold", color: "#023e8a" }}>
        Photo :
        <input
          type="file"
          accept="image/*"
          onChange={e => setMedia(e.target.files[0])}
          style={{ marginTop: "5px", width: "100%" }}
        />
      </label>

      {/* Position */}
      <p style={{ fontSize: "0.9rem", color: "#555", fontStyle: "italic", textAlign: "center" }}>
        Position détectée : {position.lat && position.lng ? `${position.lat}, ${position.lng}` : "En cours..."}
      </p>

      <button type="submit" style={{
        padding: "12px",
        backgroundColor: "#00b4d8",
        color: "white",
        border: "none",
        borderRadius: "15px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "all 0.3s",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
      onMouseOver={e => e.target.style.backgroundColor = "#0077b6"}
      onMouseOut={e => e.target.style.backgroundColor = "#00b4d8"}
      >
        Envoyer le signalement
      </button>
    </form>
  );
};

export default SignalementForm;
