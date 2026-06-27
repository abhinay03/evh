"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

function ScrollIndicator() {
  const { t } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-medium">
        {t("hero.scroll")}
      </span>
      <div className="relative w-5 h-8 rounded-full border border-white/12 flex justify-center overflow-hidden">
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          className="w-1 h-1 rounded-full bg-white/50 mt-1.5"
        />
        <motion.div
          animate={{ opacity: [0, 1, 0], y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(229,57,53,0.25)]"
        />
      </div>
    </motion.div>
  );
}

function CurvedDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 leading-none pointer-events-none">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C320 80 640 120 1440 0V120H0V0Z"
          fill="var(--color-evh-bg, #FAFAFA)"
        />
      </svg>
    </div>
  );
}

function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const didUnmute = useRef(false);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const handlePlaying = useCallback(() => {
    if (!didUnmute.current && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      didUnmute.current = true;
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    };
  }, []);

  const handleVideoClick = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-[920px] mx-auto lg:mx-0 animate-float"
    >
      <div className="relative rounded-[1.75rem] overflow-hidden bg-white/5 backdrop-blur-xl border border-white/12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="aspect-video relative overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/images/evh-bg.png"
            muted={isMuted}
            autoPlay
            playsInline
            preload="auto"
            onError={() => setHasError(true)}
            onEnded={handleEnded}
            onPlaying={handlePlaying}
          >
            <source src="/videos/evh-campaign.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 cursor-pointer" onClick={handleVideoClick} />

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 px-5 py-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E53935] opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E53935]" />
          </span>
          <span className="text-[11px] text-white/40 font-medium tracking-wider uppercase">
            EVH Campaign 2026
          </span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <span className="ml-auto text-[11px] text-white/25 font-medium">
            0:30
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: easeOut,
    },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { t } = useLocale();

  const videoScale = useTransform(scrollY, [0, 400], [1, 0.92]);
  const videoOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] max-h-[1080px] overflow-hidden bg-[#16233A]"
    >
      {/* Creative background — gradient blobs + geometric mesh */}
      <div className="absolute inset-0 z-0">
        {/* Base mesh pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Large gradient blob — top left */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-radial from-[#E40000]/25 via-[#E40000]/10 to-transparent blur-[100px] rounded-full" />

        {/* Large gradient blob — bottom right */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-radial from-[#8B5CF6]/20 via-[#6366F1]/10 to-transparent blur-[100px] rounded-full" />

        {/* Accent orb — center */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#E40000]/12 to-transparent blur-[80px] rounded-full" />

        {/* Floating gradient shapes */}
        <motion.div
          animate={{ x: [0, 30, 0, -30, 0], y: [0, -20, 0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#E40000]/15 to-[#FF6B6B]/5 blur-[60px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0, 40, 0], y: [0, 30, 0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#8B5CF6]/10 to-[#6366F1]/5 blur-[60px]"
        />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16233A]/60 via-transparent to-[#16233A]/30" />

        {/* Right side depth gradient (replaces old overlay) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-[35%] to-[#16233A]/60 to-[85%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16 xl:gap-20">
          {/* Left Column — Video Card (desktop) */}
          <motion.div
            style={{ scale: videoScale, opacity: videoOpacity }}
            className="hidden lg:flex flex-1 justify-start"
          >
            <VideoCard />
          </motion.div>

          {/* Right Column — Text */}
          <div className="flex-1 max-w-[560px] lg:max-w-[480px] xl:max-w-[540px]">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 0.7, ease: easeOut }}
              className="text-[#E53935]/60 font-medium text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-1.5"
            >
              {t("hero.badge")}
            </motion.p>

            {/* Headline — single line */}
            <div className="overflow-hidden">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-[clamp(2.5rem,8vw,5rem)] xl:text-[clamp(3rem,6vw,6rem)] font-display font-bold leading-[1.05] tracking-[-0.03em] text-white"
              >
                {t("hero.title.line1")} <span className="text-[#E53935] whitespace-nowrap">{t("hero.title.line2")}</span>
              </motion.h1>
            </div>

            {/* Subline — single line creative */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: easeOut }}
              className="mt-6 sm:mt-8"
            >
              <span className="block text-base sm:text-lg md:text-xl leading-relaxed text-white font-medium tracking-wide"
                style={{ textShadow: "0 0 20px rgba(22,35,58,0.6), 0 0 40px rgba(22,35,58,0.3)" }}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {t("hero.subtitle.line1")}
                </motion.span>
                <span className="mx-2 text-white/30">·</span>
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                  className="inline-block"
                >
                  {t("hero.subtitle.line2")}
                </motion.span>
                <span className="mx-2 text-white/30">·</span>
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="inline-block"
                >
                  {t("hero.subtitle.line3")}
                </motion.span>
              </span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="block mt-2 text-sm sm:text-base text-[#E53935]/70 font-medium tracking-wide"
                style={{ textShadow: "0 0 20px rgba(229,57,53,0.15)" }}
              >
                {t("hero.subtitle.sustainability")}
              </motion.span>
            </motion.p>

            {/* Tablet/mobile: Video appears here */}
            <div className="mt-8 lg:hidden">
              <VideoCard />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6, ease: easeOut }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href="#district-heating"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E53935] text-white text-sm font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:bg-[#c62828] active:scale-[0.97] shadow-[0_4px_14px_-4px_rgba(229,57,53,0.4)]"
              >
                <span className="relative z-10">{t("hero.cta.explore")}</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>
              <Link
                href="/portal/dashboard"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:border-white/40 hover:bg-white/5 active:scale-[0.97]"
              >
                <span className="relative z-10">{t("hero.cta.portal")}</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <CurvedDivider />
    </section>
  );
}
