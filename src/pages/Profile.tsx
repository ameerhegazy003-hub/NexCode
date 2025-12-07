import { useAuth } from "../hooks/useAuth";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { Link } from "react-router-dom";

function Profile() {
    const { user , logout } = useAuth();
    const online = useOnlineStatus();

      if (!user) {
    // بنعرض رسالة بتقوله لازم يسجل دخوله الأول
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">تحتاج لتسجيل الدخول</h2>
          <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول أولاً لعرض ملفك الشخصي</p>
          <Link 
            to="/login" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  // دي بيانات افتراضية (mock data) لإحصائيات اليوزر
  const userStats = {
    completedCourses: 3,
    totalHours: 24,
    certificates: 2,
    currentStreak: 7
  };

  // دي بيانات افتراضية للكورسات الأخيرة اللي اليوزر شافها
  const recentCourses = [
    { id: 1, title: "HTML Basics", progress: 100 },
    { id: 2, title: "CSS Mastery", progress: 75 },
    { id: 3, title: "JavaScript Essentials", progress: 45 }
  ];

  // هنا بنرجع الـ JSX اللي هيترسم على الشاشة
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br from-cyan-900 to-black/95 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header - رأس صفحة البروفايل */}
        <div className=" bg-white dark:bg-black/50 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* صورة البروفايل (أو أول حرف من الاسم) */}
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* اسم اليوزر وحالته */}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-green-200 mb-2">{user.name}</h1>
              <p className="text-gray-200 mb-4">متعلم نشط</p>
              
              {/* حالة الاتصال بالانترنت */}
              <div className="flex items-center justify-center md:justify-end gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {online ? 'متصل' : 'غير متصل'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - شبكة الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/50 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{userStats.completedCourses}</div>
            <div className="text-white/80">دورات مكتملة</div>
          </div>
          
          <div className="bg-black/50 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.totalHours}</div>
            <div className="text-white/80">ساعة تعلم</div>
          </div>
          
          <div className="bg-black/50 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{userStats.certificates}</div>
            <div className="text-white/80">شهادات</div>
          </div>
          
          <div className="bg-black/50 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{userStats.currentStreak}</div>
            <div className="text-white/80">أيام متتالية</div>
          </div>
        </div>

        {/* Recent Courses - الكورسات الأخيرة */}
        <div className="bg-black/50 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-300 mb-6">الدورات الأخيرة</h2>
          
          <div className="space-y-4">
            {/* بنعمل loop على الكورسات الأخيرة عشان نعرضها */}
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div>
                  <h3 className="font-semibold text-white">{course.title}</h3>
                  {/* شريط التقدم الصغير */}
                  <div className="w-48 bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  {/* نسبة التقدم */}
                  <div className="text-sm font-medium text-gray-600">{course.progress}%</div>
                  {/* لينك لمتابعة الكورس */}
                  <Link 
                    to={`/courses/${course.id}`}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    متابعة
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements - الإنجازات */}
        <div className="bg-black/50 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-300 mb-6">الإنجازات</h2>
          
          {/* دي مجرد إنجازات ثابتة كشكل جمالي */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50/90 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm font-medium text-gray-800">أول دورة</div>
            </div>
            
            <div className="text-center p-4 bg-green-50/90 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-medium text-gray-800">متعلم نشط</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50/90 rounded-lg">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-sm font-medium text-gray-800">قارئ شغوف</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50/90 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-medium text-gray-800">سريع التعلم</div>
            </div>
          </div>
        </div>

        {/* Actions - أزرار */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* زرار تصفح الدورات */}
          <Link 
            to="/courses"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            تصفح الدورات
          </Link>
          
          {/* زرار تسجيل الخروج */}
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}

// بنعمل export للصفحة
export default Profile;