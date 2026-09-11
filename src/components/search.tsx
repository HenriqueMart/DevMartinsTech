import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function Search(){
    return (
        <Field orientation="horizontal" className="max-w-[600px]">
            <Input type="search" placeholder="Pesquisar" className="h-[50px]"/>
            <Button className="h-[50px]">Procurar</Button>
        </Field>
    )
}