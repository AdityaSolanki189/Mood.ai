'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
];

const chartConfig = {
    sentimentScore: {
        label: 'Sentiment Score',
        color: 'hsl(var(--chart-3))',
    },
} satisfies ChartConfig;

interface IProps {
    title: string;
    subtitle: string;
    data: any;
    average: number;
}

export function LineChartComponent({ title, subtitle, data, average }: IProps) {
    return (
        <Card className="h-5/6 w-5/6">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="sentimentScore"
                            type="natural"
                            stroke="var(--color-sentimentScore)"
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-sentimentScore)',
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Your Average Sentiment Score is {average}.
                </div>
                <div className="leading-none text-muted-foreground">
                    -10 being the most negative and 10 being the most positive.
                </div>
            </CardFooter>
        </Card>
    );
}
