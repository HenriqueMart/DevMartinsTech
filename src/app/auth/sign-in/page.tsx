"use client"
//React e Next
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

//Toast
import {toast} from "react-toastify"

//autenticação
import { auth } from "../../../../firabase";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"

//compontentes
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn(){
    const router = useRouter();

    const [signUser] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
            const result = await signUser(email, password);

            if (!result) {
                toast.error("Credencial Inválida, tente novamente.");
                setError(true);
                return; 
            }

            setError(false);
            toast.success("Login realizado com sucesso!")
            router.push("/");   
    };

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-8 text-foreground">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> 
                            Realizar Login
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
                            <Label htmlFor="password">Digita sua senha</Label>
                            <Input id="senha" type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                            {error && (
                                <p className="text-red-400 text-[12px] font-bold">Credencial informado inválido!</p>
                            )}
                        </div>
                        
                        <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <Button 
                                className="w-full text-foreground font-bold hover:bg-muted cursor-pointer" 
                                type="submit">
                                Realizar Login
                            </Button>
                            <Button className=" bg-transparent hover:bg-transparent">
                                <Link href="/auth/sign-up" className="text-sm font-medium hover:text-muted-foreground">
                                    Não tenho uma conta
                                </Link>
                            </Button>
                        </div>
                        
                   </form>
                </div>
            </div>
    )
}