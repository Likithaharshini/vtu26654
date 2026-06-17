export function calculatePriority(notifications) {
  const TYPE_WEIGHTS = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return notifications
    .map((notification) => {
      const typeWeight = TYPE_WEIGHTS[notification.type] || 0;
      const timestamp = new Date(
        notification.date || notification.createdAt || notification.timestamp || Date.now()
      ).getTime();
      
      const recencyScore = timestamp / 10000000000000;
      const priorityScore = typeWeight + recencyScore;

      return { ...notification, priorityScore };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}
