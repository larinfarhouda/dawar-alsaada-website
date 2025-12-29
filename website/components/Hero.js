"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Hero({ media }) {
  const t = useTranslations('Hero');
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, shouldReduceMotion ? 1 : 0]);

  // Use media from database or fallback to default
  const mediaUrl = media?.url || "/hero-bg.png";
  const mediaType = media?.type || "image";

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Parallax Background */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        {mediaType === "video" ? (
          <video
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={mediaUrl}
            alt="Dawar Al Saada"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        )}

        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-24 h-24 bg-brand/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 relative w-32 h-32 mx-auto"
          >

            <Image
              src="/hero-logo.png"
              alt="Dawar Al Saada Logo"
              fill
              className="object-contain"
            />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight px-2">
            {/* {t('title_part1')} <br /> */}

            <span className="text-white">
              {t('title_part2')}
            </span>
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-stone-200 mb-8 sm:mb-12 font-light max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <Link href="#franchise" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand text-white text-base sm:text-lg font-bold rounded-full overflow-hidden shadow-lg shadow-brand/30 transition-all hover:scale-105 hover:shadow-brand/50 flex items-center justify-center">
              <span className="relative z-10">{t('franchise_btn')}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link href="#branches" className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/30 text-white text-base sm:text-lg font-bold rounded-full backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60 flex items-center justify-center">
              {t('branches_btn')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">{t('discover_more')}</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-brand rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
