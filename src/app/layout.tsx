import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TerminMeister",
  description: "The adanced booking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
