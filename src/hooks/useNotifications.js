import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(params = {}) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications(params);
        if (mounted) {
          setNotifications(data.notifications || []);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 0);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(params)]);

  return { notifications, total, totalPages, loading, error };
}
