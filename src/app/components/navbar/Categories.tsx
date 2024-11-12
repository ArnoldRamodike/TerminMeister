"use client";

import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPodiumOff, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiFarmer,
  GiFishingBoat,
  GiForestCamp,
  GiIsland,
  GiMountains,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is close to the beach",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern class and cloudy",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This is Property has windmills",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "The Property is on the country side.",
  },
  {
    label: "Hut",
    icon: MdOutlineVilla,
    description: "This property is hut",
  },
  {
    label: "Farm",
    icon: GiFarmer,
    description: "Farm house",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Islands properties",
  },
  {
    label: "Lake",
    icon: GiFishingBoat,
    description: "Property has a lake onsite.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "skiiing capabilities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "The castle house.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "For Camping functionalities.",
  },
  {
    label: "Mountains",
    icon: GiMountains,
    description: "The property is on top of a mountain.",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "The property has caves and mountains",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Property is ona desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Barn house",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "The modern luxury house",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
