import { Game } from "@/components/game";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
      }}>
      <Game />
    </main>
  );
}
