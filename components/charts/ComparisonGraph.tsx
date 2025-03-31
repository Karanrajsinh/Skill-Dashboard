"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { type ChartData } from "@/types";

interface Props {
  data: ChartData[];
  userPercentile: number;
}

export default function ComparisonGraph({ data, userPercentile }: Props) {
  const averagePercentile = 72;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      if (label === userPercentile) {
        return (
          <div className="bg-white p-3 shadow-lg rounded-lg border">
            <p className="text-sm font-semibold">Your Percentile: {label}%</p>
            <p className="text-sm">Number of Students: {payload[0].value}</p>
          </div>
        );
      }
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="text-sm">Number of Students: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Comparison Graph</h3>
      <div className="h-[300px] -ml-10 md:-ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="percentile" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={userPercentile} stroke="#FF4444" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#1E3A8A"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                // Always return a circle element, but make it invisible when not the user's percentile
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={payload.percentile === userPercentile ? 4 : 0}
                    fill={payload.percentile === userPercentile ? "#FF4444" : "transparent"}
                    stroke={payload.percentile === userPercentile ? "#FF4444" : "transparent"}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        You scored {userPercentile}% percentile which is lower than the average
        percentile {averagePercentile}% of all the engineers who took this
        assessment.
      </p>
    </div>
  );
}