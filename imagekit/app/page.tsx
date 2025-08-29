import ImageDisplay from "./components/image-display";
import Transformed from "./components/transformed";
import TransformedImage from "./components/transformed-image";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        chai aur ImageEditing{" "}
      </h1>
      <div className="max-w-6xl mx-auto">
        <ImageDisplay />
        <Transformed />
        <TransformedImage />
      </div>
    </main>
  );
}
