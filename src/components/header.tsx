import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="text-4xl font-black tracking-tighter flex items-center justify-center"
        >
          <span>TRACK</span>
          <span className="text-white mx-1">⚡︎</span>
          <span>BPM</span>
        </Link>
      </div>
    </header>
  );
};
