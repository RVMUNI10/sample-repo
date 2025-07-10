import { useNavigate } from "react-router-dom";

export default function ResearchPage() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">PromptBuddy</div>
          <button className="nav-btn home" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '8rem' }}>
        <h1>Research Templates</h1>
        {[...Array(10)].map((_, idx) => (
          <div className="card" key={idx}>Dialog Box {idx + 1}</div>
        ))}
      </div>

      <footer style={{ textAlign: "center", marginBottom: "2rem", color: "#64748b" }}>
        <p>© 2025 PromptBuddy. Created by Raj Muni.</p>
      </footer>
    </>
  );
}
