"use server";

import { z } from "zod";
import { submitSubmission } from "../queries";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

const fromSchema = z.object({
  description: z.string().min(1),
});

type CreateSubmission = z.infer<typeof fromSchema>;

export const createSubmission = async (
  values: CreateSubmission,
  draweekId: string,
) => {
  const user = auth();
  if (!user.userId) throw new Error("User not authorized");
  const uploaderInfo = await clerkClient.users.getUser(user.userId);
  if (!uploaderInfo) throw new Error("User not found");
  const userName = uploaderInfo.fullName;
  if (!userName) throw new Error("User not authorized");
  const newSubbmision = await submitSubmission(
    draweekId,
    values.description,
    userName,
  );

  revalidatePath("/draweek/current");
  if (!newSubbmision) return { error: "Submission failed" };
  else return { success: "Submission successful" };
};
