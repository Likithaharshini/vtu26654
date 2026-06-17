import { Card, CardContent, Typography, Chip, Stack, Button, Box } from "@mui/material";

export function NotificationCard({ notification, isViewed, onMarkAsViewed }) {
  const { id, title, message, type, date, createdAt, timestamp } = notification;
  
  const displayDate = new Date(date || createdAt || timestamp || Date.now()).toLocaleDateString();

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderLeft: isViewed ? 'none' : '4px solid #1976d2',
        backgroundColor: isViewed ? '#f9f9f9' : '#ffffff',
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={1} spacing={1}>
          <Box>
            <Typography variant="subtitle1" fontWeight={isViewed ? "normal" : "bold"}>
              {title}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            {!isViewed && (
              <Chip label="New" size="small" color="error" />
            )}
            <Chip label={type} size="small" color="primary" variant="outlined" />
          </Stack>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" mb={2}>
          {message}
        </Typography>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {displayDate}
          </Typography>
          {!isViewed && (
            <Button size="small" variant="text" onClick={() => onMarkAsViewed(id)}>
              Mark as Read
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
