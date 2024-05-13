import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="netpub_d310005f021b3343a5e71eedecb48571" content="d310005f021b3343a5e71eedecb48571_4ea7b8c9653876233f2bffc94114b139" />
      </head>
      <body>
        <Navbar />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
