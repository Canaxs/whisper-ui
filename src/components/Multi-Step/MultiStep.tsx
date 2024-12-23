'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import StepCard from '../Step-Card/StepCard'
import { Button } from '../ui/button'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Adım 1',
    name: 'Paket Seçimi',
    fields: []
  },
  {
    id: 'Adım 2',
    name: 'Ödeme Bilgileri',
    fields: ['cardName' , 'cardNumber', 'expirationDate', 'cvc']
  },
  { id: 'Adım 3', name: 'Tamamlandı' }
]

export default function MultiStep() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-20' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Paket Seçimi
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              <label>Söylenti</label> Hoşgeldin
            </p>
            <div className='mt-10 flex'>
                <div className='w-1/4 m-3 ml-0'>
                    <StepCard title={"Ücretsiz Plan"} posts={"5"} money={false} exclusive={false}/>
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Başlangıç Planı"} posts={"20"} money={false} exclusive={false}/>
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Standart Plan"} posts={"35"} money={true} exclusive={false}/>
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Premium Plan"} posts={"Sınırsız"} money={true} exclusive={true}/>
                </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Ödeme Bilgileri
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Kart Bilgilerinizi Doldurun
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='col-span-full'>
                <label htmlFor='street' className='block text-sm font-medium leading-6 text-gray-900'>Kart Üzerindeki İsim</label>
                    <div className='mt-2'>
                    <input type='text' id='street' {...register('cardName')} autoComplete='street-address'
                        className='block p-3 w-1/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.cardName?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.cardName.message}
                        </p>
                    )}
                    </div>
                </div>
                <div className='col-span-2'>
                <label htmlFor='street' className='block text-sm font-medium leading-6 text-gray-900'>Kart Numarası</label>
                    <div className='mt-2'>
                    <input type='text' id='street' {...register('cardNumber')} autoComplete='street-address'
                        className='block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.cardNumber?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.cardNumber.message}
                        </p>
                    )}
                    </div>
                </div>
                <div className='col-span-1'>
                <label htmlFor='street' className='block text-sm font-medium leading-6 text-gray-900'>Son Kullanma Tarihi</label>
                    <div className='mt-2'>
                    <input type='text' id='street' {...register('expirationDate')} autoComplete='street-address'
                        className='block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.expirationDate?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.expirationDate.message}
                        </p>
                    )}
                    </div>
                </div>
                <div className='col-span-1'>
                <label htmlFor='street' className='block text-sm font-medium leading-6 text-gray-900'>CVC</label>
                    <div className='mt-2'>
                    <input type='text' id='street' {...register('cvc')} autoComplete='street-address'
                        className='block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {errors.cvc?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.cvc.message}
                        </p>
                    )}
                    </div>
                </div>
            </div>
            <div className='flex mt-5'>
                <Button className='bg-gray-600'>Ödeme Yap</Button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Paketiniz Aktifleştirildi
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
                Gönderiniz için teşekkür ederiz.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}