import { prisma } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

const createNewUser = async () => {
    const user = await currentUser();
    console.log(user);

    if (!user) console.log('No user found');

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user!.id as string,
        },
    });

    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user!.id!,
                email: user!.emailAddresses[0]!.emailAddress,
            },
        });
    }

    if (!user) return notFound();
    else redirect('/journal');
};

const NewUser = async () => {
    await createNewUser();
    console.log('User created');
    return <div>...loading</div>;
};

export default NewUser;
