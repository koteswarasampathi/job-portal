import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {

        try {

            const response = await API.get("/user/me");

            setUser(response.data.user);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const logout = async () => {

        try {

            await API.post("/user/logout");

            setUser(null);

        } catch (error) {

            console.log("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                getUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}