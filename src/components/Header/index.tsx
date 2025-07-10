import React from "react";
import Link from "../Link";
import { Routes } from "@/constants/enums";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="py-4 ">
      <div className="container flex justify-between items-center ">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-xl z-500 "
        >
          🍕 Pizza
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
