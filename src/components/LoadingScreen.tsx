import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake incremental progress leading up to the real load event
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 90%
        if (prev >= 90) return prev;
        const step = Math.random() * 8 + 2;
        return Math.min(prev + step, 90);
      });
    }, 150);

    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      // Short delay so the user sees 100% before we dismiss
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0f 0%, #0d0f1a 40%, #0a1020 100%)",
          }}
        >
          {/* Ambient glow orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #7c3aed 0%, #2563eb 60%, transparent 100%)",
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
              style={{
                background:
                  "radial-gradient(circle, #0ea5e9 0%, #14b8a6 60%, transparent 100%)",
              }}
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mb-12 text-center"
          >
            <div
              className="text-5xl md:text-7xl font-serif font-extrabold tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e2e8f0 0%, #43a047 50%, #43a047 100%)",
              }}
            >
              RI
            </div>
            <p
              className="mt-2 text-sm tracking-[0.3em] uppercase font-medium"
              style={{ color: "rgba(148, 163, 184, 0.7)" }}
            >
              Ruby Izekor
            </p>
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-64 md:w-80"
          >
            {/* Track */}
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #2563eb, #0ea5e9)",
                  width: `${progress}%`,
                  transition: "width 0.15s ease-out",
                  boxShadow: "0 0 12px rgba(124, 58, 237, 0.8)",
                }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between mt-3">
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(148, 163, 184, 0.5)" }}
              >
                Loading portfolio…
              </span>
              <span
                className="text-xs font-mono text-green-600"
                // style={{ color: "rgba(148, 163, 184, 0.6)" }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 flex gap-2 mt-10"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "rgba(124, 58, 237, 0.6)" }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
