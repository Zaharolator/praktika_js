import React, { useCallback } from "react";
import { useUsersDispatch, useUsersState } from "../context/UsersContext";

const SortSelect = React.memo(function SortSelect() {
    const dispatch = useUsersDispatch();
    const { sortBy, sortOrder } = useUsersState();

    const setSort = useCallback((sortByVal, sortOrderVal) => {
        dispatch({ type: "SET_SORT", payload: { sortBy: sortByVal, sortOrder: sortOrderVal } });
    }, [dispatch]);

    return (
        <div className="flex items-center gap-3">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSort(e.target.value, sortOrder)}
                    className="px-2 py-2 border rounded"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSort(sortBy, e.target.value)}
                    className="px-2 py-2 border rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
});

export default SortSelect;
