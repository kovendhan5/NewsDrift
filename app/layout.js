import './globals.css'

export const metadata = {
  title: 'Carbon Footprint Calculator',
  description: 'Calculate and track your carbon footprint',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
} 