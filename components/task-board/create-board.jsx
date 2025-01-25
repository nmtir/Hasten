import React, { useTransition } from "react";

import { toast } from "react-hot-toast";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "lib/utils";
import { useForm } from "react-hook-form";

import { createCategoryBoard, updateBoard } from "config/category-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,

} from "components/ui/dialog";

import { X } from "lucide-react";
import { Label } from "components/ui/label";

const boardSchema = z.object({
  name: z.string().min(2, { message: "Your name is invalid." }),
  color: z.string().optional(),
});
const CreateBoard = ({ categoryId, open, onClose, board, boardId }) => {
  const [startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(boardSchema),
  });
  const onSubmit = (data) => {
    const updatedData = {
      ...board,
      name: data.name,
      color: data.color,
    };
    if (board) {
      startTransition(() => {
        updateBoard(boardId, updatedData).then(() => toast.success("Successfully update")).catch(error => console.log(error));

      });
    } else {
      startTransition(() => {
        createCategoryBoard(data, categoryId).then(() => toast.success("Successfully added")).catch(error => console.log(error));
      });
    }
    onClose();
    reset();
  };
  React.useEffect(() => {
    setValue("name", board?.name || "");
    setValue("color", board?.color || "#6338f0");
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className="flex-row justify-between items-center py-0 ">
          <DialogTitle className="text-default-900"></DialogTitle>
          <DialogClose asChild>
            <div
              type="button"
              size="icon"
              className="w-7 h-7 bg-transparent hover:bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5 text-default-900" />
            </div>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="py-0 pl-1 -mt-2">
          <form className=" space-y-5">
            <div>
              <Label htmlFor="boradName" className="text-default-600 mb-1.5">
                Board Name
              </Label>
              <Input
                type="text"
                {...register("name")}
                name="boardName"
                className={cn("", {
                  "border-destructive focus:border-destructive": errors.name,
                })}
              />
            </div>
            <div>
              <Label htmlFor="bordColor" className="text-default-600 mb-1.5">
                Choose Color
              </Label>
              <Input
                type="color"
                {...register("color")}
                name="boardColor"
                className="p-0 border-none rounded-md"
                defaultValue="#6338f0"
              />
            </div>
            <div className="flex justify-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  color="destructive"
                  variant="soft"
                  className="min-w-[136px]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSubmit(onSubmit)} form="createBoard"
                      className="min-w-[136px]">Save</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
