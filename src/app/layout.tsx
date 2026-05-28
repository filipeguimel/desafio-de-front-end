import './globals.css'

export const metadata = {
  title: 'Weather App',
  description: 'Weather App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
