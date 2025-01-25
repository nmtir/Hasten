import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const AccordionWithOutArrow = () => {
  return (
    <Accordion type="single" collapsible className="w-full  space-y-3.5">
      <AccordionItem value="item-1">
        <AccordionTrigger arrow>Accordion 1</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger arrow>Accordion 2</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger arrow>Accordion 3</AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionWithOutArrow;
