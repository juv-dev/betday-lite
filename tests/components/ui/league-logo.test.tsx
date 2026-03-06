import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueLogo from "@/components/ui/league-logo";

describe("LeagueLogo", () => {
  it("renders an img for Premier League", () => {
    render(
      <LeagueLogo
        leagueId="premier_league"
        leagueName="Premier League"
        country="England"
        size={20}
      />
    );
    const img = screen.getByAltText("Premier League");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/leagues/premier-league.png");
  });

  it("renders flag fallback for unknown league", () => {
    render(
      <LeagueLogo
        leagueId="unknown_league"
        leagueName="Unknown"
        country="England"
        size={20}
      />
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTitle("Unknown")).toBeInTheDocument();
  });

  it("falls back to flag emoji on image error", () => {
    render(
      <LeagueLogo
        leagueId="premier_league"
        leagueName="Premier League"
        country="England"
        size={20}
      />
    );
    const img = screen.getByAltText("Premier League");
    fireEvent.error(img);
    expect(screen.queryByAltText("Premier League")).not.toBeInTheDocument();
    expect(screen.getByTitle("Premier League")).toBeInTheDocument();
  });

  it("uses custom size", () => {
    render(
      <LeagueLogo
        leagueId="premier_league"
        leagueName="Premier League"
        country="England"
        size={30}
      />
    );
    const img = screen.getByAltText("Premier League");
    expect(img).toHaveAttribute("width", "30");
    expect(img).toHaveAttribute("height", "30");
  });
});
