import Link from "next/link";
import { mock } from "node:test";

const mockData = [
  "https://utfs.io/f/9bbee1ad-ff97-4fa2-a47c-2ad91b77f690-yn8kuo.jpeg",
]
const mockImages = mockData.map((url, index) => ({
  id: index + 1,
  url
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex- gap-4">
        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-1/2 p-4">
            <img src={image.url} />
          </div>
        ))}
      </div>
      <p>Drawdle in progress</p>
    </main>
  );
}
