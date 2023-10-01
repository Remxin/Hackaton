
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Providers from "./providers";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="w-screen h-screen">
            <header className='p-4 bg-white opacity-100 text-3xl h-20 sticky top-0'>
              <Link href={'/'} className="flex flex-row items-center w-fit">
                <Image src={'/assets/logo4.png'} alt='logo' width={60} height={80}></Image>
                <h1>Studier</h1>
              </Link>
            </header>
            <main className="w-screen h-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
