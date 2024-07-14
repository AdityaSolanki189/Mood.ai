'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import Spinner from './Spinner';

const Question = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);

        const { data } = await askQuestion(question);

        setAnswer(data);
        setLoading(false);
        setQuestion('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-lg"
                    disabled={loading}
                    placeholder="Ask a question..."
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-400 px-4 py-2 rounded-md"
                >
                    Ask
                </button>
            </form>
            {loading ? (
                <p className="my-4 p-4 text-base bg-slate-50 rounded-lg shadow-lg">
                    <Spinner /> Loading...
                </p>
            ) : answer ? (
                <p className="my-4 p-4 text-base bg-slate-50 rounded-lg shadow-lg">
                    {answer}
                </p>
            ) : null}
        </div>
    );
};

export default Question;
