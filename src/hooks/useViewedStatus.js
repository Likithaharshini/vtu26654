import { useState, useEffect } from "react";
import { logEvent } from "../utils/logger";

export function useViewedStatus() {
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem("viewed_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("viewed_notifications", JSON.stringify(viewedIds));
  }, [viewedIds]);

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      logEvent("INFO", "Viewed Status Changed", { id, action: "marked_viewed" });
    }
  };

  return { viewedIds, markAsViewed };
}
