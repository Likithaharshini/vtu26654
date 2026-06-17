import { logEvent } from "../utils/logger";

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "Placement", title: "Amazon SDE Role", message: "Apply by tomorrow", date: new Date().toISOString() },
  { id: 2, type: "Result", title: "Mid-term Results", message: "Results published for CS", date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, type: "Event", title: "Cultural Fest", message: "Annual fest starts next week", date: new Date(Date.now() - 2*86400000).toISOString() },
  { id: 4, type: "Placement", title: "Microsoft Internship", message: "Eligible for 3rd year", date: new Date(Date.now() - 3600000).toISOString() },
  { id: 5, type: "Event", title: "Alumni Meet", message: "Join us this saturday", date: new Date(Date.now() - 4*86400000).toISOString() },
  { id: 6, type: "Result", title: "Lab Finals", message: "Scores updated", date: new Date(Date.now() - 5*86400000).toISOString() },
  { id: 7, type: "Placement", title: "TCS Ninja", message: "Drive next month", date: new Date(Date.now() - 10*86400000).toISOString() },
  { id: 8, type: "Event", title: "Hackathon", message: "24-hour coding challenge", date: new Date(Date.now() - 12*86400000).toISOString() },
  { id: 9, type: "Placement", title: "Google STEP", message: "Applications open", date: new Date(Date.now() - 24*3600000).toISOString() },
  { id: 10, type: "Result", title: "Semester 5", message: "Revaluation results", date: new Date(Date.now() - 48*3600000).toISOString() },
  { id: 11, type: "Event", title: "Tech Talk", message: "AI in modern world", date: new Date(Date.now() - 72*3600000).toISOString() },
  { id: 12, type: "Placement", title: "Meta Rotational", message: "New grad roles", date: new Date(Date.now() - 96*3600000).toISOString() }
];

export async function fetchNotifications(params = {}) {
  const { page = 1, limit = 10, notification_type = "All" } = params;
  const queryString = new URLSearchParams({ page, limit, notification_type }).toString();
  
  logEvent("INFO", "API Request", { endpoint: `/evaluation-service/notifications?${queryString}` });
  
  try {
    const response = await fetch(`/evaluation-service/notifications?${queryString}`);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const data = await response.json();
    logEvent("INFO", "API Response Success", { count: data?.notifications?.length || 0 });
    return data;
  } catch (error) {
    logEvent("ERROR", "API Failed", { error: error.message });
    console.warn("API failed, falling back to mock data mapping");
    
    // Manual filtering for Mock Data
    let filtered = MOCK_NOTIFICATIONS;
    if (notification_type !== "All") {
      filtered = filtered.filter(n => n.type === notification_type);
    }
    
    // Manual Pagination for Mock Data
    const totalCount = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    
    return { notifications: paginated, total: totalCount, totalPages: Math.ceil(totalCount / limit) };
  }
}
