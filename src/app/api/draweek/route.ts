import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { draweeks, pollings, votes } from "~/server/db/schema";
import { getWinningVote } from "~/server/queries";

async function getDrawableWords(): Promise<{
  words: string[];
  adjectives: string[];
}> {
  try {
    const response = await fetch(
      `${process.env.THIS_WEBSITE_URL}/drawableWords.json`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch drawableWords.json");
    }
    const data = (await response.json()) as {
      words: string[];
      adjectives: string[];
    };
    return data;
  } catch (error) {
    console.error("Error fetching drawableWords.json:", error);
    throw new Error("Failed to fetch drawableWords.json");
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
    if (!newPolling) throw new Error("New polling not found.");

    const promises = Array.from({ length: 5 }, async () => {
      const drawableWord = await getRandomDrawableWord();
      await db.insert(votes).values({
        pollingId: newPolling.id.toString(),
        topic: drawableWord,
        createdBy: "automated",
      });
    });
    await Promise.all(promises);

    return NextResponse.json(
      { message: "Task executed successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error executing task:", error);
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      { message: `Failed to execute task: ${error}` },
      {
        status: 500,
      },
    );
  }
}
