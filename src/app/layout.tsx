//importação da estilização global
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { JetBrains_Mono, Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import NavBar from "@/components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AutContext";
import ProtectedRoute from "@/components/protectedRoute";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br" className={`${cn( jetbrainsMono.variable, "font-sans", inter.variable)} dark`}
    >
      <body className="min-h-full flex flex-col mx-auto antialiased ">
        <AuthProvider>
          <ProtectedRoute>
            <NavBar/>
            {children}
          </ProtectedRoute>
        </AuthProvider>
        <ToastContainer position="bottom-right"/>
      </body>
    </html>
  );
}
