"use client"

//React e Next
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

//autenticação
import { auth } from "../../../../firabase";
import {useCreateUserWithEmailAndPassword, useSendEmailVerification} from "react-firebase-hooks/auth"

//Componentes
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//Toast
import { toast } from "react-toastify";

export default function SignUp(){
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userCredential = await createUser(email, password);

        if (!userCredential) {

            toast.error("Este e-mail já está cadastrado ou os dados são inválidos.");
            return; 
        }

        toast.success("Cadastramento realizado com sucesso!");
        await sendEmailVerification();
        router.push("/auth/sign-in");
    };

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-8 text-foreground">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> 
                            Realizar Cadastramento
                        </h1>
                    <p className="text-sm text-muted-foreground">
                        Acesse todos os cursos disponíveis para você!
                    </p>
                    </div>
                   <form className="flex flex-col gap-3 space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Crie sua senha</Label>
                            <Input id="senha" type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>

                        </div>
                        
                        <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <Button 
                                className="w-full text-foreground font-bold hover:bg-muted cursor-pointer" 
                                type="submit">
                                Realizar Cadastro
                            </Button>
                            <Button className=" bg-transparent hover:bg-transparent">
                                <Link href="/auth/sign-in" className="text-sm font-medium hover:text-muted-foreground">
                                    Já tenho uma conta
                                </Link>
                            </Button>
                        </div>
                   </form>
                </div>
            </div>
    )
}