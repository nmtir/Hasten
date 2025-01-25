"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";

export function DataTableRowActions() {

  return (
    <div className="flex justify-end gap-3 items-center">
      <div>

      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="flex h-6 w-6 rounded-full bg-default-100 hover:bg-default-200   p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4 text-default-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
