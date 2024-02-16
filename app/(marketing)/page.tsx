import Link from 'next/link';

import { Medal, Music } from 'lucide-react';

import { Button } from '@/components/ui/button';

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col font-mont bg-gradient-to-r from-indigo-500 to-red-500 w-full">
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
            className="text-rose-200 hover:opacity-80 transition"
            size={40}
          />
        </div>
        <div className="hover:opacity-70 transition mb-4 flex flex-col items-center shadow-sm p-4 bg-black bg-opacity-50 text-white rounded-full drop-shadow-lg w-3/4">
          <Medal className="h-6 w-6 mr-2" />
          Task Manager for Producers!
          <h1 className="text-3xl md:text-5xl text-center text-white mb-6 drop-shadow-xl font-ligh rounded-full">
            Tune Tasks: A New Way to Organize Bangers!
          </h1>
        </div>
      </div>
      <div className="drop-shadow-xl text-sm md:text-xl text-white mt-4 max-w-xs md:max-w-2xl text-center font-poppins mx-auto bg-black bg-opacity-50 p-4 rounded-full hover:opacity-70 transition">
        Collaborate, Manage, and Organize Your Projects!
      </div>
      <Button
        className="hover:bg-red-400 mt-6 bg-red-500 bg-opacity-75 rounded-full"
        size="lg"
        asChild
      >
        <Link href="/">Use Tune Tasks for Free!</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
