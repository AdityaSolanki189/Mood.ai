import Editor from '@/app/_components/Editor';
import { prisma } from '@/prisma/client';
import { getUserFromClerkID } from '@/utils/auth';

const getEntry = async (id: string) => {
    const user = await getUserFromClerkID();
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
        },
    });

    return entry;
};

interface Props {
    params: {
        id: string;
    };
}

const JournalEditorPage = async ({ params }: Props) => {
    const entry = await getEntry(params.id);

    return (
        <div className="w-full h-full">
            <Editor entry={entry} />
        </div>
    );
};

export default JournalEditorPage;
