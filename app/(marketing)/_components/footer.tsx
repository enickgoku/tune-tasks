import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <div className="fixed bottom-0 h-14 p-2 w-full border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto w-full">
        <div className="space-x-4 flex items-center justify-between w-full font-mont">
          <Button
            className="hover:opacity-50 transition"
            size="sm"
            variant="ghost"
          >
            Privacy Policy
          </Button>
          <div>
            <p className="text-black-100 font-light">© Tune Tasks 2024</p>
            <p className="text-black-100 text-sm font-light">
              Powered By Harkinta
            </p>
          </div>
          <Button
            className="hover:opacity-50 transition"
            size="sm"
            variant="ghost"
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
