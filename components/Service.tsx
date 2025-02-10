"use client";

import React from "react";
import { WorldMap } from "./ui/globe";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemoSecond() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {/* World Map Background */}
      <div className="absolute inset-0 z-0">
        <WorldMap />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full min-h-screen p-2 dark:bg-black/80 flex flex-col justify-center items-center shadow-lg">
            <div className="text-5xl m-6 w-full justify-end">
                 <span className="font-bold ml-52">Service</span>
            </div>
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 w-full max-w-6xl">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Do things the right way"
            description="Running out of copy so I'll write anything."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="The best AI code editor ever."
            description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="You should buy Aceternity UI Pro"
            description="It's the best money you'll ever spend"
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="This card is also built by Cursor"
            description="I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Coming soon on Aceternity UI"
            description="I'm writing the code as I record this, no shit."
          />
        </ul>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
       <div className="relative h-full w-full rounded-3xl bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-gray-700 p-6 shadow-lg dark:shadow-black/50">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={100} // Glow effect lebih besar
          glow={true}
          disabled={false}
          proximity={30} // Glow lebih intens
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl font-semibold font-sans text-black dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm md:text-base text-black dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};