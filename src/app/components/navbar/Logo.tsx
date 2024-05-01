'use client'

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter;
  return (
    <div>
        <Image className="hidden md:block cursor-pointer"  alt="logo" height={50} width={50} src={'/images/logo.svg'}/>
    </div>
  )
}

export default Logo