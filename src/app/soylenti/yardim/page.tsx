"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainLayout from "@/components/v2/MainLayout/MainLayout";

export default function Help() {
  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1">
          <div>
            <div className="mr-2 mb-2 ml-2 mt-12">
              <h3 className="text-3xl font-bold text-neutral-600 drop-shadow-md backdrop-blur-sm w-fit mb-6">
                Yardım
              </h3>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">
                      Sitenin amacı nedir ?{" "}
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">
                      Is it styled?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Non, ratione consequuntur neque pariatur veniam ut dolor
                      voluptatum repudiandae quia doloremque autem, soluta nihil
                      recusandae exercitationem commodi dignissimos! Harum,
                      error doloremque!
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">
                      Kullanılan Teknolojiler ?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Iure culpa rem quisquam tenetur ipsa porro. Saepe omnis
                      atque officiis culpa ut tempora minima facilis, quasi
                      mollitia. Earum amet officia magni!
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">
                      Kullanılan Teknolojiler ?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sequi, esse porro. Odio odit velit quas, architecto illum
                      quidem totam iure perferendis maxime error fugiat
                      voluptatem aperiam a nisi consectetur omnis?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-gray-700 drop-shadow hover:no-underline hover:text-gray-900 transition-all">
                      Kullanılan Teknolojiler ?
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Dicta recusandae officia molestias sed neque? Tenetur
                      asperiores ipsam nobis laboriosam optio laborum earum
                      enim, reprehenderit repellendus ullam magni cumque
                      nesciunt consequatur?
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
