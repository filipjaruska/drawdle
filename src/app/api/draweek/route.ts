import { NextRequest, NextResponse } from "next/server";
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

export async function POST() {
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

    const promises = Array.from({ length: 3 }, async () => {
      const drawableWord = await getRandomDrawableWord();
      await db.insert(votes).values({
        pollingId: newPolling.id.toString(),
        topic: drawableWord,
        createdBy: "automated",
      });
    });
    await Promise.all(promises);

    return NextResponse.json("Task executed successfully", { status: 201 });
  } catch (error) {
    return NextResponse.json(`Failed to execute task: ${!error}`, {
      status: 500,
    });
  }
}
