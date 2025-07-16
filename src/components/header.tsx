import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto flex items-center justify-center p-4 flex-col">
        <Link
          href="/"
          className="text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-center"
        >
          TRACK
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 md:w-24 md:h-24 mx-1"
          >
            <path d="M11 21h-1l1-7H7l7-12h1l-1 7h4l-7 12z" />
          </svg>
          BPM
        </Link>
      </div>
    </header>
  );
};
