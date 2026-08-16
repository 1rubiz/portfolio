import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { scrollTo } from "@/lib/scrollTo";
import { ArrowRight, Mail } from "lucide-react";

// ─── Terminal message configuration ───────────────────────────────────────────
const MESSAGES = [
  {
    prompt: "visitor@ruby-izekor:~$",
    command: "whoami",
    response: ["Ruby Izekor — Software Engineer & CTO"],
    color: "#a78bfa",
  },
  {
    prompt: "visitor@ruby-izekor:~$",
    command: "cat skills.txt",
    response: [
      "→ Full-Stack Web Development",
      "→ Mobile Apps (React Native)",
      "→ Backend Systems & APIs",
      "→ Cloud Architecture & DevOps",
    ],
    color: "#34d399",
  },
  {
    prompt: "visitor@ruby-izekor:~$",
    command: "echo $CURRENT_ROLE",
    response: ["CTO @ Justpostam.com"],
    color: "#38bdf8",
  },
  {
    prompt: "visitor@ruby-izekor:~$",
    command: "ls projects/",
    response: [
      "payluk-escrow/   justpostam/",
      "portfolio/       open-source/",
    ],
    color: "#f472b6",
  },
  {
    prompt: "visitor@ruby-izekor:~$",
    command: "curl -s welcome.txt",
    response: [
      "Welcome to my portfolio!",
      "Let's build something amazing together.",
    ],
    color: "#fbbf24",
  },
];

const TYPE_SPEED = 45;        // ms per character (command typing)
const RESPONSE_DELAY = 300;   // ms before response appears
const READ_DELAY = 2000;      // ms to show completed message before clearing
const CLEAR_SPEED = 18;       // ms per character when "deleting"

// ─── Hook: typewriter engine ──────────────────────────────────────────────────
function useTerminalTyper() {
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState<string[]>([]);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "showing" | "clearing">(
    "typing"
  );
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const msg = MESSAGES[currentMsgIndex];

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Main state machine
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (phase === "typing") {
      if (displayedCommand.length < msg.command.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedCommand((c) => msg.command.slice(0, c.length + 1));
        }, TYPE_SPEED);
      } else {
        // Command fully typed → show response
        timeoutRef.current = setTimeout(() => {
          setDisplayedResponse(msg.response);
          setPhase("showing");
        }, RESPONSE_DELAY);
      }
    }

    if (phase === "showing") {
      timeoutRef.current = setTimeout(() => {
        setPhase("clearing");
      }, READ_DELAY);
    }

    if (phase === "clearing") {
      if (displayedCommand.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedCommand((c) => c.slice(0, -1));
          setDisplayedResponse([]);
        }, CLEAR_SPEED);
      } else {
        // Move to next message
        timeoutRef.current = setTimeout(() => {
          setCurrentMsgIndex((i) => (i + 1) % MESSAGES.length);
          setPhase("typing");
        }, 400);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, displayedCommand, displayedResponse, msg]);

  return { displayedCommand, displayedResponse, phase, cursorVisible, msg };
}

// ─── Terminal window component ────────────────────────────────────────────────
function Terminal() {
  const { displayedCommand, displayedResponse, phase, cursorVisible, msg } =
    useTerminalTyper();

  return (
    <div
      className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl"
      style={{
        background: "rgba(10, 10, 20, 0.85)",
        border: "1px solid rgba(124, 58, 237, 0.25)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 0 60px rgba(124, 58, 237, 0.15), 0 25px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span
          className="ml-3 text-xs font-mono tracking-wider"
          style={{ color: "rgba(148, 163, 184, 0.5)" }}
        >
          ruby@portfolio ~ terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm min-h-[180px] md:min-h-[200px]">
        {/* Static history line */}
        <div className="mb-3" style={{ color: "rgba(100, 116, 139, 0.6)" }}>
          <span style={{ color: "oklch(62.7% 0.194 149.214)" }}>visitor@ruby-izekor</span>
          <span style={{ color: "rgba(148,163,184,0.4)" }}>:</span>
          <span style={{ color: "#2563eb" }}>~</span>
          <span style={{ color: "rgba(148,163,184,0.4)" }}>$ </span>
          <span style={{ color: "rgba(148,163,184,0.3)" }}>
            # Welcome to my portfolio
          </span>
        </div>

        {/* Active prompt line */}
        <div className="flex items-center flex-wrap gap-1">
          <span style={{ color: "oklch(62.7% 0.194 149.214)" }}>visitor@ruby-izekor</span>
          <span style={{ color: "rgba(148,163,184,0.4)" }}>:</span>
          <span style={{ color: "#2563eb" }}>~</span>
          <span style={{ color: "rgba(148,163,184,0.4)" }}>$&nbsp;</span>
          <span style={{ color: msg.color }}>{displayedCommand}</span>
          {/* Blinking cursor */}
          <span
            className="inline-block w-2 h-4 ml-0.5 align-middle"
            style={{
              background: cursorVisible
                ? msg.color
                : "transparent",
              transition: "background 0.1s",
            }}
          />
        </div>

        {/* Response lines */}
        {displayedResponse.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 space-y-1"
          >
            {displayedResponse.map((line, i) => (
              <div
                key={i}
                style={{ color: "rgba(226, 232, 240, 0.85)" }}
                className="leading-relaxed"
              >
                {line}
              </div>
            ))}
          </motion.div>
        )}

        {/* Next prompt (shows when response is visible) */}
        {phase === "showing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1 mt-3"
          >
            <span style={{ color: "oklch(62.7% 0.194 149.214)" }}>visitor@ruby-izekor</span>
            <span style={{ color: "rgba(148,163,184,0.4)" }}>:</span>
            <span style={{ color: "#2563eb" }}>~</span>
            <span style={{ color: "rgba(148,163,184,0.4)" }}>$&nbsp;</span>
            <span
              className="inline-block w-2 h-4 align-middle"
              style={{
                background: cursorVisible ? "rgba(148,163,184,0.6)" : "transparent",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Hero3 main component ─────────────────────────────────────────────────────
export default function Hero3() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen max-w-screen overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #070710 0%, #0c0e1e 35%, #080d1a 70%, #0a0a14 100%)",
      }}
    >
      {/* ── Ambient background glow ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Purple main glow — top right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(37,99,235,0.1) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
        {/* Teal glow — bottom left */}
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(20,184,166,0.08) 50%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />
        {/* Centre soft violet bloom */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Top bar / Nav hint ── */}
      {/*<div className="relative z-10 flex justify-end p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 bg-red-600"
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#34d399" }}
          />
          <span
            className="text-xs tracking-widest uppercase font-mono"
            style={{ color: "rgba(148,163,184,0.6)" }}
          >
            Available for work
          </span>
        </motion.div>
      </div>*/}

      {/* ── Centre: Terminal ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="w-full"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* ── Bottom overlay: Name + Title + CTAs ── */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 md:p-10 pb-10 md:pb-12">
        {/* Name block — bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="space-y-0"
        >
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-extrabold font-serif leading-none tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #94a3b8 100%)",
            }}
          >
            RUBY
          </h1>
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-extrabold font-serif leading-none tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-green-600"
          >
            IZEKOR
          </h1>
        </motion.div>

        {/* Right block — title + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="flex flex-col gap-5 md:items-end"
        >
          <div className="md:text-right">
            <p
              className="text-2xl md:text-3xl font-light"
              style={{ color: "rgba(226, 232, 240, 0.9)" }}
            >
              Software Engineer
            </p>
            <p
              className="text-sm md:text-base tracking-wider uppercase font-medium mt-1 text-transparent bg-clip-text bg-linear-to-r from-white to-green-600"
            >
              CTO @ Justpostam.com
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <motion.button
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm overflow-hidden transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              }}
            >
              <span className="relative z-10">View Portfolio</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #6d28d9, #1d4ed8)",
                }}
              />
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(226,232,240,0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Mail className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Get in Touch</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-mono"
          style={{ color: "rgba(148,163,184,0.4)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(167, 139, 250, 0.6)" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
