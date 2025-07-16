
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Terms of Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <p>Last updated: July 16, 2025</p>

                    <p>Welcome to TuneDetective. Please read these Terms of Service carefully before using our application, as they govern your access to and use of our Service.</p>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">1. Acknowledgment and Acceptance</h2>
                        <p>These are the Terms and Conditions that govern the use of this Service and form the agreement between you and the Company. By accessing or using the Service, you agree to be bound by these terms. These terms apply to all visitors, users, and anyone else who accesses or uses the Service. If you disagree with any part of these terms, you may not access the Service.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">2. Intellectual Property</h2>
                        <p>The Service and all of its original content, features, and functionality are, and will remain, the exclusive property of TuneDetective and its licensors. Our Service is protected by copyright, trademark, and other applicable laws in both the United States and foreign countries. Our trademarks may not be used in connection with any product or service without our prior written consent.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">3. Links to Third-Party Websites</h2>
                        <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">4. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever. Notwithstanding any damages you might incur, the entire liability of the Company under any provision of these Terms shall be limited to the amount actually paid by you through the Service or 100 USD if you have not purchased anything.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">5. "AS IS" and "AS AVAILABLE" Disclaimer</h2>
                        <p>The Service is provided to you "AS IS" and "AS AVAILABLE," with all faults and defects, without any warranty. To the fullest extent permitted by law, the Company expressly disclaims all warranties, whether express, implied, or statutory, including but not limited to any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">6. Governing Law</h2>
                        <p>The laws of the United States, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. Your use of the application may also be subject to other local, state, national, or international laws.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground">7. Changes to These Terms</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice before any new terms take effect. What constitutes a material change will be determined at our sole discretion.</p>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
