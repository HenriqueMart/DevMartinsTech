"use client"

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../../../../firabase";
import {useCreateUserWithEmailAndPassword, useSendEmailVerification} from "react-firebase-hooks/auth"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp(){
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const result = await createUser(email, password);

            await sendEmailVerification();
            console.log("Usuário criado:", result);

            router.push("/auth/sign-in");

        }catch(error){
            console.error("Erro ao criar usuário:", error);
        }
        
    };

    return (
        <div className="p-8 text-foreground">
                <Button className="absolute right-8 top-8 bg-muted hover:bg-muted-foreground">
                    <Link href="/auth/sign-in">
                        Realizar login
                    </Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-center"> {/*tracking-tight - alinhamento das letras */}
                            Acessar Curso
                    </h1>
                    <p className="text-[12px] sm:text-sm text-muted-foreground">
                        Acesse curso disponível para você!
                    </p>
                    </div>
                   <form className="space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                            <Label htmlFor="senha">Digita sua senha</Label>
                            <Input id="senha" type="senha" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <Button 
                            
                            
                            className="w-full text-foreground font-bold hover:bg-muted cursor-pointer" 
                            type="submit" >
                                Realizar Cadastro
                            </Button>
                   </form>
                </div>
            </div>
    )
}