"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ComparisonGraph from "@/components/charts/ComparisonGraph";
import QuestionAnalysis from "@/components/charts/QuestionAnalysis";
import UpdateScoresModal from "@/components/modals/UpdateScoresModal";
import { chartData, syllabusData } from "@/lib/mockData";
import type { ScoreData } from "@/types";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scoreData, setScoreData] = useState<ScoreData>({
    rank: 1,
    percentile: 30,
    score: 10,
  });

  const handleUpdateScores = (newData: ScoreData) => {
    setScoreData(newData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            {/* Test Information */}
            <div className="flex flex-col items-end md:flex-row md:justify-between md:items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-orange-100 rounded-lg relative overflow-hidden">
                  <Image
                    src="https://tse1.mm.bing.net/th?id=OIP.uOlrFi1pBWUofOrOmba8DgHaHk&pid=Api&P=0&h=180"
                    alt="HTML5 Logo"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-7 md:h-7 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Hyper Text Markup Language
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                  </p>
                </div>
              </div>
              <Button className="w-fit justify-self-start" onClick={() => setIsModalOpen(true)}>Update</Button>
            </div>

            {/* Quick Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4 md:p-6">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Your Rank</p>
                    <p className="text-xl md:text-2xl font-bold">{scoreData.rank}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4 md:p-6">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs md:text-base">%</span>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Percentile</p>
                    <p className="text-xl md:text-2xl font-bold">{scoreData.percentile}%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4 md:p-6">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Correct Answers</p>
                    <p className="text-xl md:text-2xl font-bold">{scoreData.score}/15</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
              {/* Comparison Graph */}
              <div className="lg:col-span-3">
                <ComparisonGraph
                  data={chartData}
                  userPercentile={scoreData.percentile}
                />
              </div>

              {/* Right Side Content */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Syllabus Analysis */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
                    Syllabus-wise Analysis
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    {syllabusData.map((item, index) => {
                      const colors = [
                        "bg-blue-600/20 [&>div]:bg-blue-600",
                        "bg-orange-500/20 [&>div]:bg-orange-500",
                        "bg-red-500/20 [&>div]:bg-red-500",
                        "bg-green-500/20 [&>div]:bg-green-500"
                      ];
                      return (
                        <div key={item.title}>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs md:text-sm font-medium">{item.title}</span>
                            <span className="text-xs md:text-sm text-gray-600">
                              {item.progress}%
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${colors[index]}`}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question Analysis */}
                <QuestionAnalysis correct={scoreData.score} total={15} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <UpdateScoresModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onUpdate={handleUpdateScores}
        initialData={scoreData}
      />
    </div>
  );
}