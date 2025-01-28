import type { Metadata } from "next";
import "./globals.css";
import { beaufortPro } from "../fonts";
import AbstractProvider from "./AbstractProvider";
import MusicWrapper from "./MusicWrapper";
import UserDataContext from "./UserDataContext";
import { SessionKeyProvider } from "@/components/global/SessionKeyContext";

export const metadata: Metadata = {
  title: "WITS IDLE",
  description: "WITS IDLE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={beaufortPro.className}>
        <AbstractProvider>
          <UserDataContext>
            <SessionKeyProvider>
              <MusicWrapper>
                <div id="modal" className="fixed z-50"></div>
                {children}
              </MusicWrapper>
            </SessionKeyProvider>
          </UserDataContext>
        </AbstractProvider>
      </body>
    </html>
  );
}
