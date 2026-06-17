import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, Tabs, Tab } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { logEvent } from "../utils/logger";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    logEvent("INFO", "Route Changed", { path: location.pathname });
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <NotificationsActiveIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Notifications System
          </Typography>
        </Toolbar>
        <Tabs 
          value={location.pathname} 
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ px: 2 }}
        >
          <Tab label="All Notifications" value="/" />
          <Tab label="Priority" value="/priority" />
        </Tabs>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: { xs: 2, md: 4 }, boxShadow: 1 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
