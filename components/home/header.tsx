"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "../information/info";
import HamburgerMenu from "./support/hamburger-menu";
import { Button } from "../ui/button";
import { Source_Code_Pro, Anton } from "next/font/google";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Profile } from "@prisma/client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const scp_font = Source_Code_Pro({
  weight: "500",
  subsets: [],
});

const scp_font_2 = Anton({
  weight: "400",
  subsets: [],
});

interface UserProps {
  user: Profile | undefined | null;
}

const Header = ({ user }: UserProps) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const path = usePathname();

  return (
    <div
      className={`fixed z-[999] top-0 left-0 w-full border-b border-gray-400 border-opacity-20 border-n-6 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 lg:px-10 max-lg:py-4">
        <Link
          className={`${scp_font_2.className} w-fit lg:mr-8 block pl-4 items-center text-3xl`}
          href="/"
        >
          Gb. AI
        </Link>
        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } absolute z-[999] top-[5rem] right-0 bg-white bg-opacity-15 border my-4 border-opacity-30 mr-8 border-white rounded-lg px-4 py-2 lg:static lg:flex lg:bg-transparent`}
        >
          <div className="relative z-[999] flex flex-col items-center justify-center lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className={`block relative font-code hover:text-white transition-all duration-300 text-gray-400 md:uppercase  lg:-mr-0.25 lg:text-[15px] text-[#FFFFFF80] lg:font-semibold ${scp_font.className} 
              ${item.url === path ? " text-white" : ""} lg:leading-5 lg:hover:text-n-1 lg:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* <HamburgerMenu /> */}
        </nav>

        <div className="flex justify-end">
          {user ? (
            <>
              <Button
                className={`flex ${scp_font.className} border-[1px] bg-[#121212] hover:bg-white hover:bg-opacity-10 transition-all duration-300`}
              >
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </Button>
            </>
          ) : (
            <>
              <Button
                className={`flex ${scp_font.className} border-[1px] rounded-tr-[20px] bg-[#121212] hover:bg-white hover:bg-opacity-10 transition-all duration-300`}
              >
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </Button>
            </>
          )}

          <Button
            className="ml-auto lg:hidden bg-[#121212]"
            onClick={() => setOpenNavigation(!openNavigation)}
          >
            <Menu />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
