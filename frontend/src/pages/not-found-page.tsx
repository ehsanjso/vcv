import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <h4 className="text-sm font-medium leading-none pr-2">404</h4>
          <Separator orientation="vertical" />
          <Icons.poker />
          <p className="text-sm text-muted-foreground">
            You are all alone here!
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
