import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-muted-foreground py-6">
      <div className="container mx-auto px-4 text-center text-sm flex justify-center items-center gap-4">
        <span>&copy; {currentYear} TRACKBPM</span>
        <span className="text-gray-300">|</span>
        <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <span className="text-gray-300">|</span>
        <Link href="/legal/terms" className="hover:text-foreground transition-colors">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};
