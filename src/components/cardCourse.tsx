//Next
import Link from "next/link"

//Componentes
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
import { Course } from "@/data/@types/course"

export default function CardCourse( {id, description, thumbnail, title}: Course){
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={thumbnail}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60  dark:brightness-60"
            />
            <CardHeader>
                <CardAction>
                <Badge variant="default" className="text-[10px] sm:text-sm">Gestão</Badge>
                </CardAction>
                <CardTitle className="text-sm sm:text-lg">{title}</CardTitle>
                <CardDescription className="text-[10px] sm:text-sm">
                    {description ? (
                        description
                    ): (
                        "Sem descrição"
                    )}
                    {description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full cursor-pointer">
                    <Link className="w-full" href={`/courses/${id}`}>Assistir</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}