import Link from "@/components/Link";
import ButtonCrach from "@/components/ui/btn crach/buttonCrach";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 section-gap">
      <div className="flex flex-col gap-4 md:gap-6 lg:justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left">Slice into Happiness</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          Craving pizza? We&apos;ve got you covered with fresh ingredients,
          endless flavors, and the fastest delivery. Your perfect slice is just
          a tap away!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
          <Link href="/menu" className="w-full sm:w-auto">
            <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2">
                 Order Now <CircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </ButtonCrach>
          </Link>
          <Link href="/menu" className="w-full sm:w-auto">
            <ButtonCrach className="bubbles w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2">
                <h1> View Menu</h1> <CircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </ButtonCrach>
          </Link>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src="/assets/images/image.png"
          alt="Hero"
          loading="eager"
          fill
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
