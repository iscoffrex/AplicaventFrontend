import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) ||null
    )

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) ||null
    )

    useEffect(() => {
        try {
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(user))
        } catch (error) {
            localStorage.removeItem("token")
            localStorage.removeItem("user");
            console.log(error)
        }
    }, [token, user])

    const contextValue = {
        token,
        user,
        set_Token(token){
            setToken(token)
        },
        set_User(user) {
            setUser(user)
        },
        logout() {
            setToken(null)
            setUser(null);
            localStorage.removeItem("token")
            localStorage.removeItem("user");
        },
        isLogged() {
            return !!user
        }
    }


    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider