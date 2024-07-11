import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from '@/components/ui/navigation-menu';
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from '@/components/ui/carousel';

export default function Navigation() {

    return  (
        <div className='mt-3'>
            <NavigationMenu className='w-full'>
                <NavigationMenuList className="max-lg:mt-2">
                <Carousel className="w-full">
                    <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className="max-2xl:basis-[20%] 2xl:basis-[15%] max-sm:basis-[32%]">
                    <NavigationMenuItem className="block">
                        <NavigationMenuTrigger className="w-full text-[12px] font-normal">deneme</NavigationMenuTrigger>
                    </NavigationMenuItem>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                </Carousel>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}