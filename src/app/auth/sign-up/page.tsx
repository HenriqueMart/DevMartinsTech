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
import { EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, GraduationCapIcon, KeyIcon } from "@phosphor-icons/react";

export default function SignUp(){
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [viewPassword, setViewPassword] = useState(false);
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const visiblePassrowd = () => {
        setViewPassword((prev) => !prev)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userCredential = await createUser(email, password);

        if (!userCredential) {

            toast.error("Este e-mail já está cadastrado ou os dados são inválidos.");
            return; 
        }

        toast.success("Cadastramento realizado com sucesso!");

        try {
            await sendEmailVerification();
            router.push('/');
        } catch {
            toast.error("Não foi possível enviar o e-mail de verificação.");
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-8 text-foreground">
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <span className="w-fit self-center p-5 rounded-2xl bg-blue-900/60">
                            <GraduationCapIcon size={50} />
                        </span>
                        <h1 className="text-2xl font-semibold tracking-tight text-center"> 
                            Cria sua conta
                        </h1>
                    <p className="text-sm text-muted-foreground">
                        Acesse todos os cursos disponíveis e comece sua jornada de aprendizado!
                    </p>
                    </div>
                   <form className="flex flex-col gap-3 space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <div className="relative">
                                <EnvelopeSimpleIcon
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-4 -translate-y-1/2 text-muted-foreground"
                                />
                            </div>
                            <Input id="email" type="email" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)} className="pl-10"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Crie sua senha</Label>
                            <div className="relative">
                                <KeyIcon
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input id="senha" type={viewPassword ? "text" : "password"} placeholder="*******" onChange={(e) => setPassword(e.target.value)} className="pl-10"/>
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