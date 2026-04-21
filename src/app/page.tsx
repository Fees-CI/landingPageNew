import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import ImpactStats from "@/components/ImpactStats";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-white text-[#2C2C2C]">
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <HowItWorks />
      <ImpactStats />
      <Roadmap />
      <Footer />
    </main>
  );
}
