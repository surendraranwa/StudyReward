import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaReact, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";

const techCards = [
  { id: 1, name: "React", icon: <FaReact size={40} color="#61DAFB" />, url: "/react" },
  { id: 2, name: "HTML", icon: <FaHtml5 size={40} color="#E44D26" />, url: "/html" },
  { id: 3, name: "CSS", icon: <FaCss3Alt size={40} color="#1572B6" />, url: "/css" },
  { id: 4, name: "JavaScript", icon: <FaJs size={40} color="#F7DF1E" />, url: "/javascript" }
];

export default function Home() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center p-5" style={{ backgroundColor: "#FFF5E4", borderRadius: "10px" }}>
        <h1 className="fw-bold" style={{ color: "#6A9C89" }}>Unlock Your Rewards</h1>
        <p className="lead" style={{ color: "#6A9C89" }}>Complete challenges and earn exciting rewards as you progress in your learning journey!</p>
      </div>
      
      {/* Tech Cards Section */}
      <div className="row mt-4 d-flex justify-content-center">
        {techCards.map((tech) => (
          <div key={tech.id} className="col-md-3">
            <div className="card text-center p-4 shadow-lg border-0" style={{ backgroundColor: "#f4f4f4", borderRadius: "15px" }}>
              <div className="mb-3">{tech.icon}</div>
              <h4 className="fw-bold" style={{ color: "#333" }}>{tech.name}</h4>
              <Link to={tech.url} className="btn btn-dark mt-2">Study</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
