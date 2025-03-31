import { type ChartData } from '@/types';

function generateChartData(): ChartData[] {
  const data: ChartData[] = [];
  for (let i = 0; i <= 100; i += 5) {
    data.push({
      percentile: i,
      students: Math.floor(Math.random() * 10) // Random student count between 0 and 9
    });
  }
  return data;
}

export const chartData: ChartData[] = generateChartData();

export const syllabusData = [
  {
    title: "HTML Tools, Forms, History",
    progress: 80
  },
  {
    title: "Tags & References in HTML",
    progress: 60
  },
  {
    title: "Tables & References in HTML",
    progress: 24
  },
  {
    title: "Tables & CSS Basics",
    progress: 96
  }
];
