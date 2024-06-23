/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { draweeks, pollings, votes } from "~/server/db/schema";
import { getWinningVote } from "~/server/queries";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const webpush = require("web-push");

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY,
);

async function getDrawableWords(): Promise<{
  words: string[];
  adjectives: string[];
}> {
  try {
    const response = await fetch("https://www.drawdle.art/drawableWords.json");
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

    const subscriptions = await db.query.subscriptions.findMany();

    // Send push notifications
    const notificationPayload = JSON.stringify({
      title: "New Draweek Theme",
      body: `A new polling has been created with the topic: ${WinningVote}`,
      icon: "/icon-192x192.png",
    });

    subscriptions.forEach((subscription) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      webpush
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .sendNotification(subscription, notificationPayload)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error("Error sending notification", error);
        });
    });

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
