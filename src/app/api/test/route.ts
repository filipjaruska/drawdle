import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { getWinningVote } from "~/server/queries";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const webpush = require("web-push");

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY,
);

export async function POST() {
  try {
    const subscriptions = await db.query.subscriptions.findMany();

    const WinningVote = await getWinningVote();
    if (!WinningVote) throw new Error("Winning vote not found.");
    // Send push notifications
    const notificationPayload = JSON.stringify({
      title: "This is a test",
      body: `A currently ${WinningVote} is winning the pole`,
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
      { message: "Test executed successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      { message: `Failed to execute task: ${error}` },
      {
        status: 500,
      },
    );
  }
}
