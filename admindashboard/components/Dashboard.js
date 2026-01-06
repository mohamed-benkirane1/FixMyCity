import React from "react";
import AccidentCard from "./AccidentCard";
import Contacts from "./Contacts";
import Stats from "./stats";
import SignalementForm from "./SignalementForm";
import { accidents } from "../data/accidents";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#e0f7fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#0077b6" }}>Fix My City</h1>
      <h2 style={{ textAlign: "center", color: "#023e8a", marginBottom: "30px" }}>Problèmes et solutions</h2>

      {/* Formulaire moderne */}
      <SignalementForm />

      {/* Accidents */}
      <div style={{ maxWidth: "900px", margin: "40px auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        {accidents.map(acc => (
          <AccidentCard key={acc.id} accident={acc} />
        ))}
      </div>

      {/* Stats */}
      <Stats />

      {/* Contacts */}
      <Contacts />
    </div>
  );
};

export default Dashboard;
