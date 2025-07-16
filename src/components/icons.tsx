import type { SVGProps } from "react";

export const SpotifyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Spotify</title>
    <circle cx="12" cy="12" r="10" />
    <path d="M7.1,15.11A5.5,5.5,0,0,1,12,12.5a5.5,5.5,0,0,1,5.09,3.46" />
    <path d="M6.33,12.06a9,9,0,0,1,11.34,0" />
    <path d="M7.85,8.94A12.63,12.63,0,0,1,12,8a12.63,12.63,0,0,1,4.15,0.94" />
  </svg>
);

export const AppleMusicIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Apple Music</title>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export const AmazonMusicIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Amazon Music</title>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9.91a4 4 0 0 1 5.82 0L12 12.73l-2.91-2.82z"></path>
  </svg>
);
