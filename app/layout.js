import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
            <Navbar />
            <Analytics/>
            <SpeedInsights/>
            {children}
      </body>
    </html>
  );
}
