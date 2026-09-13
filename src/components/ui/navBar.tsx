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

export default function NavBar(){
    return (
        <header className="flex w-full justify-center items-center h-[50px] border-b border-foreground/5">

        <div className="w-full max-w-[1440px] mx-[100px] flex  px-4 justify-between items-center">
            <Link href='/'>
                <p className="text-muted-foreground text-[12px] sm:text-lg font-extrabold uppercase ">Tech Course</p>
            </Link>
            <Perfil />
        </div>

            
            
        </header>
    )
}