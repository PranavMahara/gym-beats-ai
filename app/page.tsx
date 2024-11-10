import Footer from "@/components/home/footer";
import GridItems from "@/components/home/grid-items";
import LaunchingSoon from "@/components/home/launching-soon";
import Main from "@/components/home/main";
import { Particles } from "@/components/home/support/particles";

export default function Home() {
  return (
    <main className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Particles className="absolute inset-0 -z-10" />
      <Main />
      <GridItems />
      <LaunchingSoon />
      <Footer />

      <div className="absolute top-0 left-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:left-7 xl:left-10" />
      <div className="absolute top-0 right-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:right-7 xl:right-10" />
    </main>
  );
}
