import "./App.css";

import AuthProvider from "./hooks/auth/useAuthProvider";
import AppRouter from "./routers/AppRouter";

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
