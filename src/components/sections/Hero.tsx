import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
// import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Spotlight } from "../ui/spotlight";
import { scrollTo } from "@/lib/scrollTo";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  // Mouse position tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Smooth spring animations for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);
  // Orb position with parallax
  const orbX = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), springConfig);
  const orbY = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };
  const orbVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative max-w-screen min-h-screen flex items-center justify-center overflow-hidden bg-black/[0.96] antialiased rounded-md">
      {/* Grid background from original */}
      {/* <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      /> */}
      {/* Spotlight from original */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      {/* Noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main floating orb with 3D effect */}
        <motion.div
          variants={orbVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          style={{ x: orbX, y: orbY }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </motion.div>
        {/* Secondary accent orb */}
        <motion.div
          variants={orbVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          style={{
            x: useTransform(orbX, (v) => -v * 0.5),
            y: useTransform(orbY, (v) => -v * 0.5),
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </motion.div>
        {/* Grid overlay with subtle 3D perspective */}
        <motion.div style={{ x, y }} className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px)," +
                "linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              transform: "perspective(1000px) rotateX(60deg) scale(2)",
              transformOrigin: "center center",
            }}
          />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        className="relative z-10 mx-auto px-6 text-center"
      >
        {/* Greeting text */}
        <div className="w-full">
          <ContainerTextFlip
          words={["Meet", "Collaborate with", "Hire",]}
        />
        </div>
        {/* Main heading with staggered reveal */}
        <div className="flex items-center justify-center">
          {/* <TextHoverEffect text="RUBY IZEKOR" /> */}
          <h1 className="bg-linear-to-r text-[2.7rem]/loose md:text-[10rem] font-serif font-bold from-black to-black md:from-purple-600 md:via-green-500 md:to-gray-700 bg-clip-text text-transparent">RUBY IZEKOR</h1>
        </div>
        {/* <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        }>
          <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Crafting Digital
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h1> */}
        {/* One-line positioning */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-bold md:text-muted-foreground mb-12 max-w-4xl mx-auto"
        >
          Software Engineer specializing in building exceptional web, mobile and desktop applications<span className="hidden md:inline">, with backend that scales vertically and horizontally using modern technologies and up to date architectures.</span>
        </motion.p>
        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.div
            onClick={() => scrollTo("projects")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-foreground/20"
          >
            <span className="relative z-10">View Portfolio</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
          </motion.div>
          {/* Secondary CTA */}
          <motion.div
            onClick={()=> scrollTo('contact')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-muted/50 backdrop-blur-sm text-foreground font-medium border border-border/50 hover:border-border transition-all hover:shadow-xl hover:bg-muted/70"
          >
            <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Get in Touch</span>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-background/50" />
    </section>
  );
}


// 'use client';

// import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { ArrowRight, Mail } from 'lucide-react';

// export default function Hero() {
//     const [mounted, setMounted] = useState(false);

//     // Mouse position tracking for parallax effect
//     const mouseX = useMotionValue(0);
//     const mouseY = useMotionValue(0);

//     // Smooth spring animations for mouse movement
//     const springConfig = { damping: 25, stiffness: 150 };
//     const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
//     const y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);

//     // Orb position with parallax
//     const orbX = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), springConfig);
//     const orbY = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), springConfig);

//     useEffect(() => {
//         setMounted(true);

//         const handleMouseMove = (e: MouseEvent) => {
//             const { clientX, clientY } = e;
//             const { innerWidth, innerHeight } = window;

//             // Normalize mouse position to 0-1 range
//             mouseX.set(clientX / innerWidth);
//             mouseY.set(clientY / innerHeight);
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, [mouseX, mouseY]);

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.15,
//                 delayChildren: 0.2,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.8,
//                 ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Custom easing for smooth feel
//             },
//         },
//     };

//     const orbVariants = {
//         hidden: { scale: 0, opacity: 0 },
//         visible: {
//             scale: 1,
//             opacity: 1,
//             transition: {
//                 duration: 1.2,
//                 ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
//             },
//         },
//     };

//     return (
//         <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
//             {/* Noise texture overlay for depth */}
//             <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//                 }} />
//             </div>

//             {/* Gradient orbs background */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {/* Main floating orb with 3D effect */}
//                 <motion.div
//                     variants={orbVariants}
//                     initial="hidden"
//                     animate={mounted ? "visible" : "hidden"}
//                     style={{ x: orbX, y: orbY }}
//                     className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
//                 >
//                     <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-pulse"
//                         style={{ animationDuration: '4s' }} />
//                 </motion.div>

//                 {/* Secondary accent orb */}
//                 <motion.div
//                     variants={orbVariants}
//                     initial="hidden"
//                     animate={mounted ? "visible" : "hidden"}
//                     style={{
//                         x: useTransform(orbX, (v) => -v * 0.5),
//                         y: useTransform(orbY, (v) => -v * 0.5)
//                     }}
//                     className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
//                 >
//                     <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 animate-pulse"
//                         style={{ animationDuration: '5s' }} />
//                 </motion.div>

//                 {/* Grid overlay with subtle 3D perspective */}
//                 <motion.div
//                     style={{ x, y }}
//                     className="absolute inset-0 opacity-[0.03]"
//                 >
//                     <div className="absolute inset-0" style={{
//                         backgroundImage: `
//               linear-gradient(to right, currentColor 1px, transparent 1px),
//               linear-gradient(to bottom, currentColor 1px, transparent 1px)
//             `,
//                         backgroundSize: '80px 80px',
//                         transform: 'perspective(1000px) rotateX(60deg) scale(2)',
//                         transformOrigin: 'center center',
//                     }} />
//                 </motion.div>
//             </div>

//             {/* Main content */}
//             <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate={mounted ? "visible" : "hidden"}
//                 className="relative z-10 max-w-5xl mx-auto px-6 text-center"
//             >
//                 {/* Greeting text */}
//                 <motion.div variants={itemVariants} className="mb-6">
//                     <span className="inline-block px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-sm font-medium text-muted-foreground border border-border/50">
//                         👋 Available for opportunities
//                     </span>
//                 </motion.div>

//                 {/* Main heading with staggered reveal */}
//                 <motion.h1
//                     variants={itemVariants}
//                     className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
//                 >
//                     <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
//                         Crafting Digital
//                     </span>
//                     <br />
//                     <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
//                         Experiences
//                     </span>
//                 </motion.h1>

//                 {/* One-line positioning */}
//                 <motion.p
//                     variants={itemVariants}
//                     className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light"
//                 >
//                     Full-stack developer specializing in building exceptional digital products with modern technologies
//                 </motion.p>

//                 {/* CTA Buttons */}
//                 <motion.div
//                     variants={itemVariants}
//                     className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//                 >
//                     {/* Primary CTA */}
//                     <motion.a
//                         href="#portfolio"
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-foreground/20"
//                     >
//                         <span className="relative z-10">View Portfolio</span>
//                         <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />

//                         {/* Animated gradient overlay */}
//                         <motion.div
//                             className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                             initial={false}
//                         />
//                     </motion.a>

//                     {/* Secondary CTA */}
//                     <motion.a
//                         href="#contact"
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-muted/50 backdrop-blur-sm text-foreground font-medium border border-border/50 hover:border-border transition-all hover:shadow-xl hover:bg-muted/70"
//                     >
//                         <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
//                         <span>Get in Touch</span>
//                     </motion.a>
//                 </motion.div>

//                 {/* Scroll indicator */}
//                 <motion.div
//                     variants={itemVariants}
//                     className="absolute bottom-12 left-1/2 -translate-x-1/2"
//                 >
//                     <motion.div
//                         animate={{ y: [0, 8, 0] }}
//                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
//                     >
//                         <motion.div
//                             className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
//                             animate={{ y: [0, 12, 0] }}
//                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         />
//                     </motion.div>
//                 </motion.div>
//             </motion.div>

//             {/* Subtle vignette effect */}
//             <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-background/50" />
//         </section>
//     );
// }
