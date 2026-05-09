import { Habibi, Monomakh, Intel_One_Mono } from "next/font/google"
import "./globals.css"

const monomakh = Monomakh({
  subsets: ["latin"],
  variable: "--font-monomakh",
})

const habibi = Habibi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-habibi",
})

const intelMono = Intel_One_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-intel-mono",
})

export const metadata = {
  title: "Belo Museu",
  description: "Museus de Belo Horizonte em dados",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${monomakh.variable} ${habibi.variable} ${intelMono.variable}`}>
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
