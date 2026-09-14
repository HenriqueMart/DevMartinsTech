'use client';
//React e Next
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Link from "next/link";

//Context
import { useAuth } from "@/context/AutContext";

//componentens
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";

export default function ProtectedRoute({children }: {children: ReactNode}){
    const {user, loading} = useAuth();
    const router = useRouter();
    //Pegando a URL
    const pathname = usePathname();
    //verificando a rota atual se é auth
    const isAuthRoute = pathname?.startsWith("/auth");

    useEffect(() => {
        if(!loading){
            //Realiza a verificação se o usuário não está logado e a url não é Auth
            if(!user && "isAuthRoute"){
                router.push("/auth/sign-in");
            }
            //Verificar ser está logado e a URL é de Auth
            if(user && isAuthRoute){
                router.push("/");
            }
        }
        //Realiza a análise se tem retorno dos dados do contexto, caso não usuário não logado
        
    }, [user, loading, router]);

    if (loading) {
        return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <p className="flex gap-2 text-sm text-muted-foreground animate-pulse">
                <Spinner data-icon="inline-start" />
                Carregando ...
            </p>
        </div>
        );
    }

  //Caso a rota for a correta ou usuário esteja logado mostre o conteúdo
    if (isAuthRoute || user) {
        return <>{children}</>;
    }

    // Protegendo a rota caso tente o acesso de outra forma
    return (
        <div className="w-full h-screen flex flex-col gap-5 justify-center items-center bg-background text-foreground">
            <p className="text-lg font-medium">É necessário realizar o login para acessar essa página!</p>
            <Button>
                <Link href="/auth/sign-in" className="text-sm font-medium ">
                    Realizar Login
                </Link>
            </Button>
        </div>
    );
}
