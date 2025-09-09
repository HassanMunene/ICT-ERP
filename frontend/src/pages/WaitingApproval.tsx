import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function WaitingApproval() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Awaiting Approval</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-muted-foreground">
                        Your account has been created successfully! An administrator will review your request and assign appropriate roles and department access.
                    </p>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span>Your account is secure</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span>You'll receive an email when approved</span>
                        </div>
                    </div>

                    <Button asChild className="w-full mt-4">
                        <Link to="/">Return to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}