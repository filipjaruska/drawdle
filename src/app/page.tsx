import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex- gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-1/2 p-4">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
      <p>Drawdle in progress</p>
    </main>
  );
}
