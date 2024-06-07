"use server";
import { revalidatePath } from "next/cache";
import { postVote } from "../queries";

export const Vote = async (userId: string, pollingId: number) => {
  const newVote = await postVote(userId, pollingId);

  revalidatePath("/draweek/vote");

  if (!newVote) return { error: "Vote failed" };
  else return { success: "Vote successful" };
};
