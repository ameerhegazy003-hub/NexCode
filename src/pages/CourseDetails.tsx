// بنستدعي useParams عشان نجيب الـ id من الـ URL، و Link عشان نعمل لينكات
import { useParams, Link } from "react-router-dom";
// بنستدعي useReducer و useEffect من رياكت
import { useReducer, useEffect } from "react";
// بنستدعي الـ reducer بتاعنا اللي بيتحكم في حالة التقدم في الكورس
import { ProgressReducer } from "../reducers/ProgressReducer";
// بنستدعي بيانات الكورسات من ملف الـ JSON
import coursesData from "../data/courses.json";
// بنستدعي كومبوننت شريط التقدم
import ProgressBar from "../components/ProgressBar";
// بنستدعي الـ type بتاع الـ Course
import type { Course } from "../types";

// دي صفحة تفاصيل الكورس
function CourseDetails() {
  // بنستخدم useParams hook عشان نجيب الـ id بتاع الكورس من الـ URL
  // مثلا لو الرابط هو /courses/1، الـ id هيبقى '1'
  const { id } = useParams<{ id: string }>();
  // هنا بندور على الكورس اللي الـ id بتاعه مطابق للـ id اللي في الـ URL
  // بنحول الـ id اللي جاي من الـ URL لرقم عشان نقدر نقارنه
  const course: Course | undefined = coursesData.find((c) => c.id === parseInt(id || '0')) as Course | undefined;

  // بنستخدم useReducer عشان ندير الـ state بتاعة التقدم في الكورس
  // progressReducer هو الفانكشن اللي بتحدد إزاي الـ state هيتغير
  // القيمة الابتدائية للـ state هي object فيه array فاضية اسمها completed
  const [progress, dispatch] = useReducer(ProgressReducer, { completed: [] });

  // بنستخدم useEffect عشان نحفظ التقدم في الـ localStorage كل ما يتغير
  useEffect(() => {
    // بنتأكد إن فيه id للكورس
    if (id) {
      // بنخزن الـ progress في الـ localStorage، وبنحط اسم مميز لكل كورس
      localStorage.setItem(`course-${id}-progress`, JSON.stringify(progress));
    }
  }, [progress, id]); // الـ useEffect ده هيشتغل كل ما الـ progress أو الـ id يتغيروا

  // بنستخدم useEffect تاني عشان نحمل التقدم من الـ localStorage أول ما الصفحة تفتح
  useEffect(() => {
    // بنتأكد إن فيه id للكورس
    if (id) {
      // بنجيب التقدم المحفوظ من الـ localStorage
      const savedProgress = localStorage.getItem(`course-${id}-progress`);
      // لو لقينا تقدم محفوظ
      if (savedProgress) {
        // بنحوله من string لـ object
        const parsedProgress = JSON.parse(savedProgress);
        // لو الـ object ده فيه array اسمها completed
        if (parsedProgress.completed) {
          // بنعمل loop على كل محاضرة مكتملة
          parsedProgress.completed.forEach((lectureId: number) => {
            // وبنعمل dispatch لـ action عشان نحدث الـ state بتاعنا ونضيف المحاضرة دي للمكتملين
            dispatch({ type: "COMPLETE-LECTURE", payload: lectureId });
          });
        }
      }
    }
  }, [id]); // الـ useEffect ده هيشتغل مرة واحدة بس لما الـ id يتغير (يعني لما نفتح صفحة كورس جديد)

  // هنا بنعمل شرط، لو ملقيناش الكورس (يعني الـ id اللي في الـ URL غلط)
  if (!course) {
    // بنعرض رسالة خطأ
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">الدورة غير موجودة</h2>
          <p className="text-gray-600 mb-6">الدورة التي تبحث عنها غير موجودة أو تم حذفها</p>
          <Link 
            to="/courses" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            العودة للدورات
          </Link>
        </div>
      </div>
    );
  }

  // دي array ثابتة فيها محاضرات الكورس (كمثال)
  const lectures = [
    { id: 1, title: "مقدمة في الدورة", duration: "15 دقيقة" },
    { id: 2, title: "الأساسيات والمفاهيم", duration: "25 دقيقة" },
    { id: 3, title: "التطبيق العملي", duration: "30 دقيقة" },
    { id: 4, title: "الاختبار النهائي", duration: "20 دقيقة" }
  ];

  // بنحسب عدد المحاضرات اللي خلصت
  const completedCount = progress.completed.length;
  // بنجيب العدد الكلي للمحاضرات
  const totalLectures = lectures.length;

  // هنا بنرجع الـ JSX اللي هيترسم على الشاشة
  return (
    <div className="min-h-screen bg-gradient-to-tl from-black to-cyan-900 py-8">
      <div className="container mx-auto px-4">
        {/* Course Header - رأس صفحة الكورس */}
        <div className="bg-black/60 backdrop-blur rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* الجزء الشمال (صورة الكورس) */}
            <div className="lg:w-1/3">
              <div className={`h-64 text-shadow-lg ${course.title.includes('HTML')?'bg-[url(/html-log-bg.webp)]':
             course.title.includes('CSS')?'bg-[url(./css-log.webp)]':
             course.title.includes('JavaScript')?'bg-[url(/featured-what-is-javascript.jpg)]':
               course.title.includes('React')?'bg-[url(/react-logo.png)]': course.title.includes('Node')?'bg-[url(/node-logo.jpg)]':'bg-[url(/Database-logo.jpg)]'} bg-cover bg-center rounded-xl flex items-center justify-center`}>
              
              </div>
            </div>
            
            {/* الجزء اليمين (تفاصيل الكورس) */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                {/* عنوان الكورس */}
                <h1 className="text-3xl font-bold text-green-100">{course.title}</h1>
                {/* مستوى الكورس (لو موجود) */}
                {course.level && (
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    {course.level === 'beginner' ? 'مبتدئ' :
                     course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </span>
                )}
              </div>
              
              {/* وصف الكورس */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">{course.description}</p>
              
              {/* معلومات إضافية (المدة وعدد المحاضرات) */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {/* مدة الكورس (لو مش موجودة بنعرض قيمة افتراضية) */}
                  {course.duration || "2 ساعة"}
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {/* عدد المحاضرات */}
                  {totalLectures} محاضرة
                </div>
              </div>

              {/* Progress Bar - شريط التقدم */}
              <ProgressBar 
                progress={completedCount} // عدد المحاضرات اللي خلصت
                total={totalLectures} // العدد الكلي للمحاضرات
                showPercentage={true}
                color="green"
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Lectures List - قائمة المحاضرات */}
        <div className="bg-black/60 backdrop-blur rounded-xl shadow-lg py-8 px-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">محاضرات الدورة</h2>
          
          <div className="space-y-4">
            {/* بنعمل loop على المحاضرات عشان نعرضها */}
            {lectures.map((lecture, index) => {
              // بنشوف إذا كانت المحاضرة دي خلصت ولا لأ
              const isCompleted = progress.completed.includes(lecture.id);
              // بنشوف إذا كانت دي المحاضرة الحالية (هنا الـ logic مش كاملة، مجرد مثال)
              const isCurrent = progress.currentLecture === lecture.id;
              
              return (
                <div 
                  key={lecture.id}
                  className={`
                     bg-gray-800 w-full flex items-center justify-between py-6 px-2.5 lg:px-6 rounded-lg border-2 transition-all duration-200
                    ${isCompleted 
                      ? 'bg-green-500/30 border-green-200' // ستايل المحاضرة المكتملة
                      : isCurrent 
                      ? 'bg-blue-50/30 border-blue-200' // ستايل المحاضرة الحالية
                      : 'bg-gray-50/30 border-gray-500 hover:border-gray-300' // ستايل المحاضرة العادية
                    }
                  `}
                >
                  <div className=" flex items-center gap-4">
                    {/* رقم المحاضرة أو علامة صح لو خلصت */}
                    <div className={`
                      w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-white
                      ${isCompleted 
                        ? 'bg-green-500' 
                        : isCurrent 
                        ? 'bg-blue-500' 
                        : 'bg-gray-400'
                      }
                    `}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    
                    {/* عنوان المحاضرة ومدتها */}
                    <div className=" mr-4">
                      <h3 className="text-[10px] lg:text-[14px] font-semibold text-gray-100">{lecture.title}</h3>
                      <p className="text-[8px] lg:text-[12px] text-gray-500">{lecture.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* لو المحاضرة خلصت بنعرض كلمة "مكتمل" */}
                    {isCompleted && (
                      <span className="text-green-600 text-[12px] lg:text-[14px] font-medium">مكتمل</span>
                    )}
                    
                    {/* زرار بدء المحاضرة أو علامة اكتمالها */}
                    <button
                      onClick={() => {
                        // لو المحاضرة لسه مخلصتش
                        if (!isCompleted) {
                          // بنعمل dispatch لـ action عشان نعتبرها مكتملة
                          dispatch({ type: "COMPLETE-LECTURE", payload: lecture.id });
                        }
                      }}
                      disabled={isCompleted} // بنعطل الزرار لو المحاضرة خلصت
                      className={`
                        px-6 py-2 text-[12px] lg:text-[14px] rounded-lg font-medium transition-colors
                        ${isCompleted 
                          ? 'bg-green-100 text-green-700 text-[12px] lg:text-[14px] cursor-not-allowed' // ستايل الزرار المعطل
                          : 'bg-green-600 text-white hover:bg-green-700' // ستايل الزرار العادي
                        }
                      `}
                    >
                      {isCompleted ? 'مكتمل' : 'بدء المحاضرة'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Progress Button - زرار إعادة تعيين التقدم */}
          {/* بنعرض الزرار ده بس لو فيه أي محاضرة خلصت */}
          {completedCount > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => dispatch({ type: "RESET-PROGRESS" })} // لما ندوس عليه بنعمل dispatch لـ action عشان نصفر التقدم
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                إعادة تعيين التقدم
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// بنعمل export للصفحة
export default CourseDetails;