// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Room from "./pages/Room";
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Define the route for the Room page */}
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
          {/* Define the route for the Login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Optionally, you can set a default route or redirect */}
          {/* <Route path="*" element={<LoginPage />} />{" "} */}
          {/* Redirect to LoginPage if no route is matched */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
