import { Music } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen w-full bg-gray-50 font-body">
            <header className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter flex items-center justify-center">
                        <span>TRACK</span>
                        <Music className="w-8 h-8 mx-1 text-white fill-white" />
                        <span>BPM</span>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <h1>Terms of Service</h1>
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>Please read these terms and conditions carefully before using Our Service.</p>

                    <h2>Acknowledgment</h2>
                    <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                    <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms apply to all visitors, users, and others who access or use the Service.</p>

                    <h2>Intellectual Property</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>

                    <h2>Links to Other Websites</h2>
                    <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>

                    <h2>Limitation of Liability</h2>
                    <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>

                    <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                    <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.</p>
                    
                    <h2>Governing Law</h2>
                    <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                    
                    <h2>Changes to These Terms and Conditions</h2>
                    <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.</p>
                </div>
            </main>
        </div>
    );
}
