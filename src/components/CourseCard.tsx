import { Link } from "react-router-dom";

import type { CourseProps } from "../types";


function CourseCard({course}:CourseProps){

    return(

        <div className=" bg-white/10 rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1  overflow-hidden bg-white flex flex-col">
         <div className={`flex h-58 text-6xl text-shadow-lg items-center justify-center ${course.title.includes('HTML')?'bg-[url(/html-log-bg.webp)]':
             course.title.includes('CSS')?'bg-[url(./css-log.webp)]':
             course.title.includes('JavaScript')?'bg-[url(/featured-what-is-javascript.jpg)]':
               course.title.includes('React')?'bg-[url(/react-logo.png)]': course.title.includes('Node')?'bg-[url(/node-logo.jpg)]':'bg-[url(/Database-logo.jpg)]'} bg-cover bg-center relative z-0 bg-gradient-to-br from-green-400/50 to-blue-500/50 `}>
          
         </div>
         <div className="p-6 bg-black/10 backdrop-blur-lg h- ">
          <div className="w-full flex justify-between mb-2 ">
            <h3 className="text-white text-xl font-bold mb-2">{course.title}</h3>
            {course.level && (
                <span className = {`text-normal  rounded-[20px] px-2 py-1 h-fit
                 ${course.level === 'beginner'?'bg-green-200 text-green-500':
                 course.level === 'intermediate'?'bg-orange-200 text-orange-500':'bg-red-200 text-red-500'}`} >

                     {course.level === 'beginner'?'مبتدئ':
                       course.level === 'intermediate'?'متوسط':'متقدم'}   

                </span>
            )}
          </div>
          <p className="text-white/80 mb-2 ">{course.description}</p>
          {course.duration && (
            <div className="text-gray-300 flex items-center gap-1 text-sm">
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {course.duration}
            </div>
          )}
          <Link to={`/Courses/${course.id}`} className="mb-4 px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 inline-block text-center">
          ابدأ التعلم
          </Link>

         </div>
        </div>
    )
}
export default CourseCard;

