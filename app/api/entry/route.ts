import { update } from '@/utils/actions';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const data = await request.json();
    const user = await getUserFromClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            content: data.content,
            user: {
                connect: {
                    id: user!.id,
                },
            },
            analysis: {
                create: {
                    mood: 'Neutral',
                    subject: 'None',
                    negative: false,
                    summary: 'None',
                    sentimentScore: 0,
                    color: '#0101fe',
                    userId: user!.id,
                },
            },
        },
    });

    update(['/journal']);

    return NextResponse.json({ data: entry });
};
