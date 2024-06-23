import { NextRequest, NextResponse } from "next/server";
import { subscriptions } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

interface Subscription {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Subscription = await request.json();

    if (!body) {
      throw new Error("Invalid subscription object");
    }

    const user = auth();
    if (!user.userId) throw new Error("User not authorized");

    const existingSubscription = await db.query.subscriptions.findFirst({
      where: (model, { eq }) => eq(model.userId, user.userId),
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: "Subscription already exists for this user" },
        { status: 409 },
      );
    }

    await db.insert(subscriptions).values({
      userId: user.userId,
      endpoint: body.endpoint,
      keys: body.keys,
    });

    return NextResponse.json(
      { message: "Subscription saved" },
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
