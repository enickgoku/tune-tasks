import Link from 'next/link';
import Image from 'next/image';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

import AudioIcon from '@/public/logo.svg';

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center font-mono">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <div className="hover:opacity-60 md:hidden transition">
            <Link href="/">
              <Image
                src={AudioIcon}
                alt="Tune Tasks Logo"
                width={50}
                height={100}
              />
            </Link>
          </div>
          <Button size="sm" variant="default" asChild>
            <Link href="/sign-up">Signup!</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
