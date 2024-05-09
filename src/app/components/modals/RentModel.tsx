'use client'

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/hooks/useRentModel';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValue, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModel = () => {
    const rentModel = useRentModal();

    const [step, setSteps] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValue>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch(`category`);
    const location = watch(`location`);

    const Map = useMemo(() => 
        dynamic(()=> import('../Map'), {
            ssr:false
        })
        ,[location])

    const setCustomValue = (id: string, value: any) =>
        {
            setValue(id, value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            })
        }

    const onBack = () => {
        setSteps((value) => value -1)
    }

    const onNext = () => {
        setSteps((value) => value +1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE ) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes your place'
                subtitle='Pick a category'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div className="" key={item.label}>
                        <CategoryInput 
                         icon={item.icon}
                         onClick={(category) => setCustomValue('category', category)}
                         label={item.label}
                            selected={category === item.label}
                         />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading  
                  title='Where is your place located'
                  subtitle='Help guets find you'
                />
                <CountrySelect 
                value={location}
                 onChange={(value) => setCustomValue('location', value)}
                />
                <Map centre={location?.latlng}/>
            </div>
        )
    }

  return (
    <Modal 
     title='Airbnb your home'
     isOpen={rentModel.isOpen}
     onCLose={rentModel.onClose}
     onSubmit={onNext}
     actionLabel={actionLabel}
     secondaryActionLabel={secondaryActionLabel}
     secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
     body={bodyContent}
    />
  )
}

export default RentModel