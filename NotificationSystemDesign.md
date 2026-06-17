# Notification System Design (Stage 2)

## Architecture
The application is a React SPA built with Vite, React Router, and Material UI. It uses a centralized API logic through custom hooks. The layout is managed via an App Shell (`Layout.jsx`) which houses navigation across two major views: All Notifications and Priority Notifications.

## Folder Structure
```
src/
├── api/             # Fetch wrappers and mock data fallback
├── components/      # Reusable UI elements (Card, Filter, TopNSelector, Layout)
├── hooks/           # Business logic (useNotifications, useViewedStatus)
├── pages/           # Route-level components
├── utils/           # Helper functions (logger, priority calculations)
```

## API Flow
1. API calls are orchestrated by the `useNotifications` hook which accepts query parameters (`page`, `limit`, `notification_type`).
2. `fetchNotifications` in the API layer serializes these parameters into the URL.
3. If the external `/evaluation-service/notifications` fails, it gracefully degrades to a local mock dataset which manually implements pagination and filtering for demonstration purposes.

## Priority Algorithm
The algorithm computes a score based on two factors:
- **Weight**: Placement (3), Result (2), Event (1).
- **Recency**: The timestamp is scaled down (`timestamp / 10000000000000`) and added to the weight. 
This ensures Type dictates the primary order, and Recency resolves ties within the same Type.

## Viewed Notification Strategy
A user's interaction with a notification marks it as viewed. Viewed notifications are stripped of their bolding and visual blue accent, shifting to a more muted background color. An unread "New" chip is removed.

## LocalStorage Strategy
The `useViewedStatus` custom hook handles persistence. It loads an array of viewed notification IDs from `localStorage` upon initialization. Any new "mark as read" action appends the ID to the state and synchronizes it immediately with `localStorage`.

## Logging Strategy
The application incorporates a lightweight, centralized logging utility `logger.js`.
It records critical lifecycle events such as `[INFO] Route Changed`, `[INFO] API Request`, `[ERROR] API Failed`, and interactions like `[INFO] Pagination Changed` or `[INFO] Viewed Status Changed` to standard console output.

## Scalability Discussion
By isolating API requests into custom hooks, the frontend is decoupled from the backend. React Router enables easy addition of new views. Material UI components guarantee a consistent and accessible design language. LocalStorage is sufficient for local viewed state, but for a distributed scalable app, this should eventually sync to a user profile backend endpoint.

## Complexity Analysis
- **Filtering & Pagination (API side)**: O(1) for the frontend if the server handles it. For mock data, it evaluates as O(N) filtering and O(1) slice.
- **Priority Sorting**: O(N log N) execution where N is the fetched notification count.
- **Viewed State Checking**: Checking `.includes(id)` is O(V) per card, where V is viewed count. Can be optimized to an O(1) Set lookup if V scales significantly.
