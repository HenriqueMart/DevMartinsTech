"use client"

//react
import {createContext, useContext, useEffect, useState} from "react"

//autenticação
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firabase";

interface AuhtContextType{
    user: User | null;
    loading: boolean;
}

//criando o contexto
const AuthContext = createContext<AuhtContextType>({} as AuhtContextType)

export function AuthProvider({children}: {children: React.ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)

    //Verifica o status do usuário na primeira execução
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);