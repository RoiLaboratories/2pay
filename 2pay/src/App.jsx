import "./css-files/landingPage.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import { PrivyProvider } from "@privy-io/react-auth";

const App = () => {
  {
    console.log("Privy App ID:", import.meta.env.VITE_PRIVY_APP_ID);
  }

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#036de5",
          showWalletLoginFirst: true,
        },
        embeddedWallets: {
          createOnLogin: "all-users",
        },
      }}
    >
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
    </PrivyProvider>
  );
};

export default App;
