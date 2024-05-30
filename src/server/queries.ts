import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";
import { db } from "~/server/db";
import { images } from "./db/schema";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("User not authorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

// export async function getMySubmittedImages() {
//   const user = auth();

//   if (!user.userId) throw new Error("User not authorized");

//   const images = await db.query.images.findMany({
//     where: (model, { not, isNull, eq }) =>
//       not(isNull(model.submitted)) && eq(model.userId, user.userId),
//   });
//   return images.length;
// }

export async function getImage(id: number) {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  return image;
}

export async function getImages() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("User not authorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  revalidatePath("/mydrawdle");
  redirect("/mydrawdle");
}
