import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeFrameSelectorProps {
  selectedTimeFrame: "day" | "week" | "month" | "year";
  onChange: (value: "day" | "week" | "month" | "year") => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  selectedTimeFrame,
  onChange,
}) => {
  return (
    <Select value={selectedTimeFrame} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select time frame" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Day</SelectItem>
        <SelectItem value="week">Week</SelectItem>
        <SelectItem value="month">Month</SelectItem>
        <SelectItem value="year">Year</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeFrameSelector;
