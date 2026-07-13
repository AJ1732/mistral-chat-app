"use client";

import { Button } from "@/components/ui/button";
import { useMountEffect } from "@/hooks/use-mount-effect";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useMountEffect(() => {
    console.error(error);
  });

  return (
    <div className="mx-auto min-h-dvh max-w-lg place-content-center space-y-3 px-4">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
