import { Medal, Music } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col font-mont bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-red-600 to-gray-500">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-6 flex flex-col items-center drop-shadow-lg">
          <Music
            className="text-rose-600 hover:opacity-80 transition"
            size={40}
          />
          <Music
            className="text-rose-400 hover:opacity-80 transition"
            size={40}
          />
          <Music
            className="text-rose-100 hover:opacity-80 transition"
            size={40}
          />
        </div>
        <div className="hover:opacity-70 transition mb-4 flex items-center shadow-sm p-4 bg-rose-100 text-amber-700 rounder-full rounded-lg drop-shadow-lg">
          <Medal className="h-6 w-6 mr-2" />
          Task Manager for Producers!
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-900 mb-6 drop-shadow-xl">
          Tune Tasks: A New Way to Organize Bangers!
        </h1>
        <div className="hover:opacity-70 transition text-3xl md:text-4xl text-center bg-gradient-to-r from-red-600 to bg-black text-white px-4 p-3 rounded-xl pb-4 w-fit drop-shadow-lg">
          WIP Into Finished IP
        </div>
      </div>
      <div className="drop-shadow-xl text-sm md:text-xl text-white mt-4 max-w-xs md:max-w-2xl text-center font-poppins mx-auto">
        Collaborate, Manage, and Organize Your Projects!
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/">Use Tune Tasks for Free!</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
