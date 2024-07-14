import { prisma } from '@/prisma/client';
import { update } from '@/utils/actions';
import { getUserFromClerkID } from '@/utils/auth';
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
    const { updates, analytics } = await request.json();
    const user = await getUserFromClerkID();

    const entry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                id: params.id,
                userId: user.id,
            },
        },
        data: updates,
    });

    if (analytics) {
        const savedAnalysis = await prisma.analysis.upsert({
            where: {
                entryId: entry.id,
            },
            update: { ...analytics },
            create: {
                entryId: entry.id,
                userId: user.id,
                ...analytics,
            },
        });
        return NextResponse.json({
            data: { ...entry, analysis: savedAnalysis },
        });
    }
    update(['/journal']);

    return NextResponse.json({ data: { ...entry } });
};
