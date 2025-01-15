import React, { useEffect } from 'react';
import { Route, Routes,useLocation } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Procash from "./pages/Procash";
import GrowNowForm from "./pages/GrowNowForm/GrowNowForm";
import Thankyou from "./pages/Thankyou/FormThankyou";
import RegistrationThankyou from "./pages/Thankyou/RegistrationThankyou";

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.defer = true;
    script.src = '//js.hs-scripts.com/48659835.js';
    document.body.appendChild(script);

    // Clean up the script before adding a new one
    return () => {
      const existingScript = document.getElementById('hs-script-loader');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [location.pathname]); // Run effect on route changes

  return <>{children}</>;
};

const App = () => {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration-form" element={<Procash />} />
      <Route path="/form" element={<GrowNowForm />} />
      <Route path="/thankyou" element={<Thankyou />} />
      <Route path="/thank-you" element={<RegistrationThankyou />} />
    </Routes>
    </Layout>
  );
};

export default App;
