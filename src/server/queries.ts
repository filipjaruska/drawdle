import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";
import { db } from "~/server/db";
import { draweeks, images, pollings, submissions, votes } from "./db/schema";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("User not authorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) return {};

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

export async function getDraweeks() {
  const draweeks = await db.query.draweeks.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  if (!draweeks) throw new Error("No draweeks found");

  return draweeks;
}

export async function getDraweek(draweekId: number) {
  const draweek = await db.query.draweeks.findFirst({
    where: (model, { eq }) => eq(model.id, draweekId),
  });

  if (!draweek) throw new Error("No draweek found");

  return draweek;
}

export async function getNewestDraweek() {
  const draweeks = await db.query.draweeks.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  if (!draweeks) throw new Error("No draweeks found");

  const newestDraweek = draweeks[0];

  return newestDraweek;
}

export async function getDraweekSubmissions(draweekId: string) {
  const submissions = await db.query.submissions.findMany({
    where: (model, { eq }) => eq(model.draweekId, draweekId),
  });

  if (!submissions) throw new Error("No submissions found");
  return submissions;
}

export async function submitSubmission(
  draweekId: string,
  description: string,
  userName: string,
) {
  const user = auth();
  if (!user.userId) throw new Error("User not authorized");

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  if (!images) throw new Error("No images found for this user");
  const image = images[0];
  if (!image) throw new Error("No image found for this user");

  const uploaderInfo = await clerkClient.users.getUser(user.userId);
  if (!uploaderInfo) throw new Error("User not found");

  await db.insert(submissions).values({
    description: description,

    userId: user.userId,
    userName: userName,
    userIcon: uploaderInfo.imageUrl,
    imageId: image.id.toString(),
    imageUrl: image.url,
    draweekId: draweekId,
  });

  await db
    .update(draweeks)
    .set({
      submittedSubmissionsIds: sql`array_append(${draweeks.submittedSubmissionsIds}, ${user.userId})`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(draweeks.id, Number(draweekId)))
    .execute();

  const streakLength = uploaderInfo.privateMetadata["streak-length"] as number;

  await clerkClient.users.updateUserMetadata(user.userId, {
    privateMetadata: {
      "streak-length": streakLength + 1,
    },
  });

  return {};
}

export async function getNewestPooling() {
  const pooling = await db.query.pollings.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  if (!pooling) throw new Error("No draweeks found");

  const newestPooling = pooling[0];

  return newestPooling;
}

export async function getPollingVotes(PollingsID: string) {
  const votes = await db.query.votes.findMany({
    where: (model, { eq }) => eq(model.pollingId, PollingsID),
  });

  if (!votes) throw new Error("No submissions found");
  return votes;
}

export async function postVote(userId: string, pollingId: number) {
  const vote = await db.query.votes.findFirst({
    where: (model, { eq }) => eq(model.id, pollingId),
  });
  const uploaderInfo = await clerkClient.users.getUser(userId);
  if (!uploaderInfo) throw new Error("User not found");
  if (vote && !vote.voterIDs?.includes(userId)) {
    await db
      .update(votes)
      .set({
        voterIDs: sql`array_append(${votes.voterIDs}, ${userId})`,
        voterImages: sql`array_append(${votes.voterImages}, ${uploaderInfo.imageUrl})`,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(votes.id, vote.id))
      .execute();
  }
  return {};
}

export async function submitVote(pollingId: string, topic: string) {
  const user = auth();
  if (!user.userId) throw new Error("User not authorized");
  const uploaderInfo = await clerkClient.users.getUser(user.userId);
  if (!uploaderInfo) throw new Error("User not found");
  const userName = uploaderInfo.firstName;
  if (!userName) throw new Error("User not authorized");

  await db.insert(votes).values({
    pollingId: pollingId,
    topic: topic,
    createdBy: userName,
  });

  await db
    .update(pollings)
    .set({
      submittedIdeaIds: sql`array_append(${pollings.submittedIdeaIds}, ${user.userId})`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(pollings.id, Number(pollingId)))
    .execute();
  return {};
}

export async function getWinningVote() {
  const newPolling = await db.query.pollings.findFirst({
    orderBy: (model, { desc }) => desc(model.id),
  });
  if (!newPolling) throw new Error("Winning vote not found.");

  const votes = await db.query.votes.findMany({
    where: (model, { eq }) => eq(model.pollingId, newPolling.id.toString()),
  });
  const sortedVotes = votes.sort(
    (a, b) =>
      (b.voterIDs ? b.voterIDs.length : 0) -
      (a.voterIDs ? a.voterIDs.length : 0),
  );

  return sortedVotes[0]?.topic;
}

// export async function checkStreek(userId: string) {
//   const lastSubmission = await db.query.submissions.findFirst({
//     where: (model, { eq }) => eq(model.id, Number(userId)),
//   });
//   if (!lastSubmission) return {};

//   const lastSubmissionDate = new Date(lastSubmission.createdAt); // Adjust according to your schema
//   const now = new Date();
//   const differenceInMillis = now.getTime() - lastSubmissionDate.getTime();

//   const daysDifference = differenceInMillis / (1000 * 60 * 60 * 24);

//   if (daysDifference >= 14) {
//     await clerkClient.users.updateUserMetadata(userId, {
//       privateMetadata: {
//         "streak-length": 0,
//       },
//     });
//   }
// }
