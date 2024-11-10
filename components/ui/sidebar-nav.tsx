"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { buttonVariants } from './button';

import { Source_Code_Pro} from "next/font/google";

const scp_font = Source_Code_Pro({
  weight: "800",
  subsets: []
})


interface SidebarNavProps {
  className: any,
  items: {
    title: string
  }[],
  onSelect: (title: string) => void,
  selectedItem: string
}

export function SidebarNav({ className, items, onSelect, selectedItem, ...props }: SidebarNavProps) {

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.title}
          onClick={() => onSelect(item.title)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            selectedItem === item.title
              ? "bg-white bg-opacity-10 hover:bg-muted text-white"
              : "hover:text-gray-500",
            "justify-start text-md w-[200px]", scp_font.className
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}
