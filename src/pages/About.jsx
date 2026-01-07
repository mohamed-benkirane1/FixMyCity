/**
 * About - Page À propos
 */

import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="about-page">
        <div className="about-container">
          <h1>À propos de FixMyCity</h1>
          
          <section className="about-section">
            <h2><i className="fa fa-lightbulb"></i> Notre mission</h2>
            <p>
              FixMyCity est une plateforme collaborative qui permet aux citoyens 
              de signaler facilement les problèmes urbains rencontrés dans leur 
              quotidien. Qu'il s'agisse de voirie dégradée, d'éclairage public 
              défaillant ou de dépôts sauvages, notre application facilite la 
              communication entre les habitants et les services municipaux.
            </p>
          </section>

          <section className="about-section">
            <h2><i className="fa fa-users"></i> Comment ça marche ?</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Signalez</h3>
                <p>Prenez une photo du problème et remplissez le formulaire.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Suivez</h3>
                <p>Visualisez l'état d'avancement de votre signalement.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Résolu</h3>
                <p>Le problème est traité par les services compétents.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2><i className="fa fa-star"></i> Nos valeurs</h2>
            <ul className="values-list">
              <li><strong>Transparence</strong> - Suivez le traitement de vos signalements</li>
              <li><strong>Efficacité</strong> - Transmission directe aux équipes concernées</li>
              <li><strong>Citoyenneté</strong> - Participation active à l'amélioration de la ville</li>
            </ul>
          </section>

          <section className="about-section contact">
            <h2><i className="fa fa-envelope"></i> Nous contacter</h2>
            <p>
              Une question ? Suggestions ? N'hésitez pas à nous écrire à 
              <a href="mailto:contact@fixmycity.fr"> contact@fixmycity.fr</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
