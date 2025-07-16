import Link from 'next/link';
import { SpotifyIcon } from './icons';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-muted-foreground py-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <div className="max-w-2xl mx-auto mb-8">
            <p>
                SONGBPM.com helps you find the BPM and Key for any song. We hope you find our service helpful. Got questions or feedback? <a href="mailto:saytee.software@gmail.com" className="underline hover:text-foreground transition-colors">Let us know</a>.
            </p>
            <p className="mt-4 flex items-center justify-center gap-2">
                Song data provided by <SpotifyIcon className="h-4 w-4" /> Spotify
            </p>
        </div>

        <div className="border-t border-gray-200 pt-6 flex justify-center items-center gap-4">
            <span className="flex items-center justify-center">
              &copy; 2025 TRACK
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mx-0.5 text-black"
              >
                <path d="M11 21h-1l1-7H7l7-12h1l-1 7h4l-7 12z" />
              </svg>
              BPM
            </span>
            <span className="text-gray-300">|</span>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
            Terms of Service
            </Link>
        </div>
      </div>
    </footer>
  );
};
