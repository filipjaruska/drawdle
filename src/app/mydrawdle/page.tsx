import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import FunnyButton from "../_components/funny-button";

export default async function MyDrawdle() {
  const images = await getMyImages();
  const user = auth();
  if (!user.userId) throw new Error("User not authorized");
  const uploaderInfo = await clerkClient.users.getUser(user.userId);
  if (!uploaderInfo) throw new Error("User not found");
  const canUpload = uploaderInfo.privateMetadata["can-upload"];
  const streakLength = uploaderInfo.privateMetadata["streak-length"] as number;

  function formatTimestamp(timestamp: number | null) {
    if (timestamp === null) {
      return "💀";
    }
    const date = new Date(timestamp);
    return date.toLocaleString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  }

  async function Images() {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative rounded-lg border-4 border-muted bg-card p-4 shadow-md"
          >
            <Link href={`/art/${image.id}`}>
              <Image
                alt={image.name}
                width={192}
                height={192}
                src={image.url}
                className="h-auto w-full rounded-lg hover:scale-105"
              />
            </Link>
            <div className="mt-2 text-center text-xl text-card-foreground">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl text-foreground">
          Please sign in above.
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto p-4">
          <div className="m-4 flex justify-between gap-4 rounded-lg border-4 border-muted bg-card p-4">
            <div className="flex gap-4">
              <div style={{ userSelect: "none" }} className="relative">
                <img
                  src={uploaderInfo.imageUrl}
                  alt="user profile image"
                  width={54}
                  height={54}
                  className="rounded-full"
                />
                <div className="absolute -right-2 -top-2 flex h-7 w-7 animate-bounce items-center justify-center rounded-full bg-destructive text-xl font-bold text-destructive-foreground">
                  {streakLength ? streakLength : 0}
                </div>
                <div className="absolute -bottom-1 -left-1 flex items-center justify-center">
                  {canUpload ? "🟢" : "🔴"}
                </div>
              </div>
              <div className="flex flex-col justify-center text-foreground">
                <div className="text-lg font-semibold">
                  {uploaderInfo.fullName}
                </div>
                <div className="text-muted-foreground">
                  Last online at: {formatTimestamp(uploaderInfo.lastActiveAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FunnyButton title="Button" message="Azumanga Daioh" />
            </div>
          </div>
          <Images />
        </div>
      </SignedIn>
    </>
  );
}
