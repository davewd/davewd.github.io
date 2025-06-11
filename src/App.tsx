import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import PersonalWebsite from "./components/PersonalWebsite";
import { initializeAnalytics } from "./utils/analytics";

function App() {
  React.useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <Router>
      <PersonalWebsite />
    </Router>
  );
}

export default App;
