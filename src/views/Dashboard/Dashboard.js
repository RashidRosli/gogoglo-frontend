import React from "react";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-4">
          <h1>Welcome to your Dashboard!</h1>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;