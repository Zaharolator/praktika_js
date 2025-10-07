import "../styles/globals.css";
import { UsersProvider } from "../context/UsersContext";

function MyApp({ Component, pageProps }) {
    return (
        <UsersProvider initialUsers={pageProps.users || []}>
            <Component {...pageProps} />
        </UsersProvider>
    );
}

export default MyApp;
