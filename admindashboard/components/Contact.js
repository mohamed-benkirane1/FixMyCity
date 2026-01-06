import React from "react";

const contacts = [
  { ville: "Casablanca", email: "contact.casablanca@ville.ma", tel: "0522-123456" },
  { ville: "Rabat", email: "contact.rabat@ville.ma", tel: "0537-654321" },
  { ville: "Marrakech", email: "contact.marrakech@ville.ma", tel: "0524-987654" },
  { ville: "Fès", email: "contact.fes@ville.ma", tel: "0535-112233" },
  { ville: "Tanger", email: "contact.tanger@ville.ma", tel: "0539-445566" },
  { ville: "Meknès", email: "contact.meknes@ville.ma", tel: "0535-778899" },
];

const Contacts = () => {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      maxWidth: "900px",
      margin: "50px auto"
    }}>
      <h2 style={{ color: "#0077b6", textAlign: "center", marginBottom: "20px" }}>Contacts des villes</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {contacts.map((contact, index) => (
          <div key={index} style={{
            backgroundColor: "#f0f4f8",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#023e8a", marginBottom: "10px" }}>{contact.ville}</h3>
            <p style={{ margin: "5px 0" }}><strong>Email:</strong> {contact.email}</p>
            <p style={{ margin: "5px 0" }}><strong>Téléphone:</strong> {contact.tel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
