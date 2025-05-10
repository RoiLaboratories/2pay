import "./css files/landingpage.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";

const App = () => {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
};

export default App;
