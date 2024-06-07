"use server";
import { revalidatePath } from "next/cache";
import { postVote, submitVote } from "../queries";
import { z } from "zod";

const fromSchema = z.object({
  description: z.string().min(1),
});

type CreateSubmission = z.infer<typeof fromSchema>;

export const CreateVote = async (
  pollingId: string,
  topic: CreateSubmission,
) => {
  const newVote = await submitVote(pollingId, topic.description);

  revalidatePath("/draweek/vote");

  if (!newVote) return { error: "Vote failed" };
  else return { success: "Vote successful" };
};
