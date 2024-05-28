import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  async function Images() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="p-4 border-dashed border-2 border-sky-700 divide-y divide-blue-200">
            <img src={image.url} className="p-2 w-full h-5/6" />
            <div className="text-xl">{image.name}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="pt-1">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center ">Please sign in above.</div>
      </SignedOut>
      <SignedIn>
        <div className="p-4 bg-gray-700">
          <h1 className="text-4xl text-center">Welcome to your Image Gallery, put here button to upload images! make into ist own client component and put it in /mygalery</h1>
          <p className="text-center text-gray-500">Descripton of stuff, recomend to scan images using x app</p>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Upload tem button</button>
          </div>
        </div>
        <Images />
      </SignedIn>
    </main>
  );
}
