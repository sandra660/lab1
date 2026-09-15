# Filter & Search Todos — Lab Submission

## What Was Implemented

### Backend (todoController.js)
- Modified getTodos to read an optional done query parameter from req.query.
- Built a filter object conditionally: if done is not provided, filter stays empty ({}), so GET /api/todos still returns all todos unchanged.
- If done=true or done=false is passed, the filter converts the string to a boolean and is passed into Todo.find(filter).

### Frontend
- api/todos.js: fetchTodos now accepts an optional done argument. When provided, it's sent as a query param via axios; when omitted, no query string is sent.
- App.jsx: Added filter state ('all' | 'active' | 'done'). A useEffect re-runs fetchTodos whenever filter changes, converting 'all' to undefined, 'active' to false, and 'done' to true.
- UI: Added All / Active / Done buttons above the todo list that update the filter state on click.

## Design Decision: Server-side vs Client-side Filtering
This implementation filters on the server side — each button click triggers a new GET /api/todos?done=... request rather than filtering an already-loaded array in React.

- Trade-off: Server-side filtering scales better for large todo lists and keeps the server as the single source of truth, but adds a network round-trip per filter change.
- Client-side alternative would filter the already-fetched array with .filter() in React — instant UI response, but doesn't scale if the list grows large or if filtering needs to respect server-side logic.

## Testing
Verified via browser at http://localhost:5173:
- Added multiple todos, some marked done.
- Confirmed All shows every todo, Active shows only unchecked, Done shows only checked.
- Confirmed GET /api/todos (no query) still returns everything, unchanged from original behavior.
