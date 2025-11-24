"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-stone-50/90"></div>
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

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-4 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-stone-200 text-sm tracking-wider"
          >
            أصالة الطعم السعودي
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            من زان فطوره <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-amber-400">
              زانت اموره
            </span>
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-3xl text-stone-200 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
          >
            مرحباً بكم في دوار السعادة، حيث نلتقي لتجربة فريدة من نوعها في عالم الطعام السعودي
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-brand text-white text-lg font-bold rounded-full overflow-hidden shadow-lg shadow-brand/30 transition-all hover:scale-105 hover:shadow-brand/50">
              <span className="relative z-10">تصفح القائمة</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button className="group px-8 py-4 bg-transparent border border-white/30 text-white text-lg font-bold rounded-full backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60">
              احجز طاولتك
            </button>
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
        <span className="text-xs tracking-widest uppercase">اكتشف المزيد</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-brand rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
