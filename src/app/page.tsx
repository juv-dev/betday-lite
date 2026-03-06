import { Suspense } from "react";
import EventsLoader from "@/components/events/events-loader";
import HomeHeader from "@/components/layout/home-header";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <Suspense
        fallback={
          <div className="space-y-6 pl-10 md:pl-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-20 animate-pulse rounded-lg bg-surface-hover" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="h-60 animate-pulse rounded-2xl bg-surface" />
                  <div className="h-60 animate-pulse rounded-2xl bg-surface" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <EventsLoader />
      </Suspense>
    </div>
  );
}
