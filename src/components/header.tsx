import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto flex items-center justify-center p-4 flex-col">
        <Link
          href="/"
          className="text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-center"
        >
          TRACK⚡BPM
        </Link>
      </div>
    </header>
  );
};
