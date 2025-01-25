import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const AccordionBorder = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-t dark:border-slate-700 rounded-md   divide-y dark:bg-accent dark:shadow-none  "
    >
      <AccordionItem
        value="item-1"
        className=" shadow-none dark:shadow-none dark:bg-accent   border-b-0 border-x-0  rounded-t"
      >
        <AccordionTrigger>Accordion 1</AccordionTrigger>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className=" shadow-none dark:shadow-none dark:bg-accent  border border-x-0 border-b-0 rounded-none"
      >
        <AccordionTrigger>Accordion 3</AccordionTrigger>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className=" shadow-none dark:shadow-none dark:bg-accent  border border-x-0  rounded-b rounded-t-none"
      >
        <AccordionTrigger>Accordion 3</AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionBorder;
