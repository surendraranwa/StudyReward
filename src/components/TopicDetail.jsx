import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF

const topicsData = {
  react: [
    { id: 1, name: "Components & Props", date: "2025-03-15", status: "Complete", routingUrl: "/topics/react/components-props" },
    { id: 2, name: "State & Lifecycle", date: "2025-03-20", status: "Incomplete", routingUrl: "/topics/react/state-lifecycle" },
    { id: 3, name: "Hooks", date: "2025-03-25", status: "Pending", routingUrl: "/topics/react/hooks" },
    { id: 4, name: "Context API", date: "2025-04-01", status: "Coming Soon", routingUrl: "/topics/react/context-api" }
  ],
  html: [
    { id: 1, name: "HTML Basics", date: "2025-03-12", status: "Complete", routingUrl: "/topics/html/html-basics" },
    { id: 2, name: "Forms & Inputs", date: "2025-03-18", status: "Incomplete", routingUrl: "/topics/html/forms-inputs" },
    { id: 3, name: "HTML5 Semantic Elements", date: "2025-03-22", status: "Pending", routingUrl: "/topics/html/html5-semantic" },
    { id: 4, name: "Web Accessibility", date: "2025-03-30", status: "Coming Soon", routingUrl: "/topics/html/web-accessibility" }
  ],
  css: [
    { id: 1, name: "CSS Selectors", date: "2025-03-14", status: "Complete", routingUrl: "/topics/css/css-selectors" },
    { id: 2, name: "Flexbox & Grid", date: "2025-03-21", status: "Incomplete", routingUrl: "/topics/css/flexbox-grid" },
    { id: 3, name: "CSS Animations", date: "2025-03-27", status: "Pending", routingUrl: "/topics/css/css-animations" },
    { id: 4, name: "Responsive Design", date: "2025-04-03", status: "Coming Soon", routingUrl: "/topics/css/responsive-design" }
  ],
  javascript: [
    { id: 1, name: "ES6 Features", date: "2025-03-16", status: "Complete", routingUrl: "/topics/javascript/es6-features" },
    { id: 2, name: "DOM Manipulation", date: "2025-03-23", status: "Incomplete", routingUrl: "/topics/javascript/dom-manipulation" },
    { id: 3, name: "Async/Await", date: "2025-03-29", status: "Pending", routingUrl: "/topics/javascript/async-await" },
    { id: 4, name: "Web APIs", date: "2025-04-05", status: "Coming Soon", routingUrl: "/topics/javascript/web-apis" }
  ]
};

const statusColors = {
  Complete: "success",
  Incomplete: "danger",
  Pending: "warning",
  "Coming Soon": "secondary"
};

export function TopicDetail() {
  const { tech, topicName } = useParams();
  const [studyMaterial, setStudyMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizedTopicName = topicName.replace(/-/g, " ");
  const topic = topicsData[tech]?.find(t => 
    t.name.toLowerCase() === normalizedTopicName.toLowerCase() || 
    t.routingUrl.split('/').pop().replace(/-/g, " ") === normalizedTopicName.toLowerCase()
  );

  // Fixed prompt for Google Gemini API
  const generateStudyPrompt = () => {
    return {
      contents: [
        {
          parts: [
            {
              text: `You are an expert tutor in ${tech}. Provide detailed, beginner-friendly study material for the topic "${topic.name}" in ${tech}. Include an introduction, key concepts, practical examples, and a summary.`
            }
          ]
        }
      ]
    };
  };

  // Function to call the Google Gemini API
  const handleStudyClick = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 
      if (!apiKey) {
        throw new Error("API key is missing. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
      }
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        generateStudyPrompt(),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const studyContent = response.data.candidates[0].content.parts[0].text;
      setStudyMaterial(studyContent);
    } catch (err) {
      setError(err.message || "Failed to generate study material. Please check your API key or try again.");
      console.error("API Error:", err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate and download multi-page PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm for A4
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm for A4
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;
    let y = margin;

    // Add title
    doc.setFontSize(18);
    doc.text(`${topic.name} - Study Material`, margin, y);
    y += 10;

    // Add metadata
    doc.setFontSize(12);
    doc.text(`Technology: ${tech.toUpperCase()}`, margin, y);
    y += 10;
    doc.text(`Due Date: ${topic.date}`, margin, y);
    y += 10;
    doc.text(`Status: ${topic.status}`, margin, y);
    y += 15; // Extra space before content

    // Add study material with multi-page support
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(studyMaterial, maxWidth); // Split text to fit width
    const lineHeight = 5; // Height per line

    splitText.forEach(line => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage(); // Add new page if content overflows
        y = margin; // Reset y position
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Save the PDF
    doc.save(`${topic.name.replace(/ & /g, '_')}_Study_Material.pdf`);
  };

  // Error handling for invalid tech or topic
  if (!tech || !topicsData[tech]) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-danger">Technology "{tech}" not found</h2>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-danger">Topic "{normalizedTopicName}" not found in {tech.toUpperCase()}</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Left Section: Topic Details (3 columns) */}
        <div className="col-md-3" style={{ position: "sticky", top: "20px", height: "60vh" }}>
          <div className="card py-4 px-2 shadow-lg h-100">
            <h5 className="px-2 fw-bold" style={{ color: "#6A9C89" }}>{topic.name}</h5>
            <div className="card-body">
              <p><strong>Technology:</strong> {tech.toUpperCase()}</p>
              <p><strong>Status:</strong> <span className={`badge bg-${statusColors[topic.status]}`}>{topic.status}</span></p>
              <p><strong>Due Date:</strong> {topic.date}</p>
              <p><strong>Description:</strong> This is a detailed view of {topic.name} under {tech.toUpperCase()}.</p>
            </div>
          </div>
        </div>

        {/* Right Section: Study Material (9 columns) */}
        <div className="col-md-9" style={{ marginBottom: "40px", minHeight: "60vh" }}>
          <div className="card p-4 shadow-lg h-100">
            <h4 className="text-center fw-bold mb-4" style={{ color: "#6A9C89" }}>Study Material</h4>
            <div className="card-body">
              {studyMaterial ? (
                <div className="study-content" style={{ whiteSpace: "pre-wrap" }}>
                  {studyMaterial}
                  <div className="text-center mt-4">
                    <button 
                      className="btn" 
                      onClick={handleDownloadPDF}
                    >
                      Get PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p>Click the button below to generate study material for {topic.name}.</p>
                  <button 
                    className="btn btn-success" 
                    onClick={handleStudyClick}
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating..." : "I want to study"}
                  </button>
                  {error && <p className="text-danger mt-2">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicDetail;