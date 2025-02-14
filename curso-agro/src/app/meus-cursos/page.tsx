"use client";
import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([
    { title: "Drone Agrícola T30", progress: 60 },
    { title: "Trator 8R", progress: 20 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold">Meus Cursos</h1>

      <div className="mt-4 space-y-3">
        {enrolledCourses.map((course, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                <div className="h-2 bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
            <button className="bg-primary text-white p-2 rounded-full hover:bg-green-700 transition">
              <PlayIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
