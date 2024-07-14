'use client';
import { deleteEntry, updateEntry } from '@/utils/api';
import { analyzeEntry } from '@/utils/openAi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import Spinner from './Spinner';

const Editor = ({ entry }: { entry: any }) => {
    const [text, setText] = useState(entry.content);
    const [currentEntry, setEntry] = useState(entry);
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentAnalysis, setAnalysis] = useState(entry.analysis);
    const router = useRouter();
    console.log('currentAnalysis', currentAnalysis);
    const handleDelete = async () => {
        await deleteEntry(entry.id);
        router.push('/journal');
    };

    const analyzeData = async (): Promise<void> => {
        setIsAnalyzing(true);
        console.log('Analyzing Entry');
        const analysis = await analyzeEntry(currentEntry.content);

        const { data } = await updateEntry({
            id: entry.id,
            updates: { content: text },
            analytics: analysis,
        });

        setEntry(data);
        setAnalysis(analysis);
        console.log('data', analysis);

        setIsAnalyzing(false);
    };

    useAutosave({
        data: text,
        onSave: async (_text) => {
            if (_text === entry.content) return;
            setIsSaving(true);

            const { data } = await updateEntry({
                id: entry.id,
                updates: { content: _text },
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
                    className="w-full h-5/6 text-xl p-8"
                />
            </div>
            <div className="border-l border-black/5">
                <div>
                    <div
                        style={{ background: currentAnalysis.color }}
                        className="flex justify-center bg-blue-600 text-white font-bold p-4"
                    >
                        <h2 className="text-4xl shadow-2xl hover:backdrop-brightness-75 rounded-lg p-2">
                            Analysis
                        </h2>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-4 px-8 flex items-center justify-between hover:backdrop-brightness-90">
                            <div className="text-xl font-semibold w-1/3">
                                Subject
                            </div>
                            <div className="text-xl">
                                {/* // convert to camel case */}
                                {currentAnalysis.subject}
                            </div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between hover:backdrop-brightness-90">
                            <div className="text-xl font-semibold">Mood</div>
                            <div className="text-xl">
                                {currentAnalysis.mood}
                            </div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between hover:backdrop-brightness-90">
                            <div className="text-xl font-semibold">
                                Negative
                            </div>
                            <div className="text-xl">
                                {currentAnalysis.negative ? 'True' : 'False'}
                            </div>
                        </li>

                        <li className="py-4 px-8 flex flex-col items-center justify-between hover:backdrop-brightness-90">
                            <div className="text-xl font-semibold pb-2">
                                Summary
                            </div>
                            <div className="text-lg">
                                {currentAnalysis.summary}
                            </div>
                        </li>
                        <li className="py-4 px-8 flex items-center justify-around">
                            <button
                                onClick={analyzeData}
                                type="button"
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Spinner /> Analyzing...
                                    </>
                                ) : (
                                    'Analyze Entry'
                                )}
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
