import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const AccordionSubtitle = () => {
  return (
    <Accordion type="single" collapsible className="w-full  space-y-3.5">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-col  text-start">
            <div>Accordion 1</div>
            <div className=" text-xs  text-default-600  mt-1">
              Press to expand
            </div>
          </div>
        </AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex flex-col  text-start">
            <div>Accordion 2</div>
            <div className=" text-xs  text-default-600  mt-1">
              Press to expand
            </div>
          </div>
        </AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex flex-col  text-start">
            <div>Accordion 3</div>
            <div className=" text-xs  text-default-600  mt-1">
              Press to expand
            </div>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSubtitle;
