import { update } from '@/utils/actions';
// import { analyzeEntry } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: {
        id: string;
    };
}

export const DELETE = async (request: NextRequest, { params }: Props) => {
    const user = await getUserFromClerkID();

    await prisma.journalEntry.delete({
        where: {
            userId_id: {
                id: params.id,
                userId: user.id,
            },
        },
    });

    update(['/journal']);

    return NextResponse.json({ data: { id: params.id } });
};

export const PATCH = async (request: NextRequest, { params }: Props) => {
    const { updates } = await request.json();
    const user = await getUserFromClerkID();
    const updatedData = typeof updates === 'string' ? { content: updates } : updates;

    const entry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                id: params.id,
                userId: user.id,
            },
        },
        data: updatedData,
    });

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

    update(['/journal']);

    return NextResponse.json({ data: { ...entry } });
};
