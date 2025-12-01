import React, { useState, useEffect, useCallback } from "react";
import { useUsersDispatch, useUsersState } from "../context/UsersContext";

const SearchBar = React.memo(function SearchBar() {
    const dispatch = useUsersDispatch();
    const { search } = useUsersState();
    const [value, setValue] = useState(() => search || "");

    useEffect(() => {
        setValue(search || "");
    }, [search]);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch({ type: "SET_SEARCH", payload: value });
        }, 200);
        return () => clearTimeout(id);
    }, [value, dispatch]);

    const onChange = useCallback((e) => setValue(e.target.value), []);

    return (
        <div className="w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search by name:</label>
            <input
                value={value}
                onChange={onChange}
                placeholder="Type name..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                aria-label="Search users by name"
            />
        </div>
    );
});

export default SearchBar;
