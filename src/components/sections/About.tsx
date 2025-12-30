'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';
import { PixelatedCanvas } from '../ui/pixelated-canvas';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Scroll-based parallax for the visual element
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const visualY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const visualRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
    };

    const visualVariants = {
        hidden: { opacity: 0, x: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div variants={textVariants}>
                            <span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50 mb-6">
                                About Me
                            </span>
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Building with
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                    Purpose & Passion
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div variants={textVariants} className="space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I approach development as a craft—where clean code meets creative problem-solving.
                                My focus isn't just on making things work, but making them work <em>beautifully</em>.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I believe the best solutions emerge from understanding the "why" before the "how."
                                Whether it's architecting scalable systems or crafting pixel-perfect interfaces,
                                I'm driven by the challenge of turning complex problems into elegant experiences.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                                or sharing knowledge with the developer community. Continuous learning isn't just a habit—it's a lifestyle.
                            </p>
                        </motion.div>

                        {/* Skill highlights */}
                        <motion.div variants={textVariants} className="flex flex-wrap gap-3 pt-4">
                            {[
                                { icon: Code2, label: 'Clean Architecture' },
                                { icon: Sparkles, label: 'User-Centric Design' },
                                { icon: Zap, label: 'Performance First' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    custom={i}
                                    variants={cardVariants}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 hover:border-border transition-colors"
                                >
                                    <item.icon className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Visual Element - Abstract 3D Floating Cards */}
                    <motion.div
                        variants={visualVariants}
                        className="relative h-[600px] flex items-center justify-center"
                    >
                        <motion.div
                            style={{ y: visualY, rotateY: visualRotate, scale: visualScale }}
                            className="relative w-full h-full"
                        >
                            {/* Floating card stack with 3D effect */}
                            <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                                {/* Card 1 - Back */}
                                <motion.div
                                    initial={{ rotateY: -15, z: -100 }}
                                    animate={{
                                        rotateY: [-15, -12, -15],
                                        z: [-100, -80, -100],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute w-72 h-96 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 shadow-2xl"
                                    style={{
                                        transform: 'translateZ(-100px) rotateY(-15deg)',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-2xl" />
                                </motion.div>

                                {/* Card 2 - Middle */}
                                <motion.div
                                    initial={{ rotateY: 0, z: 0 }}
                                    animate={{
                                        rotateY: [0, 3, 0],
                                        z: [0, 20, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute w-80 h-[420px] rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 backdrop-blur-xl border border-white/10 shadow-2xl"
                                    style={{
                                        transform: 'translateZ(0px)',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-2xl" />

                                    {/* Content overlay */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-50" />
                                            <div className="space-y-2">
                                                <div className="h-3 w-3/4 bg-white/20 rounded" />
                                                <div className="h-3 w-1/2 bg-white/10 rounded" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-white/10 rounded" />
                                            <div className="h-2 w-5/6 bg-white/10 rounded" />
                                            <div className="h-2 w-4/6 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 3 - Front */}
                                <motion.div
                                    initial={{ rotateY: 15, z: 100 }}
                                    animate={{
                                        rotateY: [15, 12, 15],
                                        z: [100, 120, 100],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute w-72 h-96 rounded-2xl bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 shadow-2xl"
                                    style={{
                                        transform: 'translateZ(100px) rotateY(15deg)',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <PixelatedCanvas
                                        src="https://res.cloudinary.com/dotojp6xu/image/upload/v1752710778/3rs/exploits/WhatsApp_Image_2024-03-02_at_02.49.59_bec692ef_qaazgl.jpg"
                                        width={300}
                                        height={400}
                                        cellSize={3}
                                        dotScale={0.9}
                                        shape="square"
                                        backgroundColor="#000000"
                                        dropoutStrength={0.4}
                                        interactive
                                        distortionStrength={3}
                                        distortionRadius={80}
                                        distortionMode="swirl"
                                        followSpeed={0.2}
                                        jitterStrength={4}
                                        jitterSpeed={4}
                                        sampleAverage
                                        tintColor="#FFFFFF"
                                        tintStrength={0.2}
                                        className="rounded-xl border border-neutral-800 shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent rounded-2xl" />
                                </motion.div>

                                {/* Floating orb accent */}
                                <motion.div
                                    animate={{
                                        y: [-20, 20, -20],
                                        x: [-10, 10, -10],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-1/4 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 blur-2xl"
                                />

                                <motion.div
                                    animate={{
                                        y: [20, -20, 20],
                                        x: [10, -10, 10],
                                    }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute bottom-1/4 -left-8 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-2xl"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
