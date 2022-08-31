import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Activity from "../views/Activity/Activity";
import SignIn from "../views/SignIn/SignIn";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </Router>
  );
}
