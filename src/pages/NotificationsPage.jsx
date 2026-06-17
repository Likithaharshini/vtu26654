import { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { calculatePriority } from "../utils/priority";
import { logEvent } from "../utils/logger";

const ITEMS_PER_PAGE = 5;

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { notifications, loading, error } = useNotifications();

  useEffect(() => {
    logEvent("PAGE_LOAD", { page: "NotificationsPage" });
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_, newPage) => {
    logEvent("PAGINATION_CHANGE", { page: newPage });
    setPage(newPage);
  };

  // Processing notifications
  const { paginatedNotifications, totalPages } = useMemo(() => {
    if (!notifications || notifications.length === 0) {
      return { paginatedNotifications: [], totalPages: 0 };
    }

    // 1. Calculate Priority and take top 10
    const topNotifications = calculatePriority(notifications);

    // 2. Filter
    const filteredNotifications = filter === "All"
      ? topNotifications
      : topNotifications.filter((n) => n.type === filter);

    // 3. Paginate
    const total = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginated = filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedNotifications: paginated, totalPages: total };
  }, [notifications, filter, page]);

  const unreadCount = notifications ? notifications.length : 0;

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && paginatedNotifications.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
      )}

      {!loading && !error && paginatedNotifications.length > 0 && (
        <Stack spacing={0}>
          {paginatedNotifications.map((n) => (
            <NotificationCard key={n.id} notification={n} />
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
