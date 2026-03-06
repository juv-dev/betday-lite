import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TeamLogo from "@/components/ui/team-logo";

describe("TeamLogo", () => {
  it("renders an img for a known team", () => {
    render(<TeamLogo teamId="ars" shortName="ARS" size={44} />);
    const img = screen.getByAltText("ARS");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://crests.football-data.org/57.png"
    );
  });

  it("renders SVG fallback for unknown team", () => {
    const { container } = render(
      <TeamLogo teamId="unknown" shortName="UNK" size={44} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    const text = container.querySelector("text");
    expect(text?.textContent).toBe("UNK");
  });

  it("falls back to SVG on image error", () => {
    render(<TeamLogo teamId="ars" shortName="ARS" size={44} />);
    const img = screen.getByAltText("ARS");
    fireEvent.error(img);
    // After error, SVG fallback should render
    expect(screen.queryByAltText("ARS")).not.toBeInTheDocument();
  });

  it("uses custom size", () => {
    render(<TeamLogo teamId="liv" shortName="LIV" size={32} />);
    const img = screen.getByAltText("LIV");
    expect(img).toHaveAttribute("width", "32");
    expect(img).toHaveAttribute("height", "32");
  });

  it("renders correct crest URLs for different teams", () => {
    const { unmount } = render(
      <TeamLogo teamId="che" shortName="CHE" size={44} />
    );
    expect(screen.getByAltText("CHE")).toHaveAttribute(
      "src",
      "https://crests.football-data.org/61.png"
    );
    unmount();

    render(<TeamLogo teamId="bur" shortName="BUR" size={44} />);
    expect(screen.getByAltText("BUR")).toHaveAttribute(
      "src",
      "https://crests.football-data.org/328.png"
    );
  });
});
