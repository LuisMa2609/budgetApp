import { Inconsolata } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"

const inconsolata = Inconsolata({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inconsolata",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inconsolata.variable}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
