export const theme = {
  colors: {
    primary: {
      main: "#c1ff72",
      dark: "#a3e85f",
      light: "#d4ff8f",
      gradient: "linear-gradient(135deg, #c1ff72 0%, #a3e85f 100%)",
    },
    secondary: {
      main: "#2d4a22",
      dark: "#1a2b15",
      light: "#4a7540",
      gradient: "linear-gradient(135deg, #2d4a22 0%, #1a2b15 100%)",
    },
    accent: {
      main: "#8fbc8f",
      light: "#b8d4b8",
      dark: "#6b8e6b",
    },
    gray: {
      light: "#f8fdf8",
      medium: "#6b8e6b",
      dark: "#2d4a22",
      border: "#e8f5e8",
      bg: "#f4faf4",
    },
    blue: {
      main: "#4ade80",
      light: "rgba(74, 222, 128, 0.1)",
      gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
    },
    success: {
      main: "#22c55e",
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    },
    warning: {
      main: "#fbbf24",
    },
    text: {
      primary: "#1a2b15",
      secondary: "#6b8e6b",
      placeholder: "#9ca3af",
    },
    neutral: {
      light: "#e8f5e8",
    },
    // 한자 카드 색상 팔레트 (현재 색상 + 5개 추가)
    cardColors: {
      green: {
        front: "linear-gradient(135deg, #c1ff72 0%, #a3e85f 100%)",
        back: "linear-gradient(135deg, #d4ff8f 0%, #c1ff72 100%)",
        border: "rgba(163, 232, 95, 0.3)",
      },
      mint: {
        front: "linear-gradient(135deg, #72ffda 0%, #5fe8a3 100%)",
        back: "linear-gradient(135deg, #8fffd4 0%, #72ffda 100%)",
        border: "rgba(95, 232, 163, 0.3)",
      },
      lime: {
        front:
          "linear-gradient(135deg,rgb(255, 239, 114) 0%,rgb(223, 232, 95) 100%)",
        back: "linear-gradient(135deg,rgb(255, 253, 143) 0%,rgb(255, 253, 114) 100%)",
        border: "rgba(149, 232, 95, 0.3)",
      },
      sage: {
        front: "linear-gradient(135deg, #a8ff9e 0%, #8ae582 100%)",
        back: "linear-gradient(135deg, #bbffb1 0%, #a8ff9e 100%)",
        border: "rgba(138, 229, 130, 0.3)",
      },
      emerald: {
        front: "linear-gradient(135deg, #72ffa8 0%, #5fe88a 100%)",
        back: "linear-gradient(135deg, #8fffbb 0%, #72ffa8 100%)",
        border: "rgba(95, 232, 138, 0.3)",
      },
      spring: {
        front: "linear-gradient(135deg, #9eff72 0%, #82e85f 100%)",
        back: "linear-gradient(135deg, #b1ff8f 0%, #9eff72 100%)",
        border: "rgba(130, 232, 95, 0.3)",
      },
    },
    black: "#1a2b15",
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
