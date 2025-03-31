"use client";

import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Props {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: Props) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-white border-b">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl md:text-2xl font-bold">Company</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs md:text-sm font-medium">Unknown Person</span>
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <User className="h-4 w-4 md:h-5 md:w-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}