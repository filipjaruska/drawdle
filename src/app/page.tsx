'use client';
import { toast } from 'sonner';
import { Button } from "~/components/ui/button";

export default function HomePage() {

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-2xl">(Drawdle is being constructed.)</div>
        <div className=" text-gray-500">Feel free to log in and checkout whats finish.</div>
        <Button onClick={() => toast("Hi!", { duration: 4000 })}>Funny Button</Button>
      </div>
    </main>
  );
}
