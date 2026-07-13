import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/elements";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="content-grid min-h-dvh bg-[url('/images/mistral-pattern.webp')] bg-contain bg-no-repeat lg:bg-cover">
      <section className="relative flex justify-center gap-8 max-xl:flex-col max-xl:py-16">
        <div className="absolute top-4 right-0 flex items-center gap-4">
          <ThemeToggle />
        </div>
        <header className="flex flex-col justify-center gap-4 lg:min-w-lg">
          <h1 className="text-5xl leading-[130%] md:text-6xl xl:text-7xl">
            <span className="text-orange-accent-500">Mistral AI</span> <br />{" "}
            Chat App
          </h1>
          <p className="max-w-lg leading-[200%] xl:text-lg">
            A modern, real-time chat application built, powered by Mistral
            AI&apos;s completion API.
          </p>
          <Button asChild className="mt-4 min-w-40 lg:w-fit">
            <Link href={"/chat"}>Try It Out</Link>
          </Button>
        </header>
        <div className="flex flex-col pt-8">
          <figure className="ml-auto size-60 md:size-72 lg:size-80">
            <Image
              alt="LeChat - Mistral"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="size-full object-contain pt-2"
              src="https://cms.mistral.ai/assets/920e56ee-25c5-439d-bd31-fbdf5c92c87f"
            ></Image>
          </figure>
        </div>
      </section>
    </main>
  );
}
