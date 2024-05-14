'use client'

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/hooks/useRentModel'
import { useRouter } from 'next/navigation'

interface UserMenuProps{
    currentUser?: SafeUser | null;
  }

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModel = useRentModal();
    const [isOpen, setisOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setisOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        //Open rent Model
        rentModel.onOpen()
;
    },[currentUser, loginModal, rentModel],)

  return (
    <div className='relative'>
        <div className="flex flex-row items-center gap-3">
            <div className="hidden md:block font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={onRent}>
                Airbnb your home
            </div>
            <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" >
                <AiOutlineMenu/>
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {currentUser? (
                         <>
                         <MenuItem onClick={() => router.push('/trips')} label='My trips'/>
                         <MenuItem onClick={() => router.push('/favorites')} label='My favorites'/>
                         <MenuItem onClick={() => router.push('/reservations')} label='My Reservations'/>
                         <MenuItem onClick={() => router.push('/properties')} label='My Properties'/>
                         <MenuItem onClick={() => rentModel.onOpen()} label='My Airbnb my Home'/>
                         <hr />
                         <MenuItem onClick={() =>signOut() } label='Logout'/>
                     </>
                    ) :
                    (
                    <>
                        <MenuItem onClick={loginModal.onOpen} label='sign-in'/>
                        <MenuItem onClick={registerModal.onOpen} label='sign-up'/>
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu