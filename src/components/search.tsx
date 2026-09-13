import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";

interface SearchInputProps{
    onSearch: (value: string) => void;
}

export function Search({onSearch}:SearchInputProps){

    //Captura do pesquisa
    const [value, setValue] = useState("");

    function handleSubmit(){
        onSearch(value);
    }

    return (
        <Field orientation="horizontal" className="max-w-[400px]">
            <Input 
                value={value}
                onChange={(event) => setValue(event.target.value)} 
                onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
                placeholder="Pesquisar" 
                className="h-[40px]"/>
            <Button onClick={handleSubmit} className="h-[40px]">Procurar</Button>
        </Field>
    )
}