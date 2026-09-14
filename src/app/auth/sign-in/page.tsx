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
//icones
import { EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, GraduationCapIcon, KeyIcon } from "@phosphor-icons/react";

export default function SignIn(){
    const router = useRouter();

    const [signUser] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

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

    const visiblePassrowd = () => {
        setViewPassword((prev) => !prev)
    }
    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-8 text-foreground">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <span className="w-fit self-center p-5 rounded-2xl bg-blue-900/60">
                            <GraduationCapIcon size={50} />
                        </span>
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> 
                            Seja-vindo de volta
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acesse todos os cursos e continue aprendendo!
                        </p>
                    </div>
                   <form className="flex flex-col gap-3 space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <div className="relative">
                                <EnvelopeSimpleIcon
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input id="email" type="email" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Digita sua senha</Label>
                             <div className="relative">
                                <KeyIcon
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input id="senha" type={viewPassword ? "text" : "password"} placeholder="*******" onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10"/>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label={viewPassword ? "Ocultar senha" : "Mostrar senha"}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                                    onClick={visiblePassrowd}
                                >
                                    {viewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </Button>
                            </div>
                            <div className="w-full flex justify-end">
                                <Button className="p-0  bg-transparent hover:bg-transparent hover:underline cursor-pointer">
                                    <p className="text-muted-foreground">Esqueci minha senha</p>
                                </Button>
                            </div>
                            
                            {error && (

                                <p className="text-red-400 text-[12px] font-bold">Credencial informado inválido!</p>

                            )}
                        </div>
                        
                        <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <Button 
                                className="w-full text-foreground font-bold hover:bg-muted cursor-pointer" 
                                type="submit">
                                Login
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