import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as Trigger,
} from 'components/ui/accordion';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { cn } from 'lib/utils';
const AccordionTrigger = ({ children, value, activeItem, setActiveItem }) => {
  const isOpen = activeItem === value;

  const toggleOpen = () => {
    setActiveItem(isOpen ? null : value);
  };
  return (
    <Trigger arrow onClick={toggleOpen}>
      <div className=" flex gap-2  items-center">
        <div
          className={cn(
            ' h-4 w-4  inline-flex items-center justify-center rounded',
            {
              'bg-primary/10': !isOpen,
              'bg-primary text-primary-foreground': isOpen,
            },
          )}
        >
          {isOpen ? (
            <Icon icon="heroicons:minus" className=" h-5 w-5" />
          ) : (
            <Icon icon="heroicons:plus-small-solid" className=" h-5 w-5" />
          )}
        </div>

        <div> {children}</div>
      </div>
    </Trigger>
  );
};

const CollapseIconAccordion = () => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <Accordion type="single" collapsible className="w-full  space-y-3.5">
      <AccordionItem value="item-1">
        <AccordionTrigger
          value="item-1"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        >
          Accordion 1
        </AccordionTrigger>
        <AccordionContent>
          Lemon drops chocolate cake dummies carrot cake chutzpa chips muffin
          topping. Sesame snaps icing marzipan gummy bears macaroon dragée
          danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
          gummy bears marshmallow pastry pie.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger
          value="item-2"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        >
          Accordion 2
        </AccordionTrigger>
        <AccordionContent>
          Lemon drops chocolate cake dummies carrot cake chutzpa chips muffin
          topping. Sesame snaps icing marzipan gummy bears macaroon dragée
          danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
          gummy bears marshmallow pastry pie..
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger
          value="item-3"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        >
          Accordion 3
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};

export default CollapseIconAccordion;
