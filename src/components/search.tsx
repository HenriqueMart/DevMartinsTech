//react
import { useState } from "react";

//componentes
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

//icone
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

interface SearchInputProps{
    onSearch: (value: string) => void;
}

export function Search({onSearch}:SearchInputProps){
    const [value, setValue] = useState("");

    function handleSubmit(){
        onSearch(value);
    }

    return (
        <Field orientation="horizontal" className="w-[250px] lg:w-[400px]">
            <Input 
                value={value}
                onChange={(event) => setValue(event.target.value)} 
                onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
                placeholder="Pesquisar Curso" 
                className="h-[30px] sm:h-[40px] placeholder:text-sm"/>
            <Button onClick={handleSubmit} className="h-[30px] sm:h-[40px] text-sm">
                Procurar
                <MagnifyingGlassIcon  className="size-4" />    
            </Button>
        </Field>
    )
}