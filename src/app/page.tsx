import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import UploadImage from "./_components/uploadImage";
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
        <UploadImage h1Name="Welcome to your Image Gallery, put here button to upload images! make into ist own client component and put it in /mygalery" />
        <Images />
      </SignedIn>
    </main>
  );
}
