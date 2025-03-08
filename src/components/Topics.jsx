// Topics.jsx
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

export default function Topics() {
  const { tech } = useParams();
  const navigate = useNavigate();
  const topics = topicsData[tech] || [];

  const handleCardClick = (routingUrl) => {
    navigate(routingUrl);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#6A9C89" }}>Topics for {tech.toUpperCase()}</h2>
      <div className="row d-flex justify-content-center">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div 
              key={topic.id} 
              className="col-md-4"
              onClick={() => handleCardClick(topic.routingUrl)}
              style={{ cursor: "pointer" }}
            >
              <div className="card text-center p-4 shadow-lg border-0" style={{ backgroundColor: "#f4f4f4", borderRadius: "15px" }}>
                <h4 className="fw-bold text-dark">{topic.name}</h4>
                <p className="text-muted">Till: {topic.date}</p>
                <button className={`btn btn-${statusColors[topic.status]} mt-2`}>{topic.status}</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-danger">No topics found for {tech}.</p>
        )}
      </div>
    </div>
  );
}
