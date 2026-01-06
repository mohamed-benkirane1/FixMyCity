import React, { useState } from "react";

const AccidentCard = ({ accident }) => {
  const [chosenSolution, setChosenSolution] = useState(null);
  const solutions = ["Police", "Constatateur", "Pompiers", "Services municipaux"];

  return (
    <div style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <h3 style={{ color: "#0077b6" }}>{accident.ville}</h3>
      <p>{accident.description}</p>

      {!chosenSolution ? (
        <div>
          <p><strong>Choisir une solution :</strong></p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {solutions.map(sol => (
              <button
                key={sol}
                onClick={() => setChosenSolution(sol)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#00b4d8",
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
                onMouseOver={e => e.target.style.backgroundColor = "#0077b6"}
                onMouseOut={e => e.target.style.backgroundColor = "#00b4d8"}
              >
                {sol}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ marginTop: "10px", fontWeight: "bold", color: "#023e8a" }}>
          Solution choisie: {chosenSolution}
        </p>
      )}
    </div>
  );
};

export default AccidentCard;
