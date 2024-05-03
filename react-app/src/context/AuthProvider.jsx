import { useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const loginAction = async ({username,password}) => {
        try {
            axios.post("/prijava", {username, password})
            .then(response => {
                navigate("/")
            })
            .catch(error => {
                console.log("Greska kod prijave", error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return <AuthContext.Provider value={{ loginAction }}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}