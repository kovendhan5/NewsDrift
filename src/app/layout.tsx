import './globals.css';

export const metadata = {
  title: 'Carbon Footprint Calculator',
  description: 'Calculate and track your carbon footprint',
}

import './globals.css';

export const metadata = {
  title: 'Carbon Footprint Calculator',
  description: 'Calculate and track your carbon footprint',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}