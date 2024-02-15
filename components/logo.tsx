import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-60 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Tune Tasks Logo" width={50} height={100} />
        <p className="text-lg text-neutral-700 pb-1">Tune Tasks</p>
      </div>
    </Link>
  );
};
