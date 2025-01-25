"use client"
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { upcomingDeadlineData } from "./data"
import { Progress } from "components/ui/progress";

const columns = [
  {
    key: "task name",
    label: "task name",
  },
  {
    key: "deadline",
    label: "deadline",
  },
  {
    key: "Percentage",
    label: "percentage",
  }
];

const UpcomingDeadline = () => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-0">
        <CardTitle>Upcoming Deadlines</CardTitle>
        <Button
          type="button"
          color="secondary"
          variant="soft"
        >View all</Button>
      </CardHeader>
      <CardContent className="px-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-default-200">
            <TableRow>
              {
                columns.map(column => (
                  <TableHead
                    key={column.key}
                    className="text-sm font-semibold text-default-800 rtl:first:pl-7">
                    {column.label}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingDeadlineData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-default-100"
              >
                <TableCell
                  className="text-sm font-medium text-default-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-[181px]">{item.task}</TableCell>
                <TableCell
                  className="text-sm font-medium text-default-600 whitespace-nowrap">{item.deadline}</TableCell>
                <TableCell className="min-w-[120px] text-sm font-medium text-default-600 last:text-end">
                  <Progress value={item.percentage} size="lg" showValue />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadline;
