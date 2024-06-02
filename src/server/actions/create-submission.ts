"use server";

import { z } from "zod";
import { submitSubmission } from "../queries";
import { revalidatePath } from "next/cache";

const fromSchema = z.object({
  description: z.string().min(1),
});

type CreateSubmission = z.infer<typeof fromSchema>;

export const createSubmission = async (
  values: CreateSubmission,
  draweekId: string,
  userName: string,
) => {
  const newSubbmision = await submitSubmission(
    draweekId,
    values.description,
    "18",
    userName,
  );

  revalidatePath("/draweek/current");
  if (!newSubbmision) return { error: "Submission failed" };
  else return { success: "Submission successful" };
};
