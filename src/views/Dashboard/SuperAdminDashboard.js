import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./css/SuperAdminDashboard.css";
import { AuthContext } from "../../AuthContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const SuperAdminDashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState({});
  const [totalSales, setTotalSales] = useState({ tours: 0, hotels: 0, flights: 0 });
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is Super Admin
  useEffect(() => {
    console.log("Token from AuthContext:", token);
    if (!token) {
      console.log("No token, redirecting to /login");
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    if (userRole !== "superadmin") {
      setError("Access denied. Super Admin privileges required.");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    }
  }, [token, navigate, logout]);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, vendorsResponse, customersResponse] = await Promise.all([
          axios.get(`${API_URL}/api/sales`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/api/vendors`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/api/customers`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Process sales data for chart
        const sales = salesResponse.data;
        const labels = [...new Set(sales.map((sale) => sale.month))]; // Unique months

        const tourSales = labels.map((month) =>
          sales.find((s) => s.month === month && s.type === "tour")?.amount || 0
        );
        const hotelSales = labels.map((month) =>
          sales.find((s) => s.month === month && s.type === "hotel")?.amount || 0
        );
        const flightSales = labels.map((month) =>
          sales.find((s) => s.month === month && s.type === "flight")?.amount || 0
        );

        setSalesData({
          labels,
          datasets: [
            {
              label: "Tour Sales ($)",
              data: tourSales,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Hotel Sales ($)",
              data: hotelSales,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Flight Sales ($)",
              data: flightSales,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });

        setTotalSales({
          tours: tourSales.reduce((sum, amount) => sum + amount, 0),
          hotels: hotelSales.reduce((sum, amount) => sum + amount, 0),
          flights: flightSales.reduce((sum, amount) => sum + amount, 0),
        });

        setVendors(vendorsResponse.data);
        setCustomers(customersResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data: " + (err.response?.data?.error || err.message));
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales by Category" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Sales Amount ($)" },
      },
      x: {
        title: { display: true, text: "Month" },
      },
    },
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="super-admin-dashboard">
      {/* Custom Navbar */}
      <nav className="admin-navbar">
        <div className="navbar-brand">
          <h2>Gogoglo Admin</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <button onClick={() => handleNavClick("sales-section")}>Sales</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("vendors-section")}>Vendors</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("customers-section")}>Customers</button>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="dashboard-content">
            {/* Sales Section */}
            <section id="sales-section" className="section sales-section">
              <h2>Sales Overview</h2>
              <div className="sales-summary">
                <p>Total Tour Sales: <strong>${totalSales.tours.toLocaleString()}</strong></p>
                <p>Total Hotel Sales: <strong>${totalSales.hotels.toLocaleString()}</strong></p>
                <p>Total Flight Sales: <strong>${totalSales.flights.toLocaleString()}</strong></p>
                <p>Total Combined Sales: <strong>${(totalSales.tours + totalSales.hotels + totalSales.flights).toLocaleString()}</strong></p>
              </div>
              <div className="chart-container">
                <Bar data={salesData} options={chartOptions} />
              </div>
            </section>

            {/* Vendors Section */}
            <section id="vendors-section" className="section vendors-section">
              <h2>Vendors</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.id}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.type}</td>
                      <td>{vendor.contact}</td>
                      <td>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Customers Section */}
            <section id="customers-section" className="section customers-section">
              <h2>Customers</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
      </main>

      {/* Custom Footer */}
      <footer className="admin-footer">
        <p>© {new Date().getFullYear()} Gogoglo Travel Admin. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a> |{" "}
          <a href="/support">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default SuperAdminDashboard;