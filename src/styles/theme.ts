export const theme = {
  colors: {
    primary: {
      main: "#26a69a",
      dark: "#00897b",
      gradient: "linear-gradient(135deg, #26a69a 0%, #00897b 100%)",
    },
    secondary: {
      main: "#2d3748",
      dark: "#1a202c",
      light: "#4a5568",
      gradient: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
    },
    gray: {
      light: "#f8fafc",
      medium: "#64748b",
      dark: "#1e293b",
      border: "#e2e8f0",
      bg: "#f1f5f9",
    },
    blue: {
      main: "#3b82f6",
      light: "rgba(59, 130, 246, 0.1)",
      gradient:
        "linear-gradient(135deg, rgb(4, 190, 231) 0%, rgb(26, 180, 223) 100%)",
    },
    success: {
      main: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    warning: {
      main: "#fbbf24",
    },
    black: "#000000",
    white: "#ffffff",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    xxl: "24px",
    xxxl: "30px",
    xxxxl: "50px",
    xxxxxl: "100px",
  },

  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    round: "50%",
    pill: "25px",
  },

  fontSize: {
    xs: "0.85rem",
    sm: "0.9rem",
    base: "0.95rem",
    md: "1rem",
    lg: "1.2rem",
    xl: "1.5rem",
    xxl: "1.8rem",
    xxxl: "2rem",
    display: "3.5rem",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(0, 0, 0, 0.08)",
    lg: "0 6px 20px rgba(0, 0, 0, 0.12)",
    xl: "0 20px 40px rgba(0, 0, 0, 0.15)",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
  },

  zIndex: {
    modal: 1000,
    chat: 1001,
    floating: 20,
  },

  transitions: {
    fast: "0.2s ease",
    smooth: "0.3s ease",
  },
} as const;

export type Theme = typeof theme;
