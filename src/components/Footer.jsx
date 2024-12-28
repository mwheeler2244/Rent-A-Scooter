import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Rent-a-Scooter &copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
