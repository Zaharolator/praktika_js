import React from "react";
import { useUsersState } from "../context/UsersContext";
import UserCard from "./UserCard";

const UserGrid = () => {
    const { derivedUsers } = useUsersState();

    if (!derivedUsers) return null;

    if (derivedUsers.length === 0) {
        return <div className="text-gray-600">No users match your search.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {derivedUsers.map((u) => (
                <UserCard key={u.id} user={u} />
            ))}
        </div>
    );
};

export default React.memo(UserGrid);
