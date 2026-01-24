"use client";

import React from "react";
import Image from "next/image";
import { RxArrowTopRight, RxPlay } from "react-icons/rx";
import { BsAward } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerStagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  } as const;

  const cardHover = {
    whileHover: {
      y: -8,
      scale: 1.02,
      shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  } as const;

  return (
    <section className="px-4 md:px-14 py-4 bg-[#FDFDFD] w-full min-h-screen flex flex-col items-center overflow-x-hidden selection:bg-green-200">

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex flex-col md:flex-row items-center justify-between py-5 gap-4 md:gap-0 max-w-[1400px] z-50 sticky top-0 bg-white/80 backdrop-blur-md rounded-b-3xl px-4 shadow-sm md:shadow-none"
      >
        <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center -rotate-6">
            <Image src="/logo/image.png" width={28} height={28} alt="Brand Logo" />
          </div>
          <p className="font-extrabold text-2xl text-green-900 tracking-tight">Naturalink</p>
        </div>

        <nav className="w-full md:w-auto px-6 py-2.5 bg-[#ECFFF2] rounded-full flex items-center gap-6 lg:gap-14 overflow-x-auto scrollbar-hide border border-green-100 shadow-inner">
          {["Accueil", "Produits", "Blog", "A propos de nous"].map((item) => (
            <motion.p
              key={item}
              whileHover={{ scale: 1.05, y: -1 }}
              className="text-[#034016] hover:text-green-600 cursor-pointer text-sm md:text-[15px] font-bold whitespace-nowrap transition-colors"
            >
              {item}
            </motion.p>
          ))}
        </nav>

        <div className="flex items-center gap-2 group">
          <button className="px-7 py-3 bg-[#03842B] rounded-full text-white text-sm font-bold shadow-lg shadow-green-200 group-hover:shadow-green-300 transition-all hover:bg-green-700">
            Contactez-nous
          </button>
          <motion.div
            whileHover={{ rotate: 45 }}
            className="w-11 h-11 bg-green-900 rounded-full flex justify-center items-center text-white cursor-pointer shadow-md"
          >
            <RxArrowTopRight size={24} />
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Title & Subtext */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="mt-12 md:mt-20 flex flex-col items-center text-center max-w-[1200px]"
      >
        <h1 className="text-[38px] md:text-[76px] font-[900] text-[#1A1A1A] leading-[1.1] tracking-tighter">
          Digital Truth Transforming Africa’s <br className="hidden md:block" />
          <motion.span
            initial={{ backgroundColor: "transparent" }}
            animate={{ backgroundColor: "#D0F0DA" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="px-8 py-2 rounded-full inline-block mt-3 border border-green-200"
          >
            Agricultural
          </motion.span> Future
        </h1>
        <p className="mt-8 text-sm md:text-lg font-medium text-gray-400 max-w-[750px] leading-relaxed px-4 md:px-0">
          We create eco-responsible transparency, empowering consumers to trust origins and support sustainable African agricultural innovation.
        </p>
      </motion.div>

      {/* Demo Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto px-6"
      >
        <button className="w-full sm:px-12 py-4 bg-[#03842B] rounded-full text-white text-[16px] font-black shadow-xl shadow-green-100 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
          Book a Demo
        </button>
        <button className="w-full sm:px-12 py-4 bg-white border border-green-100 rounded-full flex items-center justify-center gap-3 text-[#1A1A1A] text-[16px] font-bold shadow-sm hover:bg-green-50 transition-all">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <RxPlay size={24} className="text-green-700" />
          </motion.div>
          Watch a Demo
        </button>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-16 md:mt-24 mb-16 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch"
      >

        {/* Card 1: 87% */}
        <motion.div variants={itemFadeUp} {...cardHover} className="flex flex-col gap-4 group">
          <div className="circle bg-gradient-to-br from-[#03842B] to-[#59C173] p-9 flex flex-col justify-between text-white min-h-[300px] md:min-h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/agri/background-green.png')] opacity-10 bg-cover bg-center grayscale group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[60px] md:text-[90px] font-black leading-none drop-shadow-lg">87%</p>
              <p className="mt-6 text-[15px] leading-[1.5] font-medium opacity-95">
                Agriculture encompasses crop & livestock production, aquaculture, fisheries, and forestry for food and non-food.
              </p>
            </div>
            <button className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 flex items-center justify-between hover:bg-white/30 transition-all w-full group/btn overflow-hidden">
              <span className="font-extrabold text-[15px]">Explore More</span>
              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center -mr-2 shadow-lg group-hover/btn:translate-x-1 transition-transform">
                <RxArrowTopRight className="text-white" size={20} />
              </div>
            </button>
          </div>
          <div className="bg-[#034016] rounded-[30px] p-7 flex items-center gap-4 border border-green-800 shadow-xl shadow-green-900/10">
            <div className="p-3 bg-green-700/30 rounded-2xl text-green-400 border border-green-600/20">
              <BsAward size={28} />
            </div>
            <p className="text-gray-100 text-sm font-semibold tracking-wide">
              +1500 Farmers Ready <br /> <span className="text-green-500">For Certification</span>
            </p>
          </div>
        </motion.div>

        {/* Card 2: Farmer Image */}
        <motion.div variants={itemFadeUp} {...cardHover} className="circle relative overflow-hidden min-h-[300px] md:min-h-[420px] md:self-end group">
          <Image src="/agri/farmer-product.jpg" alt="farmer" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-7 flex flex-col justify-end">
            <p className="text-white text-[13px] font-semibold leading-relaxed tracking-wide drop-shadow-md">
              Insuring a climate-resilience future for farmers by providing insurance & technology to protect and improve their livelihoods.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Sticker (circle-2) */}
        <motion.div variants={itemFadeUp} {...cardHover} className="circle-2 relative overflow-hidden min-h-[320px] md:self-end border border-gray-100 group shadow-sm">
          <Image src="/agri/last_farm.png" alt="farm" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
        </motion.div>

        {/* Card 4: Social Media (circle-3) */}
        <motion.div variants={itemFadeUp} {...cardHover} className="flex flex-col gap-4 group justify-end">
          <div className="circle-3 bg-gradient-to-br from-[#03842B] to-[#2E8B57] p-9 flex flex-col justify-end min-h-[300px] md:min-h-[380px] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            <p className="text-white font-[900] text-[24px] leading-tight mb-10 tracking-tight drop-shadow-md relative z-10">
              Connect with us <br /> on social media
            </p>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex gap-3">
                {[FaFacebookF, RiTwitterXFill, FaInstagram].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl cursor-not-allowed hover:bg-green-50 transition-colors"
                  >
                    <Icon size={20} color="black" />
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="w-12 h-12 bg-green-950 rounded-full flex justify-center items-center text-white shadow-2xl border border-white/20"
              >
                <RxArrowTopRight size={26} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Card 5: Honey & Verified (circle-3) */}
        <motion.div variants={itemFadeUp} {...cardHover} className="flex flex-col gap-4 group">
          <div className="circle-3 relative overflow-hidden flex-1 min-h-[300px] md:min-h-[180px]">
            <Image src="/agri/sticker-inteligent.jpg" alt="honey" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            <div className="absolute bottom-6 inset-x-6">
              <button className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-3 flex items-center justify-between hover:bg-black/60 active:scale-95 transition-all text-white w-full shadow-2xl">
                <span className="font-extrabold text-[16px] tracking-wider uppercase">Donate</span>
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center -mr-2 shadow-lg">
                  <RxArrowTopRight size={22} />
                </div>
              </button>
            </div>
          </div>
          <div className="bg-[#034016] rounded-[30px] p-7 flex items-center gap-4 border border-green-800">
            <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
              <GoVerified size={28} />
            </div>
            <p className="text-gray-100 text-[13px] font-bold tracking-tight">
              +10,000 Intelligent <br /> <span className="text-green-500">Stickers Available</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
