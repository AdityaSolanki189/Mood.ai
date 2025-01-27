import { JournalEntry } from '@prisma/client';

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
    const date = new Date(entry.createdAt).toDateString();
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">{date}</div>
            <div className="px-4 py-5 sm:p-6">
                {`${entry.content.slice(0, 100)}...`}
            </div>
            <div className="px-4 py-4 sm:px-6">{entry.status}</div>
        </div>
    );
};

export default EntryCard;
