import { LineChartComponent } from '@/app/_components/LineChart';
import prisma from '@/prisma/client';
import { getUserFromClerkID } from '@/utils/auth';

const getData = async () => {
    const user = await getUserFromClerkID();
    const analysis = await prisma.analysis.findMany({
        where: {
            userId: user!.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const total = analysis.reduce(
        (acc: any, curr: any) => acc + curr.sentimentScore,
        0
    );
    const average = total / analysis.length;

    const formattedAnalysis = analysis.map((entry: any) => ({
        month: new Date(entry.createdAt).toLocaleString('default', {
            month: 'long',
        }),
        sentimentScore: entry.sentimentScore,
        mood: entry.mood,
        date: entry.createdAt.toLocaleString('default', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }));

    const startDate = new Date(analysis[0].createdAt);
    const endDate = new Date(analysis[analysis.length - 1].createdAt);
    
    return { formattedAnalysis, average, startDate, endDate };
};

const HistoryPage = async () => {
    const { formattedAnalysis, average, startDate, endDate } = await getData();

    const subtitle = `${startDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    })} - ${endDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    })}`;

    return (
        <div className="bg-zinc-100/50 p-2 flex justify-center items-center">
            <LineChartComponent
                title="Your Sentiment History"
                subtitle={subtitle}
                data={formattedAnalysis}
                average={average}
            />
        </div>
    );
};

export default HistoryPage;
