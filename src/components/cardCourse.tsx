import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function CardCourse(){
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src="https://images.pexels.com/photos/1102797/pexels-photo-1102797.png"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60  dark:brightness-60"
            />
            <CardHeader>
                <CardAction>
                <Badge variant="destructive">Tecnologia</Badge>
                </CardAction>
                <CardTitle>Curso de HTML E CSS</CardTitle>
                <CardDescription>
                Do fundamento a criação da primeira Laodpage
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href='/course'>Inscreve-se</Link></Button>
            </CardFooter>
        </Card>
    )
}