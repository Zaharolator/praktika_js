import React, { createContext, useContext, useReducer, useMemo } from "react";

const UsersStateContext = createContext();
const UsersDispatchContext = createContext();

const initialState = {
    originalUsers: [],
    search: "",
    sortBy: "name",
    sortOrder: "asc" // or 'desc'
};

function usersReducer(state, action) {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, originalUsers: action.payload || [] };
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SET_SORT":
            return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

export function UsersProvider({ children, initialUsers = [] }) {
    const [state, dispatch] = useReducer(usersReducer, {
        ...initialState,
        originalUsers: initialUsers
    });

    // memoized derived value: sorted + searchable users
    const derived = useMemo(() => {
        const { originalUsers, search, sortBy, sortOrder } = state;

        let list = Array.isArray(originalUsers) ? [...originalUsers] : [];

        // search filter by name (case-insensitive) if search not empty
        if (search && search.trim() !== "") {
            const q = search.trim().toLowerCase();
            list = list.filter((u) => u.name.toLowerCase().includes(q));
        }

        // sorting
        list.sort((a, b) => {
            const aVal = String(a[sortBy] || "").toLowerCase();
            const bVal = String(b[sortBy] || "").toLowerCase();
            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return list;
    }, [state.originalUsers, state.search, state.sortBy, state.sortOrder]);

    const valueState = { ...state, derivedUsers: derived };

    return (
        <UsersStateContext.Provider value={valueState}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

export function useUsersState() {
    const ctx = useContext(UsersStateContext);
    if (ctx === undefined) throw new Error("useUsersState must be used within UsersProvider");
    return ctx;
}

export function useUsersDispatch() {
    const ctx = useContext(UsersDispatchContext);
    if (ctx === undefined) throw new Error("useUsersDispatch must be used within UsersProvider");
    return ctx;
}
