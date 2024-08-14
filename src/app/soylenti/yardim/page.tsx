"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Help() {
    return (
        <div>
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
            <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">Sitenin amacı nedir ? </AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">Is it styled?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">Kullanılan Teknolojiler ?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">Kullanılan Teknolojiler ?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">Kullanılan Teknolojiler ?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
            <FooterArea src={"../../logo-white.png"} />
        </div>
    )
}