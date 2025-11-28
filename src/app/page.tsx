import React from "react";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import { RxPlay } from "react-icons/rx";
import { BsAward } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
export default function HeroSection() {
  const baseIconStyle = "w-14 h-14  bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105";

    // Style pour l'icône elle-même
    const iconSize = 24;
    const iconColor = "black";
  return (
    <section className="px-14 py-2.5 bg-white w-full h-screen overflow-hidden">


      {/* Header */}
      <div className="grid grid-cols-12 grid-rows-12 h-full">
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
            <div className="px-5 py-3 bg-[#03842B] rounded-[50px] flex justify-center items-center">
              <p className="text-white text-base font-normal leading-6 tracking-wide">Contactez-nous</p>
            </div>
            <div className="w-12 h-12 bg-[#03842B] rounded-full flex justify-center items-center ">
                <RxArrowTopRight size={24} className="w-6 h-6"/>
            </div>
          </div>
          
        </div>
        <div className="mt-8 row-start-2 row-span-3 col-start-1 col-span-12 flex flex-col  gap-3 items-center justify-start text-[#2C2C2C]">
          <p className="w-[85%] text-center text-[60px] font-extrabold"> Digital Truth Transforming Africa’s <span className="bg-[#d0f0da] px-4 py-3 rounded-full">Agricultural</span>  Future</p>
          <p className="w-[50%] text-center text-lg font-light">We create eco responsible transparency empowering consumers to trust origins and support sustainable African agricultural innovation.</p>
        </div>
        <div className="row-start-6 row-span-7 col-start-1 col-span-12 ">
          <div className="w-full h-full grid grid-cols-11 grid-rows-5">

            <div className="mt-5 flex justify-center p-5 col-start-5 col-span-3 row-start-1 ">
                <div className="flex gap-2 pb-4">
                  <a href="" className="px-4 h-11 bg-[#03842B]  rounded-full flex justify-center items-center gap-2">
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

            <div className="row-span-5 col-span-2 space-y-2">
                <div className="circle-1 circle w-full h-[78%] relative">
                    <Image 
                      src="/agri/background-green.png" 
                      alt="brand-agri" 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute p-4 flex flex-col gap-8">
                        <div>
                          <p className="text-[68px] font-bold">87%</p>
                          <p className="text-[16px]">Agriculture encompas ses crop and livestock productionm aquaculture, fisheries, and forestry for food and non-food</p>
                    </div>
                  <button
                    className="
                      backdrop-blur-sm bg-white/20
                      border border-white/20
                      rounded-full
                      px-3 py-2
                      inline-flex items-center space-x-6
                    "
                  >
                    <span className="text-white text-[16px] font-bold">
                      Explore More
                    </span>

                    <div className="
                      w-12 h-12 
                      bg-[#03842B] 
                      rounded-full 
                      flex items-center justify-center
                    ">
                      <RxArrowTopRight className="w-6 h-6 text-white" />
                    </div>
                  </button>

                    </div>
                   
                  </div>
                <div className="flex justify-center items-center rounded-[26px] w-full h-[20%] bg-[#034016] p-3.5 gap-2">
                  <BsAward size={32}/>
                  <p className="w-[80%]">+1500 Farmers Ready For Certification</p>
                </div>
            </div>
            <div className="col-start-10 row-span-5 col-span-2 space-y-2">
               
                  <div className="self-end circle-3 circle w-full h-[78%] relative flex items-end justify-center p-2">
                          <Image 
                            src="/agri/sticker-inteligent.png" 
                            alt="brand-agri" 
                            fill
                            className="object-cover"
                          />
                          <button
                            className="
                              
                              px-6 py-2
                              backdrop-blur-sm bg-white/12
                              text-white font-semibold
                              rounded-full
                              border border-white/12
                              inline-flex items-center space-x-12
                            "
                          >
                           <span className="text-[18px] font-bold" >Donate</span>
                          <div className="w-12 h-12 bg-[#03842B] rounded-full flex justify-center items-center ">
                            <RxArrowTopRight size={24} className="w-6 h-6"/>
                          </div>
                        </button>
                    </div>
                  <div className="flex justify-center items-center rounded-[26px] w-full h-[20%] bg-[#034016] p-6 gap-2">
                    <GoVerified size={32}/>
                    <p className="w-[80%]">+10000 Intelligent Sticker Available</p>
                  </div>
             
            </div>
             <div className="flex flex-row items-center justify-center gap-4 col-start-3 col-span-7 row-span-4">
              <div className="circle-1 circle w-[30%] h-full relative overflow-hidden">
                  <Image 
                    src="/agri/farmer-product.jpg" 
                    alt="brand-agri" 
                    fill
                    className="object-cover"
                  />
                  <div className="
                    absolute bottom-0 left-0 w-full
                    bg-linear-to-t from-black/70 to-transparent
                    p-4
                  ">
                    <p className="text-white text-[18px]">
                      Insuring a climate resilience future for farmers by providing
                      insurance & technology to protect and improve their livelihoods.
                    </p>
                  </div>
              </div>
                <div className="self-end circle-2 relative w-[30%] h-[80%]">
                  <Image 
                    src="/agri/sticker-inteligent-2.png" 
                    alt="brand-agri" 
                    fill
                    className="object-cover"
                  />
              </div>
              <div className="circle-3 circle w-[30%] h-full relative flex items-center justify-center">
                  <Image 
                    src="/agri/background-green.png" 
                    alt="brand-agri" 
                    fill
                    className="object-cover"
                  />
                  <div className="p-4 self-end absolute">
                      <div className="mb-8 flex items-center justify-center p-4">
                        <p className="text-[22px] font-bold w-[180px] h-[73px]" >Connect with us on social media</p>
                      </div>

                      <div className="flex items-center justify-between">
                          <div className="flex justify-center items-center">
                            <div className={`${baseIconStyle} mr-2`}>
                                <FaFacebookF size={iconSize} color={iconColor} aria-label="Icône Facebook" />
                            </div>

                            {/* 2. X (Twitter) - Se chevauche avec Facebook */}
                            <div className={`${baseIconStyle} -ml-6 mr-2`}>
                                <RiTwitterXFill size={iconSize} color={iconColor} aria-label="Icône X (anciennement Twitter)" />
                            </div>

                            {/* 3. Instagram - Se chevauche avec X */}
                            <div className={`${baseIconStyle} -ml-6`}>
                                <FaInstagram size={iconSize} color={iconColor} aria-label="Icône Instagram" />
                            </div>
                        </div>
                         <button className="w-14 h-14 bg-[#03842B] rounded-full flex justify-center items-center">
                              <RxArrowTopRight size={24} className="w-6 h-6"/>
                        </button>
                      </div>
                      
                  </div>
              </div>
             
             </div>

          </div>
        </div>
        
      </div>

      


    </section>
  );
}

              