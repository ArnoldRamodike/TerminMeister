'use client'

import React, { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'



const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, 
        formState: {
            errors,
            }
        } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then( (callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
      }

      const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      },[loginModal, registerModal])

      const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome to back' subtitle='Login to your account'/>
            <Input id='email' type='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='Password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
      )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
        <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')}/>
        <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')}/>
        <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="justify-center  flex flex-row items-center gap-2">
               <div className="">
                Don't have an account ?
               </div>
               <div onClick={toggle} className="text-red-500 cursor-pointer hover:underline">
                Register
               </div>
            </div>
        </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading} 
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onCLose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal