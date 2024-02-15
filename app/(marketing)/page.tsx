import { Medal } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col font-mont">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounder-full">
          <Medal className="h-6 w-6 mr-2" />
          Task Manager for Producers!
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Tune Tasks: A New Way to Organize Bangers!
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to bg-pink-600 text-white px-4 p-3 rounded pb-4 w-fit">
          WIP Into Finished IP
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center font-poppins mx-auto">
        Collaborate, Manage Projects, and Organize Your Workflow!
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/">Use Tune Tasks for Free!</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
