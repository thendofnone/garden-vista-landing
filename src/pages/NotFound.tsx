import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-garden-cream">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-garden-dark-green">404</h1>
        <p className="text-xl text-foreground/70 mb-6">Pagina non trovata</p>
        <a
          href="/"
          className="inline-block bg-garden-dark-green text-white px-6 py-3 rounded-md hover:bg-garden-light-green transition-colors duration-300"
        >
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
