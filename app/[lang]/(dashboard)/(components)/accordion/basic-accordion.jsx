import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const BasicAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full  space-y-3.5">
      <AccordionItem value="item-1">
        <AccordionTrigger>Accordion 1</AccordionTrigger>
        <AccordionContent>
          Lemon drops chocolate cake dummies carrot cake chutzpa chips muffin
          topping. Sesame snaps icing marzipan gummy bears macaroon dragée
          danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
          gummy bears marshmallow pastry pie.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Accordion 2</AccordionTrigger>
        <AccordionContent>
          Lemon drops chocolate cake dummies carrot cake chutzpa chips muffin
          topping. Sesame snaps icing marzipan gummy bears macaroon dragée
          danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
          gummy bears marshmallow pastry pie.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Accordion 3</AccordionTrigger>
        <AccordionContent>
          Lemon drops chocolate cake dummies carrot cake chutzpa chips muffin
          topping. Sesame snaps icing marzipan gummy bears macaroon dragée
          danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
          gummy bears marshmallow pastry pie.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BasicAccordion;
