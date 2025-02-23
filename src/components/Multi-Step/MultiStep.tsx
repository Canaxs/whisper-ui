'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import StepCard from '../Step-Card/StepCard'
import { Button } from '../ui/button'
import { useToast } from "../ui/use-toast"
import { current } from '@reduxjs/toolkit'
import { updatePlan } from '@/api/apiCalls'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

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
  const [selectPlan , setSelectPlan] = useState("FREE");
  const [isPayment , setIsPayment] = useState(false);
  const delta = currentStep - previousStep

  const { toast } = useToast();

  const router = useRouter();

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

  const payment = () => {
    if(watch('cardName').length > 0 && 
      watch('cardNumber').length > 0  && 
      watch('cvc').length > 0 && 
      watch('expirationDate').length > 0 &&
      !isPayment) {
        setIsPayment(true);
        toast({
          variant: "success",
          title: "Ödeme Yapıldı",
          description: "Güle Güle Kullanın",
        })
    }
    else {
      if(isPayment) {
        toast({
          variant: "destructive",
          title: "Ödeme Zaten Yapıldı",
          description: "",
        })
      }
      else {
        toast({
          variant: "destructive",
          title: "Lütfen Kart Bilgilerini Eksiksiz Şekilde Doldurun",
          description: "Tekrar deneyiniz.",
        })
      }
    }
  }

  const confirm = () => {
    if(isPayment) {
      const updatePlanReq = {
        planName: selectPlan
      }
      try {
        updatePlan(updatePlanReq,Cookies.get("token")).then((res) => {
          Cookies.set("isSubscribe",true);
          toast({
            variant: "success",
            title: "Plan Aktifleştirildi",
            description: "Güle Güle Kullanın",
          })
        }, (exception) => {
          toast({
            variant: "destructive",
            title: "Plan Oluşturulurken Hata ile Karşılaşıldı",
            description: "Tekrar deneyiniz.",
          })
        })
        next();
        setTimeout(() => {
          toast({
            variant: "success",
            title: "Yönlendiriliyorsunuz...",
            description: "Bekleyin",
          })
        },1000)
        router.push("/")
      }
      catch(e) {
      }
    }
    else {
      toast({
        variant: "destructive",
        title: "Lütfen Ödeme Yapın",
        description: "Ödeme işlemi gerçekleştikten sonra tekrar deneyiniz.",
      })
    }

  }

  const clickPlan = (str,str2) => {
    setSelectPlan(str);
    toast({
        variant: "success",
        title: "Plan Seçildi",
        description: str2,
    })
  }

  return (
    <section className='absolute inset-0 flex flex-col p-24 bg-gradient-to-r from-gray-100 to-gray-100 '>
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
            <h2 className='text-2xl font-semibold leading-7 text-gray-800 drop-shadow-md'>
              Paket Seçimi
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              <label>Söylenti</label> Hoşgeldin
            </p>
            <div className='mt-10 flex'>
                <div className='w-1/4 m-3 ml-0'>
                    <StepCard title={"Ücretsiz Plan"} classProps={selectPlan != "FREE" ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all w-full h-64" : "hover:shadow-lg cursor-pointer transition-all w-full h-64 bg-gray-100"} posts={"5"} money={false} exclusive={false} wage={"0"} onClick={() => clickPlan("FREE","Ücretsiz Plan")} />
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Başlangıç Plan"} classProps={selectPlan != "BASIC" ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all w-full h-64" : "hover:shadow-lg cursor-pointer transition-all w-full h-64 bg-gray-100"} posts={"20"} money={false} exclusive={false} wage={"35"} onClick={() => clickPlan("BASIC","Başlangıç Plan")} />
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Standart Plan"} classProps={selectPlan != "STANDARD" ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all w-full h-64" : "hover:shadow-lg cursor-pointer transition-all w-full h-64 bg-gray-100"} posts={"35"} money={true} exclusive={false} wage={"50"} onClick={() => clickPlan("STANDARD","Standart Plan")} />
                </div>
                <div className='w-1/4 m-3'>
                    <StepCard title={"Premium Plan"} classProps={selectPlan != "PREMIUM" ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all w-full h-64" : "hover:shadow-lg cursor-pointer transition-all w-full h-64 bg-gray-100"} posts={"Sınırsız"} money={true} exclusive={true} wage={"100"} onClick={() => clickPlan("PREMIUM","Premium Plan")} />
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
                    <input type='text' id='street' {...register('cardName')} autoComplete='street-address' disabled={isPayment}
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
                    <input type='text' id='street' {...register('cardNumber')} autoComplete='street-address' disabled={isPayment}
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
                    <input type='text' id='street' {...register('expirationDate')} autoComplete='street-address' disabled={isPayment}
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
                    <input type='text' id='street' {...register('cvc')} autoComplete='street-address' disabled={isPayment}
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
                <Button className='bg-gray-600' onClick={payment}>Ödeme Yap</Button>
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

          <button type='button' onClick={prev} disabled={currentStep === 0} 
          className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='h-6 w-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5'/>
            </svg>
          </button>

          <button type='button' onClick={next} disabled={currentStep === steps.length - 1}
            className={currentStep < 1 ? 'rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50' : 'hidden'}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='h-6 w-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5'/>
            </svg>
          </button>

          <button type='button' onClick={confirm} className={currentStep === 1 ? 'rounded bg-white px-2 py-1 text-sm font-semibold text-green-900 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-sky-50' : 'hidden'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill='#40C057' className='w-6 h-6' viewBox="0 0 48 48" >
              <path d="M 24 4 C 20.521338 4 17.238396 4.8910557 14.384766 6.4589844 A 1.50015 1.50015 0 1 0 15.830078 9.0878906 C 18.254448 7.7558193 21.032662 7 24 7 C 33.406292 7 41 14.593708 41 24 C 41 28.198158 39.485148 32.025304 36.970703 34.990234 A 1.50015 1.50015 0 1 0 39.259766 36.929688 C 42.215321 33.444617 44 28.921842 44 24 C 44 12.972292 35.027708 4 24 4 z M 9.1269531 11.535156 A 1.50015 1.50015 0 0 0 7.8769531 12.164062 C 5.4407728 15.476792 4 19.577884 4 24 C 4 35.027708 12.972292 44 24 44 C 26.602207 44 29.094407 43.501276 31.378906 42.59375 A 1.50015 1.50015 0 1 0 30.271484 39.806641 C 28.331983 40.577115 26.219793 41 24 41 C 14.593708 41 7 33.406292 7 24 C 7 20.228116 8.2231021 16.758677 10.294922 13.941406 A 1.50015 1.50015 0 0 0 9.1269531 11.535156 z M 30.351562 16.212891 C 29.063562 16.212891 27.798859 16.73825 26.880859 17.65625 L 22.873047 21.664062 L 21.558594 20.349609 C 20.640594 19.431609 19.374891 18.904297 18.087891 18.904297 C 17.097891 18.904297 16.155328 19.207297 15.361328 19.779297 C 13.762328 20.931297 12.9925 22.965375 13.5625 24.984375 C 13.7895 25.788375 14.264469 26.50275 14.855469 27.09375 L 19.380859 31.617188 C 20.161859 32.398187 21.159859 32.966516 22.255859 33.103516 C 23.751859 33.290516 25.193328 32.793 26.236328 31.75 L 27.414062 30.570312 C 28.000062 29.984313 28.000062 29.034219 27.414062 28.449219 C 26.828063 27.863219 25.879922 27.863219 25.294922 28.449219 L 24.113281 29.630859 C 23.771281 29.972859 23.323047 30.144531 22.873047 30.144531 C 22.424047 30.144531 21.974813 29.972859 21.632812 29.630859 L 16.890625 24.886719 C 16.136625 24.133719 16.211234 22.865844 17.115234 22.214844 C 17.407234 22.004844 17.745891 21.90625 18.087891 21.90625 C 18.577891 21.90625 19.0735 22.108656 19.4375 22.472656 L 22.166016 25.201172 C 22.361016 25.396172 22.617047 25.494141 22.873047 25.494141 C 23.129047 25.494141 23.385078 25.396172 23.580078 25.201172 L 29.001953 19.779297 C 29.366953 19.414297 29.862516 19.212891 30.353516 19.212891 C 30.695516 19.212891 31.034172 19.310531 31.326172 19.519531 C 32.230172 20.169531 32.304781 21.438406 31.550781 22.191406 L 29.412109 24.330078 C 28.826109 24.916078 28.826109 25.866172 29.412109 26.451172 C 29.998109 27.037172 30.948203 27.037172 31.533203 26.451172 L 33.585938 24.400391 C 34.175937 23.810391 34.649953 23.094062 34.876953 22.289062 C 35.446953 20.269063 34.676172 18.234984 33.076172 17.083984 C 32.283172 16.513984 31.340563 16.212891 30.351562 16.212891 z"></path>
            </svg>
          </button>

        </div>
      </div>
    </section>
  )
}