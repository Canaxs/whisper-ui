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
import { MenusTR , Menus} from '@/lib/menuEnum';
import { Link } from '@radix-ui/react-navigation-menu';

export default function Navigation() {

    function menusGet(num) {
        const str = MenusTR[num];
        return str?.substring(0,1).toUpperCase() + str?.substring(1,str.length);
    }

    return  (
        <div className='mt-3'>
            <NavigationMenu className='w-full'>
                <NavigationMenuList className="max-lg:mt-2">
                <Carousel className="w-full">
                    <CarouselContent>
                    {Array.from({ length: MenusTR.__LENGTH }).map((_, index) => (
                        <CarouselItem key={index} className="max-2xl:basis-[20%] 2xl:basis-[14%] max-sm:basis-[32%]">
                        <NavigationMenuItem className="block">
                        <Link href={"/kategori/"+Menus[index]}>
                            <NavigationMenuTrigger className="w-full text-[14px] font-normal">{ menusGet(index) }</NavigationMenuTrigger>
                        </Link>
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