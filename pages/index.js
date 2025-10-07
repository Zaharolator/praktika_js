import Head from "next/head";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import UserGrid from "../components/UserGrid";
import { useUsersDispatch, useUsersState } from "../context/UsersContext";
import { useEffect } from "react";

export default function Home({ users, fetchError }) {
    const dispatch = useUsersDispatch();
    const state = useUsersState();

    useEffect(() => {
        if (users && users.length) {
            dispatch({ type: "SET_USERS", payload: users });
        }
    }, [users, dispatch]);

    return (
        <div>
            <Head>
                <title>UsersList</title>
                <meta name="description" content="User directory with search and sorting (Next.js + Tailwind)" />
            </Head>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">UsersList</h1>
                </header>

                {fetchError ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
                        Error fetching users: {fetchError}
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                            <SearchBar />
                            <SortSelect />
                        </div>

                        <section>
                            <div className="mb-3 text-sm text-gray-500">
                                Showing <strong>{state.derivedUsers?.length ?? 0}</strong> of <strong>{state.originalUsers?.length ?? 0}</strong> users.
                            </div>
                            <UserGrid />
                        </section>
                    </>
                )}

                <footer className="mt-8 text-xs text-gray-400">
                    Data from jsonplaceholder.typicode.com.
                </footer>
            </main>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const users = await res.json();

        return {
            props: {
                users
            },
            revalidate: 60
        };
    } catch (err) {
        return {
            props: {
                users: [],
                fetchError: err.message || "Unknown error"
            },
            revalidate: 60
        };
    }
}
