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
