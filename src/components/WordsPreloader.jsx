import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function WordsPreloader({
    show,
    onDone,
    words = [
        "Hello",
        "Bonjour",
        "Ciao",
        "Hola",
        "नमस्ते",
        "مرحبا",
        "こんにちは",
        "안녕하세요",
    ],
    durationMs = 2600,
    stepMs = 600,
}) {
    const safeWords = useMemo(() => (words?.length ? words : words), [words]);

    const [index, setIndex] = useState(0);

    // Rotate words while preloader is visible
    useEffect(() => {
        if (!show) return;

        setIndex(0);
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % safeWords.length);
        }, stepMs);

        const doneTimer = setTimeout(() => {
            onDone?.();
        }, durationMs);

        return () => {
            clearInterval(interval);
            clearTimeout(doneTimer);
        };
    }, [show, durationMs, stepMs, safeWords.length, onDone]);

    return (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
                    style={styles.overlay}
                >
                    {/* Background sweep curve */}
                    <CurvedSweep />

                    {/* Center word */}
                    <div style={styles.center}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                style={styles.word}
                            >
                                {safeWords[index]}
                            </motion.div>
                        </AnimatePresence>

                        <div style={styles.sub}>
                            <span style={{ opacity: 0.7 }}>Loading</span>
                            <Dots />
                        </div>
                    </div>

                    {/* Bottom tiny line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={styles.progressLine}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function CurvedSweep() {
    // A subtle accent: animated curved path + soft gradient glow
    return (
        <motion.div
            aria-hidden="true"
            style={styles.curveWrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
            <svg
                viewBox="0 0 1200 260"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                style={{ display: "block" }}
            >
                <defs>
                    <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.14)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>

                    <filter id="blurGlow">
                        <feGaussianBlur stdDeviation="10" />
                    </filter>
                </defs>

                {/* Soft glow */}
                <motion.path
                    d="M -20 210 C 260 40, 540 280, 1220 90"
                    fill="none"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="16"
                    filter="url(#blurGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.05, ease: "easeInOut" }}
                />

                {/* Main line */}
                <motion.path
                    d="M -20 210 C 260 40, 540 280, 1220 90"
                    fill="none"
                    stroke="url(#g)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.05, ease: "easeInOut", delay: 0.1 }}
                />
            </svg>
        </motion.div>
    );
}

function Dots() {
    return (
        <span style={{ display: "inline-flex", gap: 4, marginLeft: 8 }}>
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    style={styles.dot}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </span>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0b0b0d",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
    },
    center: {
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: 24,
    },
    word: {
        fontSize: "clamp(34px, 5vw, 72px)",
        letterSpacing: "-0.02em",
        fontWeight: 600,
        color: "rgba(255,255,255,0.95)",
    },
    sub: {
        marginTop: 14,
        fontSize: 14,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.7)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 999,
        background: "rgba(255,255,255,0.9)",
        display: "inline-block",
    },
    curveWrap: {
        position: "absolute",
        inset: 0,
        opacity: 1,
        transform: "translateY(-6%)",
    },
    progressLine: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 28,
        height: 1,
        background: "rgba(255,255,255,0.18)",
        transformOrigin: "left center",
    },
};
