import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { useViewedStatus } from "../hooks/useViewedStatus";
import { logEvent } from "../utils/logger";

export function AllNotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { notifications, totalPages, loading, error } = useNotifications({
    page,
    limit,
    notification_type: filter
  });

  const { viewedIds, markAsViewed } = useViewedStatus();

  useEffect(() => {
    logEvent("INFO", "Notifications Loaded", { page: "AllNotificationsPage" });
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_, newPage) => {
    logEvent("INFO", "Pagination Changed", { page: newPage });
    setPage(newPage);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          All Notifications
        </Typography>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 3 }}>Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && (!notifications || notifications.length === 0) && (
        <Alert severity="info" sx={{ mb: 3 }}>No notifications found for the selected filter.</Alert>
      )}

      {!loading && !error && notifications && notifications.length > 0 && (
        <Stack spacing={0}>
          {notifications.map((n) => (
            <NotificationCard 
              key={n.id} 
              notification={n} 
              isViewed={viewedIds.includes(n.id)}
              onMarkAsViewed={markAsViewed}
            />
          ))}
        </Stack>
      )}

      {!loading && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
