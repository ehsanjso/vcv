import { GitGraph } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <div className="flex h-full items-center gap-4">
        <Button variant="outline" size="icon" aria-label="Home">
          <GitGraph className="size-5 fill-foreground" />
        </Button>
        <Separator orientation="vertical" />
        <h1 className="text-xl font-semibold">VCV</h1>
      </div>

      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
