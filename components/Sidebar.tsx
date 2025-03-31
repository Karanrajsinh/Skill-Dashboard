"use client";

import { LayoutDashboard, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: GraduationCap, label: "Skill Test", active: false },
  { icon: Briefcase, label: "Internship", active: false },
];

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:relative md:transform-none",
        !isOpen && "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50 text-gray-600"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}