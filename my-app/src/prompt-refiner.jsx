import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./prompt-refiner.css";

export default function PromptRefiner() {
  // Refs for scrolling
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {};
  // Scroll to section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [userPrompt, setUserPrompt] = useState("");
  const [missingElements, setMissingElements] = useState([]);
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // <-- ADD THIS LINE
  const [additionalDetails, setAdditionalDetails] = useState(""); // <-- NEW STATE

  // Refine prompt, optionally with a new prompt value
  const handleRefinePrompt = async (prompt = userPrompt) => {
    setLoading(true);
    setMissingElements([]);
    setRefinedPrompt("");
    setShowDialog(false);

    // Simulate API
    setTimeout(() => {
      setMissingElements(["Add more details", "Specify format"]);
      setRefinedPrompt("This is a refined version of your prompt.");
      setLoading(false);
      setShowDialog(true);
    }, 1000);

    // Uncomment for real API
    // const response = await fetch("/api/refine-prompt", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt }),
    // });
    // const data = await response.json();
    // setMissingElements(data.missingElements);
    // setRefinedPrompt(data.refinedPrompt);
    // setLoading(false);
    // setShowDialog(true);
  };

  // Allow user to add more details and re-refine
  const handleAddDetails = () => {
    const combinedPrompt = userPrompt + "\n" + additionalDetails;
    setUserPrompt(combinedPrompt);
    setAdditionalDetails("");
    setShowDialog(false);
    handleRefinePrompt(combinedPrompt);
  };

  return (
    <>
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">PromptRefiner</div>
          <div className="navbar-links">
            <button className="nav-btn home" onClick={() => scrollToSection(homeRef)}>Home</button>
            <button className="nav-btn about" onClick={() => scrollToSection(aboutRef)}>About</button>
            <button className="nav-btn contact" onClick={() => scrollToSection(contactRef)}>Contact</button>
            <button className="nav-btn templates" onClick={() => navigate && navigate('/templates')}>Templates</button>
          </div>
        </div>
      </nav>
      {/* Background Video */}
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

      {/* Dialog Box for AI Answer */}
      {showDialog && refinedPrompt && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h2>AI Answer</h2>
            <pre>{refinedPrompt}</pre>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Dialog Box for Missing Elements + Add Details */}
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
        {/* Background Overlay
        <div className="background-overlay"></div> */}
        


      {/* Main UI Container */}
      <div className="container" ref={homeRef}>
        <h1>AI Prompt Refiner</h1>

        <textarea
          className="input"
          rows={6}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />

        <button onClick={handleRefinePrompt} disabled={loading}>
          {loading ? "Refining..." : "Refine Prompt"}
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

      {/* About Section */}
      <div className="container" ref={aboutRef} style={{ marginTop: 40 }}>
        <h2>About</h2>
        <p>This tool helps you refine your AI prompts by suggesting missing elements and allowing you to add more details for better results.</p>
      </div>

      {/* Contact Section */}
      <div className="container" ref={contactRef} style={{ marginTop: 40, marginBottom: 40 }}>
        <h2>Contact</h2>
        <p>For support or feedback, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </div>
    </>
  );
}
