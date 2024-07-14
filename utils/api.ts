const createURL = (path: string) => window.location.origin + path;

export const newEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/entry'), {
            method: 'POST',
            body: JSON.stringify({ content: 'new entry' }),
        })
    );

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Something went wrong on API server!');
    }
};

export const deleteEntry = async (id: string) => {
    const res = await fetch(
        new Request(createURL(`/api/entry/${id}`), {
            method: 'DELETE',
        })
    );

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Something went wrong on API server!');
    }
};

interface IAnalytics {
    mood: string;
    subject: string;
    negative: boolean;
    summary: string;
    color: string;
    sentimentScore: number;
}

export const updateEntry = async ({
    id,
    updates,
    analytics,
}: {
    id: string;
    updates: { content: string };
    analytics?: IAnalytics;
}) => {
    const body = analytics ? { updates, analytics } : { updates };

    const res = await fetch(
        new Request(createURL(`/api/entry/${id}`), {
            method: 'PATCH',
            body: JSON.stringify(body),
        })
    );

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Something went wrong on API server!');
    }
};

export const askQuestion = async (question: string) => {
    const res = await fetch(
        new Request(createURL(`/api/question`), {
            method: 'POST',
            body: JSON.stringify({ question }),
        })
    );

    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Something went wrong on API server!');
    }
};
