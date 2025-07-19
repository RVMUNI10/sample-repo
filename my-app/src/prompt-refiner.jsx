import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./prompt-refiner.css";

export default function PromptRefiner() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {};

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [userPrompt, setUserPrompt] = useState("");
  const [missingElements, setMissingElements] = useState([]);
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

//  const handleRefinePrompt = async () => {
//   setLoading(true);
//   setMissingElements([]);
//   setRefinedPrompt("");
//   setShowDialog(false);

//   try {
//     const response = await fetch("http://localhost:5000/refine", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: userPrompt }),
//     });

//     const data = await response.json();

//     // Simulate detection of missing elements (optional, or can be returned from backend)
//     setMissingElements(["Add more details", "Specify format"]);

//     setRefinedPrompt(data.refined);
//     setShowDialog(true);
//   } catch (error) {
//     console.error("Error refining prompt:", error);
//     setRefinedPrompt("Something went wrong. Please try again later.");
//     setShowDialog(true);
//   } finally {
//     setLoading(false);
//   }
// };

const handleRefinePrompt = async () => {
  setLoading(true);
  setSuggestions("");
  setRefinedPrompt("");

  try {
    const response = await fetch("http://localhost:5000/api/refine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: userPrompt }) // or { prompt: input } based on your state
    });

    const data = await response.json();

    if (response.ok) {
      setSuggestions(data.suggestions);
      setRefinedPrompt(data.refined);
      setShowDialog(true);
    } else {
      console.error("Backend error:", data.error);
      alert("Something went wrong! Please try again.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to connect to backend.");
  }

  setLoading(false);
};


  const handleAddDetails = () => {
    const combinedPrompt = userPrompt + "\n" + additionalDetails;
    setUserPrompt(combinedPrompt);
    setAdditionalDetails("");
    setShowDialog(false);
    handleRefinePrompt(combinedPrompt);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">PromptBuddy</div>
          <div className="navbar-links">
            <button className="nav-btn home" onClick={() => scrollToSection(homeRef)}>Home</button>
            <button className="nav-btn about" onClick={() => scrollToSection(aboutRef)}>About</button>
            <button className="nav-btn contact" onClick={() => scrollToSection(contactRef)}>Contact</button>

            <div
              className={`dropdown ${dropdownOpen ? "open" : ""}`}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="nav-btn templates"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Templates
              </button>
              <div className="dropdown-menu">
                <button onClick={() => navigate("/coding")}>Coding</button>
                <button onClick={() => navigate("/web-search")}>Web Search</button>
                <button onClick={() => navigate("/research")}>Research</button>
                <button onClick={() => navigate("/ai-teaching")}>AI Teaching (School)</button>
                <button onClick={() => navigate("/summary-generator")}>Summary Generator</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero">
        <h1>Craft Flawless AI Prompts</h1>
        <p>PromptBuddy helps you turn vague ideas into detailed, high-performing prompts for AI tools.</p>
        <button className="hero-btn" onClick={() => scrollToSection(homeRef)}>Try It Now</button>
      </section>

      <video
        id="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showDialog && refinedPrompt && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h2>AI Answer</h2>
            <pre>{refinedPrompt}</pre>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      {showDialog && missingElements.length > 0 && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h2>Missing Elements</h2>
            <ul>
              {missingElements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <textarea
              className="input"
              rows={3}
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Add more details here..."
            />
            <button onClick={handleAddDetails}>Submit Details</button>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="container" ref={homeRef} style={{ marginTop: '40rem', marginBottom: '4rem' }}>
        <h1>Prompt Refiner</h1>
        <textarea
          className="input"
          rows={6}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button onClick={handleRefinePrompt}>
          {loading ? <span className="spinner"></span> : "Refine Prompt"}
        </button>

        {missingElements.length > 0 && (
          <div className="card">
            <h2>Missing Elements Detected</h2>
            <ul>
              {missingElements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {refinedPrompt && (
          <div className="card">
            <h2>Refined Prompt</h2>
            <pre>{refinedPrompt}</pre>
          </div>
        )}
      </div>

      <div className="container" ref={aboutRef} style={{ marginTop: '5rem', marginBottom: '4rem' }}>
        <h2>About</h2>
        <p>PromptBuddy helps refine your AI prompts by detecting missing elements and allowing additional input for superior results.</p>
      </div>

      <div className="container" ref={contactRef} style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <h2>Contact</h2>
        <p>For support or feedback, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </div>
    </>
  );
}
