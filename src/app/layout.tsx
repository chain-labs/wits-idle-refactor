import type { Metadata } from "next";
import "./globals.css";
import { beaufortPro } from "../fonts";
import AbstractProvider from "./AbstractProvider";
import MusicWrapper from "./MusicWrapper";
import UserDataContext from "./UserDataContext";

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
            <MusicWrapper>
              <div id="modal" className="fixed z-50"></div>
              {children}
            </MusicWrapper>
          </UserDataContext>
        </AbstractProvider>
      </body>
    </html>
  );
}
