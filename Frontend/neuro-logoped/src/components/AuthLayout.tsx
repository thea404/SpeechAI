
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="auth-layout">

      {/* Upper background wave */}
      <svg
        className="auth-wave auth-wave-top"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B85F7C" stopOpacity="0.58" />
            <stop offset="55%" stopColor="#D99AA9" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#F4DDE1" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          d="M0 0 H650 C570 110 480 165 370 190 C240 220 145 175 0 300 Z"
          fill="url(#topWave)"
        />

        <path
          d="M0 0 H440 C380 90 300 140 200 160 C110 180 55 150 0 215 Z"
          fill="#B85F7C"
          fillOpacity="0.13"
        />

        <path
          d="M0 300 C145 175 240 220 370 190 C480 165 570 110 650 0"
          fill="none"
          stroke="#A44867"
          strokeOpacity="0.65"
          strokeWidth="2"
        />

        <path
          d="M0 340 C160 215 260 260 390 225 C510 190 590 130 700 0"
          fill="none"
          stroke="#D18A9F"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      </svg>

      {/* Lower background wave */}
      <svg
        className="auth-wave auth-wave-bottom"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bottomWave" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8B8C3" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#C87590" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9D4564" stopOpacity="0.52" />
          </linearGradient>
        </defs>

        <path
          d="M850 900 C960 760 1050 730 1160 750 C1280 770 1350 660 1440 590 V900 Z"
          fill="url(#bottomWave)"
        />

        <path
          d="M760 900 C880 790 980 790 1090 805 C1240 825 1340 710 1440 640"
          fill="none"
          stroke="#A44867"
          strokeOpacity="0.6"
          strokeWidth="2"
        />

        <path
          d="M850 900 C970 820 1050 830 1170 845 C1300 860 1380 770 1440 720"
          fill="none"
          stroke="#D18A9F"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      </svg>

      {/* Audio waveform */}
      <svg
        className="auth-waveform"
        viewBox="0 0 360 100"
        aria-hidden="true"
      >
        <path
          d="M0 50 H30 L38 43 L46 57 L54 30 L62 72 L70 15 L78 85 L86 35 L94 65 L102 43 L110 50 H130 L138 40 L146 60 L154 22 L162 78 L170 8 L178 92 L186 32 L194 68 L202 42 L210 50 H235 L243 44 L251 56 L259 28 L267 72 L275 38 L283 62 L291 50 H360"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Abstract flowing ribbons */}
      <svg
        className="decoration decoration-ribbons"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="silkRibbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B65D78" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#E7B6C2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFF1EE" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <path
          d="M0 0 H430 C350 110 250 130 160 210 C95 270 40 280 0 300 Z"
          fill="url(#silkRibbon)"
        />

        <path
          d="M0 0 H310 C260 85 190 125 105 175 C55 205 20 220 0 230 Z"
          fill="#C87590"
          fillOpacity="0.16"
        />

        <path
          d="M1440 900 H1010 C1100 790 1180 760 1260 690 C1340 620 1400 610 1440 590 Z"
          fill="url(#silkRibbon)"
        />

        <path
          d="M1440 900 H1150 C1220 820 1300 760 1370 710 C1400 690 1420 680 1440 665 Z"
          fill="#B65D78"
          fillOpacity="0.2"
        />

        <g fill="none" stroke="#A44867" strokeOpacity="0.5">
          <path d="M0 300 C180 190 310 210 450 130 C540 80 590 35 650 0" strokeWidth="1.5" />
          <path d="M0 340 C190 225 320 250 465 165 C555 110 610 60 690 0" strokeWidth="1" />
          <path d="M850 900 C1020 790 1120 820 1240 730 C1320 670 1390 625 1440 610" strokeWidth="1.5" />
          <path d="M920 900 C1080 820 1170 850 1290 765 C1360 715 1400 690 1440 670" strokeWidth="1" />
        </g>
      </svg>

      {/* Glowing light particles */}
      <div className="particle-layer">
        <div className="light-particle particle-one" />
        <div className="light-particle particle-two" />
        <div className="light-particle particle-three" />
        <div className="light-particle particle-four" />
        <div className="light-particle particle-five" />
      </div>

      {/* Main page content */}
      <div className="auth-content">
        {children}
      </div>

    </main>
  );
}

export default AuthLayout;
