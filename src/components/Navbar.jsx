import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [dateTime, setDateTime] = useState(new Date());
  const streakCount = 1;
  const lastStreak = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm container" style={{ backgroundColor: "#2C3E50", padding: "1rem", borderRadius: "10px" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        {/* Profile Section */}
        <div className="d-flex align-items-center">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="Suri"
            className="rounded-circle border border-2"
            style={{ width: "50px", height: "50px", borderColor: "#E74C3C" }}
          />
          <div className="ms-3">
            <p className="mb-0 fw-semibold text-light" style={{ fontSize: "1.1rem" }}>Hello, <span style={{ color: "#F39C12", fontSize: "1.3rem" }}>Suri</span></p>
          </div>
        </div>
        
        {/* Streak and Time Section */}
        <div className="d-flex align-items-center gap-4">
          <div className="text-center text-light">
            <p className="mb-0 fw-medium" style={{ fontSize: "1rem" }}>{dateTime.toLocaleString()}</p>
          </div>
          <div className="text-center d-flex gap-2 align-items-center">
            <p className="mb-0 text-warning" style={{ fontSize: "1rem", fontWeight: "bold" }}>🔥 Streak: {streakCount}</p>
            <p className="mb-0 text-light" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Last: {lastStreak}</p>
          </div>
        </div>
        
        {/* Login Button */}
        {/* <button className="btn px-4 py-2 rounded-pill" style={{ backgroundColor: "#E74C3C", color: "white", fontSize: "1rem", fontWeight: "bold" }}>
          Login
        </button> */}
      </div>
    </nav>
  );
}