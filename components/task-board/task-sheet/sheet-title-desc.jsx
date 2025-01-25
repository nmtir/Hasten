"use client";
import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Checkbox } from "@nextui-org/react";
import { updateTask } from "config/category-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "components/ui/textarea";
import { Input } from "components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";


const schema = z.object({
  title: z.string().min(1, {
    message: "What is your task title? ???",
  }),
  desc: z.string().optional(),
  completed: z.boolean().optional(),
});
const SheetTitleDesc = ({ task, taskId }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
    const newData = {
      ...task,
      title: data.title,
      desc: data.desc,
      completed: data.completed,
    };
    updateTask(taskId, newData)
      .then(() => console.log("update data"))
      .catch(error => console.log(error));
    setIsFocused(false);
  };
  const handleChanged = (b) => {
    setCompleted(b);
    setIsFocused(true);

  }

  React.useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("desc", task.desc || "");
      setValue("completed", task.completed);
    }
  }, [task, setValue]);
  return (
    <form
      className="py-5 px-6 pb-8 border-b border-default-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-1 mb-2">
        <TooltipProvider delayDuration={1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Checkbox
                {...register("completed")} isSelected={completed} onValueChange={handleChanged} className="w-4 h-4"
                color="secondary" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark As Completed</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        <Input
          type="text"
          {...register("title")}
          className="h-7 w-full border border-transparent text-sm font-medium text-default-900 rounded-sm focus:border focus:border-default-200 focus:outline-none px-1 focus:bg-default-50 bg-card"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {errors.title && (
        <div className=" text-destructive">{errors.title.message}</div>
      )}

      <div className="flex gap-1 relative">
        <Textarea
          className="w-full h-16 border-none border border-transparent focus:border-default-200 focus:outline-none p-1 text-sm text-default-700 peer bg-card focus:bg-default-50"
          placeholder="Add Task Descriptions"
          rows="1"
          {...register("desc")}
          onInput={handleFocus}
          onBlur={handleBlur}
          style={{ resize: "none", overflowY: "hidden" }}
        />
      </div>
      <div className="flex justify-end">
        {isFocused && (
          <Button className=" text-xs h-6 py-0" type="submit">
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default SheetTitleDesc;
