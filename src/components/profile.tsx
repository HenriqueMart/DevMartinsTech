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

export default function Perfil(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="size-8">
                    <AvatarImage src="https://images.pexels.com/photos/3275037/pexels-photo-3275037.jpeg" alt="shadcn" />
                    <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                </Button>
            }/>
            <DropdownMenuContent 
                align="end"
                className="rounded-sm bg-popover">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Minha conta
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
    </DropdownMenu>
    )
} 