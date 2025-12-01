import React from "react";

const UserCard = React.memo(function UserCard({ user }) {
    // Poprawione: obliczanie URL poza JSX
    const websiteUrl = user.website.startsWith('http') ? user.website : `http://${user.website}`;

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">@{user.username}</p>
            <p className="mt-2 text-sm"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm"><strong>Phone:</strong> {user.phone}</p>
            <p className="text-sm"><strong>Website:</strong>
                <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600"
                >
                    {user.website}
                </a>
            </p>
            <div className="mt-3 text-xs text-gray-500">
                <div>{user.address.city} — {user.address.street}</div>
                <div className="mt-1 text-italic text-gray-400">{user.company?.name}</div>
            </div>
        </div>
    );
});

export default UserCard;