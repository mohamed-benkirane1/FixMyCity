import { Link } from 'react-router-dom';
import { MapPin, Mail, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-mark"><MapPin className="w-5 h-5" /></div>
            <div className="brand-copy">
              <div className="brand-title">FixMyCity</div>
              <p className="brand-desc">Une plateforme dédiée à l'amélioration de la vie urbaine. Signalez, suivez, et contribuez à une ville meilleure.</p>
              <div className="socials">
                <a href="#" aria-label="Facebook" className="social-link" title="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.443 17.627 2 12 2S2 6.443 2 12.07c0 4.99 3.656 9.128 8.438 9.93v-7.03H7.898v-2.9h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.9h-2.33v7.03C18.344 21.197 22 17.06 22 12.07z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="social-link" title="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.96-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.92 2.2-4.92 4.917 0 .385.045.76.127 1.121C7.728 8.825 4.1 6.86 1.671 3.886c-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.23-.616v.06c0 2.385 1.698 4.374 3.946 4.827a4.996 4.996 0 0 1-2.224.085 4.936 4.936 0 0 0 4.604 3.417A9.867 9.867 0 0 1 1 19.54a13.94 13.94 0 0 0 7.548 2.212c9.055 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.016-.634A9.935 9.935 0 0 0 23 4.557z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <h4>Liens rapides</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/reports">Tous les signalements</Link></li>
              <li><Link to="/report/new">Créer un signalement</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li><Mail className="w-4 h-4" /> <a href="mailto:support@fixmycity.com">support@fixmycity.com</a></li>
              <li><MapPin className="w-4 h-4" /> <span>Fès, Maroc</span></li>
            </ul>
          </div>


        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">&copy; {new Date().getFullYear()} FixMyCity. Tous droits réservés.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
