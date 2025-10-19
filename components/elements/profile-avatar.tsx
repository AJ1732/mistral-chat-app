import { cn } from "@/lib/utils";

export default function ProfileAvatar({ className }: { className?: string }) {
  return (
    <figure
      title="User"
      className={cn(
        "bg-orange-accent-500 relative grid size-12 place-content-center rounded-md text-xl text-white",
        className,
      )}
    >
      U
    </figure>
  );
}
