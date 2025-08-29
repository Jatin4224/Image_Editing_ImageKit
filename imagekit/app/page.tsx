import ImageDisplay from "./components/image-display";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.2)_0%,transparent_70%)] pointer-events-none"></div>

      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">
        Chai Aur Background{" "}
      </h1>
      <div className="max-w-6xl mx-auto">
        <ImageDisplay />
      </div>
    </main>
  );
}
