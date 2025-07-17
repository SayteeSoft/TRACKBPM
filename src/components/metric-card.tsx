import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MetricCard = ({ title, value }: { title: string, value: string | number }) => (
    <Card className="text-center">
        <CardHeader className="p-2 pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
);
