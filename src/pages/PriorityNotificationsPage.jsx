import { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { NotificationCard } from "../components/NotificationCard";
import { TopNSelector } from "../components/TopNSelector";
import { useNotifications } from "../hooks/useNotifications";
import { useViewedStatus } from "../hooks/useViewedStatus";
import { calculatePriority } from "../utils/priority";
import { logEvent } from "../utils/logger";

export function PriorityNotificationsPage() {
  const [topN, setTopN] = useState(10);
  
  // Fetch all notifications to correctly sort globally for priority
  const { notifications, loading, error } = useNotifications({
    page: 1,
    limit: 1000, 
    notification_type: "All"
  });

  const { viewedIds, markAsViewed } = useViewedStatus();

  useEffect(() => {
    logEvent("INFO", "Notifications Loaded", { page: "PriorityNotificationsPage" });
  }, []);

  const prioritizedNotifications = useMemo(() => {
    if (!notifications || notifications.length === 0) return [];
    const prioritized = calculatePriority(notifications);
    return prioritized.slice(0, topN);
  }, [notifications, topN]);

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3} spacing={2}>
        <Typography variant="h5" fontWeight={700}>
          Priority Notifications
        </Typography>
        <TopNSelector value={topN} onChange={setTopN} />
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 3 }}>Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && prioritizedNotifications.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>No priority notifications available.</Alert>
      )}

      {!loading && !error && prioritizedNotifications.length > 0 && (
        <Stack spacing={0}>
          {prioritizedNotifications.map((n) => (
            <NotificationCard 
              key={n.id} 
              notification={n} 
              isViewed={viewedIds.includes(n.id)}
              onMarkAsViewed={markAsViewed}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
