"use client";
import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Take Control of Your Money modern way with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Fimon.app
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/Screenshot%202025-05-26%20003455.png`}
          alt="hero"
          height={720}
          width={1000}
          className="hidden md:block mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
