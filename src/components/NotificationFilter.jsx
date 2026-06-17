import { ToggleButton, ToggleButtonGroup, FormControl, Select, MenuItem, Typography, Stack } from "@mui/material";
import { logEvent } from "../utils/logger";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      logEvent("INFO", "Filter Changed", { filter: newFilter });
      onChange(newFilter);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
      <Typography variant="body2" color="text.secondary">Filter Type:</Typography>
      <ToggleButtonGroup
        value={value || "All"}
        exclusive
        onChange={handleChange}
        size="small"
      >
        {filters.map((type) => (
          <ToggleButton key={type} value={type} sx={{ textTransform: "none", px: 2 }}>
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}