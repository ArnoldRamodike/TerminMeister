'use client'

import React from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPodiumOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiCactus, GiCastle, GiCaveEntrance, GiFarmer, GiFishingBoat, GiForestCamp, GiIsland, GiMountains, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { FaSkiing } from 'react-icons/fa'
import { IoDiamond } from 'react-icons/io5'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This is close to the beach'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'The modern villa'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This is Property has windmills'
    },
    {
        label: 'CountrySide',
        icon: TbMountain,
        description: 'The Property is on the country side.'
    },
    {
        label: 'Hut',
        icon: MdOutlineVilla,
        description: 'The modern villa'
    },
    {
        label: 'Farm',
        icon: GiFarmer,
        description: 'The modern villa'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'The modern villa'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'The modern villa'
    },
    {
        label: 'Lake',
        icon: GiFishingBoat,
        description: 'The modern villa'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'The modern villa'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'The modern villa'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'The modern villa'
    },
    {
        label: 'Mountains',
        icon: GiMountains,
        description: 'The modern villa'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'The modern villa'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'The modern villa'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'The modern villa'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'The modern villa'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category= params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
    }
    
  return (
   <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox 
                    key= {item.label}
                    label={item.label}
                    selected= {category === item.label}
                    icon ={item.icon}
                />
            ) )}
        </div>
   </Container>
  )
}

export default Categories