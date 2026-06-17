export const logEvent = (level, action, details = {}) => {
  const timestamp = new Date().toISOString();
  console.log(`[${level.toUpperCase()}] ${timestamp} - ${action}`, details);
};
