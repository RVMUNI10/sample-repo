import { useNavigate } from "react-router-dom";

export default function CodingPage() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">PromptBuddy</div>
          <button className="nav-btn home" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '30rem' }}>
        <h1>Coding Templates</h1>
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
// This component is a simple page that displays a title and a list of dialog boxes.
// It uses the `useNavigate` hook from `react-router-dom` to navigate back to the home page.
// The page is styled with a navbar, a container for the content, and a footer.