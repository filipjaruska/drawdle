import { SignedIn, SignedOut } from "@clerk/nextjs";
import DraweekCountdown from "./components/draweek-countdown";
import FunnyButton from "./_components/funny-button";
import LinkButton from "~/components/buttons/link-button";
import { getImages, getWinningVote } from "~/server/queries";
import DownloadDraweek from "./_components/download-draweek";
import TestPage from "./test/page";

export default async function HomePage() {
  const winningVote = await getWinningVote();
  const newArt = await getImages();

  return (
    <>
      <SignedIn>
        <TestPage />
        <div className="container mx-auto my-8 space-y-8 p-4">
          <div className="flex flex-col rounded-lg border border-border bg-card shadow-lg sm:flex-row">
            <div className="flex w-full flex-col items-center justify-center border-b border-border p-6 sm:w-1/2 sm:border-r">
              <h1 className="text-center text-4xl font-semibold text-foreground">
                Current Draweek
              </h1>
              <div className="mt-4 text-secondary-foreground">
                <DraweekCountdown />
              </div>
              <div className="mt-6">
                <LinkButton
                  text="Visit Current Draweek"
                  link="draweek/current"
                  message={null}
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center p-6 sm:w-1/2">
              <h1 className="text-center text-4xl font-semibold text-foreground">
                Vote on Future Draweek
              </h1>
              <div className="mt-4 text-secondary-foreground">
                Currently winning: {winningVote}
              </div>
              <div className="mt-6">
                <LinkButton
                  text="Vote on Upcoming Draweek"
                  link="draweek/vote"
                  message={null}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-border bg-card shadow-lg sm:flex-row">
            <div className="flex w-full flex-col items-center justify-center border-b border-border p-6 sm:w-1/2 sm:border-r">
              <h1 className="pb-2 text-center text-2xl font-semibold text-foreground">
                Newest Submission
              </h1>
              {newArt.length > 0 && (
                <img
                  src={newArt[0]?.url}
                  alt="Featured work of art"
                  className="max-h-80 w-full rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex w-full flex-col items-center justify-center p-6 sm:w-1/2">
              <DownloadDraweek />
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="rounded-lg border border-border bg-card p-6 text-center shadow-lg">
            <div className="mb-2 text-2xl font-semibold text-foreground">
              Drawdle is being constructed.
            </div>
            <div className="mb-4 text-secondary-foreground">
              Feel free to log in and check out what is finished.
            </div>
            <FunnyButton title="Funny Button" message="meow" />
          </div>
        </div>
      </SignedOut>
    </>
  );
}
