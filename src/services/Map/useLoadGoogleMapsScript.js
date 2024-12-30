import { useState, useEffect } from "react";

const useLoadGoogleMapsScript = (apiKey) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      console.log("Google Maps script already loaded");
      setIsScriptLoaded(true);
      return;
    }

    const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      console.log("Google Maps script already in the document");
      existingScript.onload = () => setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps script loaded successfully");
      setIsScriptLoaded(true);
    };

    script.onerror = (e) => {
      console.error("Failed to load Google Maps script", e);
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  return isScriptLoaded;
};

export default useLoadGoogleMapsScript;
