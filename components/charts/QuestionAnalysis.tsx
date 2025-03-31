"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props {
  correct: number;
  total: number;
}

export default function QuestionAnalysis({ correct, total }: Props) {
  const incorrect = total - correct;
  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: incorrect }
  ];
  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Question Analysis</h3>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {correct}/{total}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        You scored {correct} questions correct out of {total}. However, it still
        needs some improvements.
      </p>
    </div>
  );
}