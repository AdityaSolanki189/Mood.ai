import EntryCard from '@/app/_components/EntryCard';
import NewEntry from '@/app/_components/NewEntryCard';
import Question from '@/app/_components/Question';
import prisma from '@/prisma/client';
import { getUserFromClerkID } from '@/utils/auth';
import Link from 'next/link';

const getEntries = async () => {
    const user = await getUserFromClerkID();
    console.log(user);
    
    const data = await prisma.journalEntry.findMany({
        where: {
            userId: user!.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return data;
};

const JournalPage = async () => {
    const entries = await getEntries();

    return (
        <div className="px-6 py-8 bg-slate-100/50 h-full overflow-y-scroll">
            <h1 className="text-4xl mb-12">My Journals</h1>
            <div className="my-8">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4 ">
                <NewEntry />
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalPage;
