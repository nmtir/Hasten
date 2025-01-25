"use client";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { ScrollArea } from "components/ui/scroll-area";
import React from "react";
import { Plus } from "lucide-react";

const CategoryForm = (cn, btnCn) => {
  return (
    <Dialog>
      <DialogTrigger asChild>

        <Button className={btnCn}>
          <Plus className={cn} />
          Add Category</Button>
      </DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            Add Category
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="h-[290px]">
            <ScrollArea className="h-full">
              <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input type="text" placeholder="Enter category name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name</Label>
                  <Input type="text" placeholder="Enter last name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Choose Color</Label>
                  <Input type="color" className="p-0 border-none rounded-md" defaultValue="#6338f0" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Set Password</Label>
                  <Input type="number" placeholder="Your phone number" />
                </div>
                <div className="col-span-2 flex  items-center gap-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-default-700 cursor-pointer"
                  >
                    You agree to our Terms, Privacy Policy. You may receive SMS
                    notifications from us and can opt out at any time.
                  </Label>
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className=" flex justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button">Create Category </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
