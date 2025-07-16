import Link from 'next/link';

export const Header = ({ children, hero }: { children?: React.ReactNode, hero?: React.ReactNode }) => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center p-4 flex-col">
        <Link
          href="/"
          className="text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-center my-8"
        >
          <span>TRACK</span>
          <span className="text-white mx-1">⚡︎</span>
          <span>BPM</span>
        </Link>
        {hero}
        {children}
      </div>
    </header>
  );
};
