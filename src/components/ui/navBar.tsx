"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//Importação do Shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Perfil from "../profile"
import Link from "next/link"
import { signOut } from "firebase/auth";
import { toast } from "react-toastify"
import { auth } from "../../../firabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AutContext";
import { Button } from "./button";

export default function NavBar(){
    const router = useRouter();
    const {user} = useAuth();

    const handleUserSignOut = async () => {
        
        try{
            await signOut(auth);

            toast.success("Usuário Deslogado com sucesso!")

            router.push("/auth/sign-in")
        }catch(error){
            console.error("Erro ao sair:", error);
            toast.error("Não foi possível encerrar a sessão.");
        }
        

        
    }

    return (
        <header className="flex w-full justify-center items-center h-[50px] border-b border-foreground/5">

        <div className="w-full max-w-[1440px] sm:mx-[100px] flex  px-4 justify-between items-center">
            <Link href='/'>
                <p className="text-muted-foreground text-[12px] sm:text-lg font-extrabold uppercase ">Tech Course</p>
            </Link>
            {
                
                user ? (
                    <Perfil handleUserSignOut={handleUserSignOut}/>
                ):(
                    <Button>
                        <Link href="/auth/sign-in" className="text-sm font-medium ">
                            Realizar Login
                        </Link>
                    </Button>
                )
            }
            
        </div>

            
            
        </header>
    )
}