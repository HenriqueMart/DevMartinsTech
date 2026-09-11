//importação da estilização global
import "./globals.css";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
