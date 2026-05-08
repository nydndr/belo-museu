import "./globals.css"

export const metadata = {
  title: "Belo Museu",
  description: "Museus de Belo Horizonte em dados",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground">
        <nav className="border-b px-6 py-4 flex gap-6 text-sm font-medium">
          <a href="/" className="hover:underline">História</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
