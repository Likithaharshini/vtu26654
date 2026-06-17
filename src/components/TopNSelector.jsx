import { FormControl, Select, MenuItem, Typography, Stack } from "@mui/material";
import { logEvent } from "../utils/logger";

export function TopNSelector({ value, onChange }) {
  const handleChange = (e) => {
    const val = e.target.value;
    logEvent("INFO", "Priority Selection Changed", { topN: val });
    onChange(val);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="body2" color="text.secondary">Show Top:</Typography>
      <FormControl size="small">
        <Select value={value} onChange={handleChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
