const mongoose = require("mongoose");

// Connecting is everything is cool
const dbConnect = async () => {
  try {
    console.log("Tentative de connexion à la base de données...");
    
    await mongoose.connect(
      "mongodb+srv://mohamed:mohamed123@projetpfa.apzxo86.mongodb.net/?appName=projetPFA"
    );

    console.log("Connexion à la base de données réussie !");
  } catch (error) {
    console.error(
      "Erreur lors de la connexion à la base de données :", 
      error
    );
  }
};

module.exports = dbConnect;
