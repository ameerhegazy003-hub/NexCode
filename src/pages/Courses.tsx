import { useState , useEffect } from "react";
import CourseCard from "../components/CourseCard";
import coursesData from "../data/courses.json";
import type { Course } from "../types";

function Courses(){
    const [courses,setCourses]= useState<Course[]>([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [filteredCourses,setFilteredCourcses] = useState<Course[]>([]);
    const [selectedLevel,setSelectedLevel] = useState<string>("all");

    useEffect(()=>{
      setCourses(coursesData as Course[]);
      setFilteredCourcses(coursesData as Course[]);
    },[])

    useEffect(()=>{
      let filtered = courses;

      if(searchTerm){
        filtered = filtered.filter(course=>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      if(selectedLevel !== "all" ){
        filtered = filtered.filter(course=> course.level === selectedLevel );
      }

      setFilteredCourcses(filtered);

    },[searchTerm,selectedLevel,courses])

    
    return(
        <div className="h-auto w-full p-8 bg-gradient-to-tl from-black to-cyan-900 relative z-0 py-8">
      <div className="container mx-auto px-4">
        {/* Header - رأس الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-green-200 mb-4">دوراتنا التعليمية</h1>
          <p className=" lg:text-xl text-green-200 max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من الدورات المصممة لمساعدتك في رحلة التعلم
          </p>
        </div>

        {/* Filters - فلاتر البحث */}
        <div className="bg-white/20 backdrop-blur rounded-xl text-white shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* حقل البحث */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="ابحث في الدورات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // كل ما اليوزر يكتب، بنحدث الـ state بتاع كلمة البحث
                className="w-full px-4 py-3 text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {/* قائمة اختيار المستوى */}
            <div className="md:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)} // كل ما اليوزر يختار مستوى، بنحدث الـ state بتاع المستوى المختار
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option className="bg-gray-400" value="all">جميع المستويات</option>
                <option className="bg-gray-400" value="beginner">مبتدئ</option>
                <option className="bg-gray-400" value="intermediate">متوسط</option>
                <option className="bg-gray-400" value="advanced">متقدم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count - عدد النتائج */}
        <div className="mb-6">
          <p className="text-white/60">
            عرض {filteredCourses.length} من {courses.length} دورة
          </p>
        </div>

        {/* Courses Grid - شبكة عرض الكورسات */}
        {/* هنا بنعمل شرط، لو مفيش كورسات بعد الفلترة */}
        {filteredCourses.length === 0 ? (
          // بنعرض رسالة بتقول إن مفيش نتايج
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">لم نجد دورات</h3>
            <p className="text-gray-600 mb-6">جرب البحث بكلمات مختلفة أو اختر مستوى آخر</p>
            {/* زرار لإعادة تعيين الفلاتر */}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLevel("all");
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        ) : (
          // لو فيه كورسات، بنعرضها في شبكة
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* بنعمل loop على الكورسات المفلترة وبنعرض كارت لكل كورس */}
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  
        
    );
}
export default Courses