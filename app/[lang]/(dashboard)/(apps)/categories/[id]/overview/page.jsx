"use client";
import OverdueTask from "./overdue-task";
import CategoryDeadline from "./category-deadline";
import CategoryProgress from "./category-progress";
import ReportChart from "./report-chart";
import UpcomingDeadline from "./upcoming-deadlines";
import WorksNote from "./works-note";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5 2xl:col-span-5">
          <CategoryDeadline />
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7 2xl:col-span-7">
          <CategoryProgress />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-12">
          <UpcomingDeadline />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="hasten-legend">
                <ReportChart />
              </div>
            </div>
            <div className="col-span-12 md:col-span-12">
              <OverdueTask />
            </div>
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-4">
          <WorksNote />
        </div>
      </div>
    </div>
  );
};

export default Overview;
