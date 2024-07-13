'use client';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { buttons, ButtonsCard } from '@/components/ui/tailwindcss-buttons';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Link from 'next/link';

export default function BackgroundGradientAnimationDemo() {
    const description =
        'Unlock deeper insights with MemoMind, your AI-powered journalizing companion. Seamlessly capture your thoughts and watch them transform into meaningful reflections.';
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
                <div className="flex flex-col justify-center items-center">
                    <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                        MemoMind ⚡
                    </p>
                    <TextGenerateEffect words={description} />

                    <div className="flex justify-center items-center">
                        <Link href="/new-user">
                            <ButtonsCard>{buttons[7].component}</ButtonsCard>
                        </Link>
                    </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}
