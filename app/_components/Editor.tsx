'use client';
import { deleteEntry, updateEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import Spinner from './Spinner';
import { JournalEntry } from '@prisma/client';

const Editor = ({ entry }: { entry: any }) => {
    const [text, setText] = useState(entry.content);
    const [currentEntry, setEntry] = useState(entry);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        await deleteEntry(entry.id);
        router.push('/journal');
    };

    const analyzeData = async () => {
        // const analysis = await analyzeEntry(entry);
        // const savedAnalysis = await prisma.analysis.upsert({
        //     where: {
        //         entryId: entry.id,
        //     },
        //     update: { ...analysis },
        //     create: {
        //         entryId: entry.id,
        //         userId: user.id,
        //         ...analysis,
        //     },
        // });
        // setEntry({ ...currentEntry, analysis: savedAnalysis });
    }

    useAutosave({
        data: text,
        onSave: async (_text) => {
            if (_text === entry.content) return;
            setIsSaving(true);

            const { data } = await updateEntry({
                id: entry.id,
                updates: { content: _text},
            });

            setEntry(data);
            setIsSaving(false);
        },
    });

    return (
        <div className="w-full h-full grid grid-cols-3 gap-0 relative">
            <div className="absolute left-0 top-0 p-2">
                {isSaving ? (
                    <Spinner />
                ) : (
                    <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
                )}
            </div>
            <div className="col-span-2">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full text-xl p-8"
                />
            </div>
            <div className="border-l border-black/5">
                <div
                    // style={{ background: currentEntry.analysis.color }}
                    className="h-[100px] bg-blue-600 text-white p-8"
                >
                    <h2 className="text-2xl">
                        Analysis
                    </h2>
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold w-1/3">
                                Subject
                            </div>
                            <div className="text-xl">
                                {/* {currentEntry.analysis.subject} */}
                            </div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold">Mood</div>
                            <div className="text-xl">
                                {/* {currentEntry.analysis.mood} */}
                            </div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold">
                                Negative
                            </div>
                            <div className="text-xl">
                                {/* {currentEntry.analysis.negative
                                    ? 'True'
                                    : 'False'} */}
                            </div>
                        </li>
                        <li className="py-4 px-8 flex items-center justify-around">
                            <button
                                onClick={analyzeData}
                                type="button"
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Analyze Entry
                            </button>
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Editor;
