import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  // State for Slider
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State for Network Lists
  const [evilTwinNetworks, setEvilTwinNetworks] = useState([]);
  const [safeNetworks, setSafeNetworks] = useState([]);
  
  // WebSocket Reference
  const websocketRef = useRef(null);

  // Custom Cursor References
  const customCursorRef = useRef(null);

  useEffect(() => {
    // WebSocket Connection
    websocketRef.current = new WebSocket('ws://localhost:8765');

    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvilTwinNetworks(data.evilTwinNetworks);
      setSafeNetworks(data.safeNetworks);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  // Existing Custom Cursor Logic (from previous code)
  useEffect(() => {
    const customCursor = customCursorRef.current;
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const animateCursor = () => {
      const speed = 0.04;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      if (customCursor) {
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(animateCursor);
    };
    document.addEventListener("mousemove", handleMouseMove);
    animateCursor();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Slider Logic (unchanged from previous code)
  const slides = [
    <div>
      <strong>Deceptive Clone</strong>
      <p>An Evil Twin Wi-Fi mimics</p><p>a legitimate network so convincingly that
        users</p> <p>can hardly distinguish the fake from the real one.
      </p>
    </div>,
    <div>
      <strong>Data Thief in Disguise</strong>
      <p>
        Once connected, attackers can</p><p> intercept sensitive data like passwords,
        emails,</p> <p>and financial details in real-time.
      </p>
    </div>,
    <div>
      <strong>Global Threat</strong>
      <p>
        Evil Twin attacks are most effective</p> <p> in public places like cafes,
        airports, and hotels,</p> <p>where users unknowingly connect to rogue networks.
      </p>
    </div>,
  ];
  const totalSlides = slides.length;
  const updateSlider = (index) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  };

  return (
    <div className="App">
      <h1>Evil Twin Detection</h1>
      {/* Real-Time Data Section */}
      <div className="container">
        <div className="column">
          <h2>Evil Twin Networks</h2>
          <div id="evil-list">
            {evilTwinNetworks.map((network, index) => (
              <div key={index} className="network-item">
                <p>SSID: {network.SSID}</p>
                <p>BSSID: {network.BSSID}</p>
                <p>RSSI: {network.RSSI}</p>
                <p>Channel: {network.Channel}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Safe Networks</h2>
          <div id="safe-list">
            {safeNetworks.map((network, index) => (
              <div key={index} className="network-item">
                <p>SSID: {network.SSID}</p>
                <p>BSSID: {network.BSSID}</p>
                <p>RSSI: {network.RSSI}</p>
                <p>Channel: {network.Channel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Slider Section (unchanged) */}
      <div className="slider-container">
        {/* ... existing slider code ... */}
      </div>
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={customCursorRef}></div>
    </div>
  );
};

export default App;