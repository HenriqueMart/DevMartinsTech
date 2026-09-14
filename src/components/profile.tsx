"use client"
//autenticação
import { useAuth } from "@/context/AutContext";

//Componentes
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface PerfilProps {
  handleUserSignOut: () => Promise<void>;
}

export default function Perfil({ handleUserSignOut}: PerfilProps) {
    const {user} = useAuth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <Avatar className="size-8">
                        <AvatarImage className="p-1" src="https://images.icon-icons.com/3446/PNG/512/profile_user_avatar_people_icon_219228.png" alt="shadcn" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
                align="end"
                className="rounded-sm bg-popover"
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem className="font-semibold px-2 py-1.5 text-sm select-none pointer-events-none opacity-90">
                       <div>
                            <p className="text-[8px]">Usuário:</p>
                            <p className="text-[8px]">{user?.email}</p>
                       </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer font-medium" onClick={handleUserSignOut}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> 
    )
}
