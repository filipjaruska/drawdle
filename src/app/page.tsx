import { SignedIn, SignedOut } from '@clerk/nextjs';
import DraweekCountdown from './components/draweek-countdown';
import FunnyButton from './_components/funny-button';
import LinkButton from '~/components/buttons/link-button';
import { getImages, getWinningVote } from '~/server/queries';

export default async function HomePage() {
  const winningVote = await getWinningVote();
  const newArt = await getImages();

  return (
    <>
      <SignedIn>
        <div className="container mx-auto my-8 p-4 space-y-8">
          <div className="bg-card border border-border rounded-lg shadow-lg flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-center border-b sm:border-r border-border">
              <h1 className="text-4xl font-semibold text-center text-foreground">Current Draweek</h1>
              <div className="mt-4 text-secondary-foreground">
                <DraweekCountdown />
              </div>
              <div className="mt-6">
                <LinkButton text="Visit Current Draweek" link="draweek/current" message={null} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-semibold text-center text-foreground">Vote on Future Draweek</h1>
              <div className="mt-4 text-secondary-foreground">Currently winning: {winningVote}</div>
              <div className="mt-6">
                <LinkButton text="Vote on Upcoming Draweek" link="draweek/vote" message={null} />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg p-6">
            <div className="text-xl font-semibold text-center text-foreground mb-4">Newest Submission</div>
            {newArt.length > 0 && (
              <img src={newArt[0]?.url} alt="Featured work of art" className="w-full max-h-80 object-cover rounded-lg" />
            )}
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg p-6 text-center text-foreground hidden">
            Download PWA
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center p-6 bg-card border border-border rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-foreground mb-2">Drawdle is being constructed.</div>
            <div className="text-secondary-foreground mb-4">Feel free to log in and check out what is finished.</div>
            <FunnyButton title="Funny Button" message="meow" />
          </div>
        </div>
      </SignedOut>
    </>
  );
}
