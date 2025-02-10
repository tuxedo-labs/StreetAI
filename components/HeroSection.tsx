import { WorldMap } from "./ui/globe";
import GridBackground from "./ui/grid-background";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Frame from "@/components/FameMotion"

export default function HeroSection() {
    return (
        <div>
            <GridBackground>
                <div className="flex justify-center relative my-20 z-10">
                    <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                        <TextGenerateEffect
                            words="Hi there 👋, welcome to StreetAI Your Smart Location Assistant."
                            className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold"
                        />

                        <div className="text-center mt-4 dark:text-gray-400">
                            <p>
                                StreetAI is an intelligent assistant that provides detailed information about any location you select. Explore the world with ease and uncover insights like never before.
                            </p>
                        </div>

                        <div className="m-6 flex gap-2">
                            <button className=" text-xl px-8 py-2  bg-black text-white rounded-full font-semibold hover:bg-black/[0.8] hover:shadow-lg">
                                Get Started
                            </button>
                            <button className=" text-xl px-8 py-2  bg-white text-black rounded-full border border-black font-semibold hover:shadow-lg">
                                Sign in
                            </button>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </GridBackground>
            <Frame/>
        </div>
    );
}