import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SubscribeSection } from "@/components/SubscribeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SubscribeSection />
      </main>
    </>
  );
}
