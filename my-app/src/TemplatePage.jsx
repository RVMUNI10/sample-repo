// TemplatePage.jsx
import { useNavigate } from 'react-router-dom';
import './prompt-refiner.css';

export default function TemplatePage({ title }) {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">{title}</div>
          <div className="navbar-links">
            <button className="nav-btn home" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '8rem' }}>
        <h1>{title}</h1>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="card">
            <h2>Dialog Box {index + 1}</h2>
            <textarea className="input" rows={4} placeholder={`Enter content for Dialog ${index + 1}`} />
          </div>
        ))}
      </div>

      <footer className="container" style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '2rem' }}>
        <hr />
        <p>© 2025 PromptBuddy by Raj Muni. All rights reserved.</p>
      </footer>
    </>
  );
}
