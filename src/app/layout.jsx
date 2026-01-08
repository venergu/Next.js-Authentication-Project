"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./context/AuthContext";
import "@radix-ui/themes/styles.css";
import { Theme, TabNav } from "@radix-ui/themes";
import "./globals.css";
export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <Theme accentColor="crimson" grayColor="sand" radius="large">
            <TabNav.Root>
              <TabNav.Link asChild active={pathname === "/"}>
                <Link href="/">Home</Link>
              </TabNav.Link>

              <TabNav.Link asChild active={pathname === "/login"}>
                <Link href="/login">Login</Link>
              </TabNav.Link>

              <TabNav.Link asChild active={pathname === "/contact"}>
                <Link href="/contact">Kontakt</Link>
              </TabNav.Link>

              <TabNav.Link asChild active={pathname.startsWith("/dashboard")}>
                <Link href="/dashboard">Panel</Link>
              </TabNav.Link>
            </TabNav.Root>

            <main>{children}</main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
