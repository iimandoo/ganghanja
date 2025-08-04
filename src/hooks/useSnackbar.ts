import { useState, useCallback } from "react";

interface SnackbarState {
  message: string;
  isVisible: boolean;
}

export interface UseSnackbarReturn {
  snackbar: SnackbarState;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

export const useSnackbar = (): UseSnackbarReturn => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    isVisible: false,
  });

  const showSnackbar = useCallback((message: string) => {
    setSnackbar({
      message,
      isVisible: true,
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
