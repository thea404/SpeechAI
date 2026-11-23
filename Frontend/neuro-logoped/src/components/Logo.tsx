
function Logo() {
  return (
    <div className="brand-logo">
      <div className="brand-wave" aria-hidden="true">
        <svg
          viewBox="0 0 64 48"
          width="64"
          height="48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 24 H9 L13 16 L17 34 L21 8 L25 40 L29 13 L33 35 L37 18 L41 28 H47 L51 22 H61"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="brand-text">
        <span className="brand-name">NeuroLogoped</span>
        <span className="brand-tagline">DIGITAL SPEECH THERAPY</span>
      </div>
    </div>
  );
}

export default Logo;
