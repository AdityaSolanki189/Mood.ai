import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { JournalEntry } from '@prisma/client';
import { loadQARefineChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import {
    OutputFixingParser,
    StructuredOutputParser,
} from 'langchain/output_parsers';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { z } from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe('the mood of the person who wrote the journal entry.'),
        subject: z
            .string()
            .describe(
                'the subject of the journal entry, it should be in camel case and should contain spaces.'
            ),
        negative: z
            .boolean()
            .describe(
                'is the journal entry negative? (i.e. does it contain negative emotions?). First letter always capitalized.'
            ),
        summary: z.string().describe('quick summary of the entire entry.'),
        color: z
            .string()
            .describe(
                'a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
            ),
        sentimentScore: z
            .number()
            .describe(
                'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
            ),
    })
);

const getPrompt = async (content: string) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    });

    const input = await prompt.format({
        entry: content,
    });

    return input;
};

export const analyzeEntry = async (prompt: string) => {
    const input = await getPrompt(prompt);
    const model = new OpenAI({
        model: 'gpt-3.5-turbo-instruct',
        temperature: 0,
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const output = await model.invoke(input);
    console.log('output', output);
    try {
        return parser.parse(output);
    } catch (e) {
        const fixParser = OutputFixingParser.fromLLM(
            new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 }),
            parser
        );
        const fixedOutput = await fixParser.parse(output);
        console.log('Error', e);
        return fixedOutput;
    }
};

export const qa = async ({
    question,
    entries,
}: {
    question: string;
    entries: JournalEntry[];
}) => {
    const docs = entries.map(
        (entry) =>
            new Document({
                pageContent: entry.content,
                metadata: { source: entry.id, date: entry.createdAt },
            })
    );
    const model = new OpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    });

    return res.output_text;
};
