import React from "react";

const accidentsParVille = [
  { ville: "Casablanca", count: 12 },
  { ville: "Rabat", count: 8 },
  { ville: "Marrakech", count: 5 },
  { ville: "Fès", count: 7 },
  { ville: "Tanger", count: 4 },
  { ville: "Meknès", count: 3 }
];

const Stats = () => {
  const totalAccidents = accidentsParVille.reduce((sum, item) => sum + item.count, 0);

  return (
    <div style={{
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      maxWidth: "800px",
      margin: "40px auto"
    }}>
      <h2 style={{ color: "#0077b6", textAlign: "center", marginBottom: "20px" }}>Statistiques des accidents</h2>

      <ul style={{ padding: 0 }}>
        {accidentsParVille.map((stat, index) => {
          const percent = ((stat.count / totalAccidents) * 100).toFixed(1);
          return (
            <li key={index} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              listStyle: "none",
              backgroundColor: "#f0f4f8",
              padding: "10px 15px",
              borderRadius: "8px"
            }}>
              <div style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                backgroundColor: "#0077b6",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginRight: "15px",
                flexShrink: 0
              }}>
                {index + 1}
              </div>
              <div>
                <strong style={{ color: "#023e8a" }}>{stat.ville}</strong> : {stat.count} accident(s)
                <span style={{ color: "#0077b6", fontWeight: "bold", marginLeft: "8px" }}>({percent}%)</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Stats;
