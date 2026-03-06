"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/", label: "Eventos", icon: "⚽" },
    { href: "/profile", label: "Mis Apuestas", icon: "🎫" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
            B
          </div>
          <span className="text-lg font-bold tracking-tight">
            Bet<span className="text-primary">Day</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="hidden sm:inline">{link.icon} </span>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-x-0 -bottom-3 h-0.5 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div>
          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-surface-hover" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted sm:inline">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-lg bg-surface-hover px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
            >
              Ingresar
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
