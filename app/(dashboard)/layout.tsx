import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const links = [
    { name: 'Journals', href: '/journal' },
    { name: 'History', href: '/history' },
];

const DashboardLayout = ({ children } : PropsWithChildren) => {
    return (
        <div className="w-screen h-screen relative bg-slate-300">
            <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
                <div className="px-2 my-4">
                    <span className="text-3xl">MemoMind⚡</span>
                </div>
                <div>
                    <ul className="px-4">
                        {links.map((link) => (
                            <li key={link.name} className="text-xl my-4">
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
                <header className="h-[60px] border-b border-black/10">
                    <nav className="px-4 h-full">
                        <div className="flex items-center justify-end h-full">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </nav>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
