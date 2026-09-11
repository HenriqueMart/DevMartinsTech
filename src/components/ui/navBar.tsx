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
import Perfil from "../perfil"
import Link from "next/link"

export default function NavBar(){
    return (
        <header className="flex justify-center items-center h-[50px] border-b border-foreground/5">
            <div className="flex w-full max-w-[1440px] px-4 justify-between items-center">
                <Link href='/'>
                    <p className="text-muted-foreground text-[12px] sm:text-lg ">DevMartins Tech Course</p>
                </Link>
                <Perfil />
            </div>
            
        </header>
    )
}