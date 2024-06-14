import { SignedIn, SignedOut } from '@clerk/nextjs';
import DraweekCountdown from './components/draweek-countdown';
import FunnyButton from './_components/funny-button';
import LinkButton from '~/components/buttons/link-button';
import { getImages, getWinningVote } from '~/server/queries';

export default async function HomePage() {
  const WinningVote = await getWinningVote()
  const NewArt = await getImages()
  return (
    <>
      <SignedIn>
        <div className='border-4 border-gray-200 border-opacity-80 m-4 rounded-lg flex flex-col sm:flex-row bg-slate-700'>
          <div className='w-full sm:w-1/2 sm:border-r-4 border-b-0 border-gray-200 p-4 flex flex-col items-center justify-center gap-4'>
            <h1 className="text-4xl text-center">Current Draweek</h1>
            <div className="text-gray-300">
              <DraweekCountdown />
            </div>
            <div className="flex justify-center items-center">
              <LinkButton text='visit current draweek' link='draweek/current' message={null} />
            </div>
          </div>
          <div className='w-full sm:w-1/2 border-gray-200 border-t-4 p-4 sm:border-t-0 flex flex-col items-center justify-center gap-4'>
            <h1 className="text-4xl text-center">Vote on Future Draweek</h1>
            {/* Voting content goes here */}
            <div>Currently winning: {WinningVote}</div>
            <LinkButton text='vote on upcoming draweek' link='draweek/vote' message={null} />
          </div>
        </div>
        <div className="container border-4 border-gray-200 border-opacity-80 rounded-lg flex flex-col bg-slate-700 m-auto p-4 gap-4">
          <div className='font-semibold text-xl text-center'>newest submission</div>
          <img src={NewArt[0]?.url} alt='featured work of art' />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-2xl">(Drawdle is being constructed.)</div>
            <div className=" text-gray-500">Feel free to log in and checkout whats finish.</div>
            <FunnyButton title='Funny Button' message='meow' />
          </div>
        </div>
      </SignedOut>
    </>
  );
}
