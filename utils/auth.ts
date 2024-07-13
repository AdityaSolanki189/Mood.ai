import type { User } from '@clerk/nextjs/server';
import { prisma } from '@/prisma/client';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/dist/server/api-utils';
import { notFound } from 'next/navigation';

export const getUserFromClerkID = async (select = { id: true }) => {
    const { userId } = auth();
    const user = await prisma.user.findFirst({
        where: {
            clerkId: userId as string,
        },
        select,
    });

    if(!user) {
        notFound();
    }

    return user;
};

export const syncNewUser = async (clerkUser: User) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            clerkId: clerkUser.id,
        },
    });

    if (!existingUser) {
        const email = clerkUser.emailAddresses[0].emailAddress;
        // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

        await prisma.user.create({
            data: {
                clerkId: clerkUser.id,
                email,
            },
        });
    }
};
