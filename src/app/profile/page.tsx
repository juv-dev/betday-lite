import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BetsList from "@/components/bets/bets-list";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Mis Apuestas</h1>
        <p className="mt-1 text-sm text-muted">
          Hola <span className="font-semibold text-foreground">{session.user?.name}</span>, aqui puedes ver todas tus apuestas
        </p>
      </div>
      <BetsList />
    </div>
  );
}
