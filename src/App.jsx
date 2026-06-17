import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { Layout } from "./components/Layout";
import { AllNotificationsPage } from "./pages/AllNotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#f0f2f5',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AllNotificationsPage />} />
            <Route path="priority" element={<PriorityNotificationsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}