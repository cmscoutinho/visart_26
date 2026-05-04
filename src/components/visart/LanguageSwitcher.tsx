
"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("rounded-full bg-card/40 backdrop-blur-md border-primary/30", className)}>
          <Languages className="w-4 h-4 mr-2" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl bg-card/95 backdrop-blur-xl border-border/50">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="rounded-lg m-1">
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pt')} className="rounded-lg m-1">
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es')} className="rounded-lg m-1">
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
