import React from "react";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import { RxPlay } from "react-icons/rx";
export default function HeroSection() {
  return (
    <section className="px-[98px] py-5 bg-white w-full h-screen overflow-hidden">
      <div className="grid grid-cols-12 grid-rows-10 gap-6 h-full">
        <div className="flex items-center justify-between col-span-12 py-4 rounded-2xl">

          <div className="flex items-center gap-2">
            <Image src="/logo/image.png" width={30}  height={30} className="rounded-xl" alt="Brand Logo"/>
            <p className="font-bold text-lg text-green-700 capitalize">Naturalink</p>
          </div>

          <div className="px-5 py-3 bg-[#ECFFF2] rounded-[30px] flex justify-start items-center gap-12">
            <p className=" text-green-950 hover:text-green-700 hover:cursor-pointer text-base font-normal leading-6 ">Accueil </p>
            <p className="text-green-950 hover:text-green-700  hover:cursor-pointer text-base font-normal leading-6">Produits</p>
            <p className=" text-green-950 hover:text-green-700  hover:cursor-pointer text-base font-normal leading-6">Blog</p>
            <p className="text-green-950 hover:text-green-700  hover:cursor-pointer text-base font-normal leading-6 tracking-wide">A propos de nous </p>
          </div>

          <div className="flex items-center">
            <div className="px-5 py-3 bg-gray-900 rounded-[50px] flex justify-center items-center">
              <p className="text-white text-base font-normal leading-6 tracking-wide">Contactez-nous</p>
            </div>
            <div className="w-12 h-12 bg-gray-900 rounded-full flex justify-center items-center ">
                <RxArrowTopRight size={24} className="w-6 h-6"/>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col items-center justify-center col-span-10 row-span-3 col-start-2 row-start-2 bg-blue-400 p-4 rounded-2xl gap-4.5">
          <p className="text-center text-[60px]"> Digital Truth Transforming Africa’s Agricultural Future</p>
        
        </div>
        <div className="flex flex-col items-center justify-center col-start-4 col-span-6 row-start-5 row-span-2 bg-red-500 gap-4">
              <p className="w-[98%] text-center text-[18px]">We create eco responsible transparency empowering consumers to trust origins and support sustainable African agricultural innovation.</p>
          <div className="flex flex-row items-center justify-cente gap-2">
            <a href="" className="px-4 h-11 bg-gray-900  rounded-full flex justify-center items-center gap-2">
              <p className="text-white text-[16px] font-normal">Book a Demo</p> 
            </a>
            <button className="inline-flex items-center justify-center gap-2 px-4 h-11 bg-[#ECFFF2] rounded-full">
              <RxPlay className="text-gray-900 text-lg" />
              <span className="text-gray-900 text-[16px] font-normal">
                Watch a Demo
              </span>
            </button>
          </div>
        </div>

        <div className="col-span-6 row-span-5 col-start-4 row-start-7 bg-green-400 rounded-2xl flex flex-row justify-center gap-2 ">
           <div className="relative circle w-[33%] bg-amber-600">
            <Image 
              src="/agri/farmer-2.png" 
              alt="brand-agri" 
              fill
              className="object-cover"
            />
            <div className="absolute -bottom-3 w-full  pb-2 flex items-end">
              <div className="w-full  bg-black/2 p-3 shadow-2xl">
                <p className=" text-white text-[16px] font-medium text-left"   style={{ wordSpacing: "-2px" }}>
                Naturalink boosts producers with verified origins, stronger visibility, trusted markets, and sustainable value across communities.
                </p>
              </div>
            </div>
           </div>
          <div className="circle-2 relative w-[36%] h-[75%] self-end">
            <Image 
              src="/agri/section-agri.png" 
              alt="brand-agri" 
              fill
              className="object-cover"
            />
          </div>
           <div className="circle-3 circle w-[33%] relative">
             <Image 
              src="/agri/background-green.png" 
              alt="brand-agri" 
              fill
              className="object-cover"
            />



           </div>
        </div>

        <div className="col-span-3 row-span-7 col-start-1 row-start-5 bg-red-400 flex flex-col gap-2">
          <div className="circle h-[74%] bg-green-400"></div>
          <div className="rounded-[26px] h-[24%] bg-orange-300"></div>
        </div>

        <div className="col-span-3 row-span-7 col-start-10 row-start-5 bg-purple-400 rounded-2xl flex flex-col gap-2">
         <div className="circle-3 h-[74%] bg-green-400"></div>
          <div className="rounded-[26px] h-[24%] bg-orange-300">

          </div>
        </div>

        {/* <div className="col-span-3 row-span-2 row-start-9 bg-orange-400 p-4 rounded-2xl">
          6
        </div>

        <div className="col-span-3 row-span-2 col-start-10 row-start-9 bg-yellow-400 p-4 rounded-2xl">
          7
        </div> */}
      </div>
    </section>
  );
}
