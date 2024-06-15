import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { draweeks, pollings, votes } from "~/server/db/schema";
import { getWinningVote } from "~/server/queries";
import { promises as fs } from "fs";

type ResponseData = {
  message: string;
};

async function getDrawableWords(): Promise<{
  words: string[];
  adjectives: string[];
}> {
  try {
    const jsonData = await fs.readFile(
      process.cwd() + "/src/app/api/draweek/drawableWords.json",
      "utf8",
    );
    const data = JSON.parse(jsonData) as {
      words: string[];
      adjectives: string[];
    };
    return data;
  } catch (error) {
    console.error("Error reading or parsing drawableWords.json:", error);
    throw new Error("Failed to read or parse drawableWords.json");
  }
}

async function getRandomDrawableWord(): Promise<string> {
  try {
    const { words, adjectives } = await getDrawableWords();
    if (
      !words ||
      !adjectives ||
      words.length === 0 ||
      adjectives.length === 0
    ) {
      throw new Error("Words or adjectives array is empty or undefined.");
    }
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);

    const randomWord = words[randomWordIndex];
    const randomAdjective = adjectives[randomAdjectiveIndex];

    return `${randomAdjective} ${randomWord}`;
  } catch (error) {
    console.error("Error in getRandomDrawableWord:", error);
    throw error;
  }
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const WinningVote = await getWinningVote();
    if (!WinningVote) throw new Error("Winning vote not found.");
    await db.insert(draweeks).values({
      topic: WinningVote,
    });

    await db.insert(pollings).values({});

    const newPolling = await db.query.pollings.findFirst({
      orderBy: (model, { desc }) => desc(model.id),
    });
    if (!newPolling) throw new Error("Winning vote not found.");

    const promises = Array.from({ length: 5 }, async () => {
      const drawableWord = await getRandomDrawableWord();
      await db.insert(votes).values({
        pollingId: newPolling.id.toString(),
        topic: drawableWord,
        createdBy: "automated",
      });
    });
    await Promise.all(promises);

    res.status(200).json({ message: "Task executed successfully" });
  } catch (error) {
    res.status(500).json({ message: `Failed to execute task: ${!error}` });
  }
}
