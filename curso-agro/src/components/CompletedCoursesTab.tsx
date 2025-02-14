const CompletedCoursesTab = () => {
    const courses = [
      { title: "Agricultura Orgânica", completionDate: "05/02/2024" },
      { title: "Uso de Drones na Agricultura", completionDate: "12/03/2024" },
    ];
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-[#F37826]">Cursos Concluídos</h3>
        <ul className="mt-3">
          {courses.map((course, index) => (
            <li key={index} className="text-gray-600 text-sm mb-2">
              ✅ {course.title} - <span className="text-black">{course.completionDate}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CompletedCoursesTab;
  