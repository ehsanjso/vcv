import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Playground</h1>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
