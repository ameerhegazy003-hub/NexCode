import { useLocation,Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



interface SideBarProps {
    isOpen:boolean;
    onClose:()=>void;
}
 function SideBar({isOpen,onClose}:SideBarProps){
    const location = useLocation();
    const { user, logout } = useAuth();

      const menuItems = [
    { path: "/", label: "الرئيسية", icon: "🏠" },
    { path: "/courses", label: "الدورات", icon: "📚" },
    { path: "/profile", label: "الملف الشخصي", icon: "👤" },
  ];

  const isActive = (path:string)=>location.pathname === path;

   return (
    // بنستخدم Fragment عشان نرجع أكتر من عنصر
    <>
      {/* Overlay - دي الشاشة السودا الشفافة اللي بتظهر ورا السايد بار على الموبايل */}
      {/* بنعمل شرط، لو السايد بار مفتوح، اعرضها */}
      {isOpen && (
        <div 
          className="fixed h-screen bg-black bg-opacity-50 z-40 lg:hidden" // lg:hidden بيخليها تظهر على الشاشات الصغيرة بس
          onClick={onClose} // لما ندوس عليها، السايد بار بيقفل
        />
      )}

      {/* Sidebar - ده السايد بار نفسه */}
      <div className={`
         w-[300px]  h-screen fixed top-0 right-[-300px]  bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-[-300px]'} // لو مفتوح بيظهر، لو مقفول بيختفي يمين الشاشة
        lg:translate-x-0 lg:fixed top-[70px] left-0 lg:shadow-none // على الشاشات الكبيرة بيفضل ثابت ومكانه الطبيعي
      `}>
        {/* ده المحتوى اللي جوه السايد بار */}
        <div className="p-6">
          {/* Header - رأس السايد بار */}
          <div className="flex items-center justify-between mb-8">
            {/* لوجو الموقع */}
            <h2 className="text-xl font-bold text-green-300">NexCode</h2>
            {/* زرار إغلاق السايد بار (بيظهر على الموبايل بس) */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-200 hover:text-gray-700"
            >
              {/* أيقونة الإغلاق (علامة X) */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info - معلومات اليوزر */}
          {/* بنعمل شرط، لو اليوزر عامل تسجيل دخول، اعرض معلوماته */}
          {user && (
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center">
                {/* صورة اليوزر (أو أول حرف من اسمه) */}
                <div className="w-10 h-10 m-2 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {/* اسم اليوزر وحالته */}
                <div className="mr-3">
                  <p className="font-medium text-green-100">{user.name}</p>
                  <p className="text-sm text-green-500">متعلم نشط</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - لينكات التنقل */}
          <nav className="space-y-2">
            {/* هنا بنعمل loop على عناصر القائمة اللي عرفناها فوق عشان نعرضها */}
            {menuItems.map((item) => (
              <Link
                key={item.path} // لازم كل عنصر في الـ loop ياخد key مميز
                to={item.path} // الرابط اللي اللينك هيودي عليه
                onClick={onClose} // لما ندوس على أي لينك، السايد بار بيقفل (عشان الموبايل)
                className={`
                  text-green-200 flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${isActive(item.path) // هنا بنستخدم الفانكشن اللي عملناها عشان ندي ستايل مختلف للينك النشط
                    ? 'bg-green-100 text-green-700 border-r-4 border-green-500' // ستايل اللينك النشط
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' // ستايل اللينك العادي
                  }
                `}
              >
                {/* أيقونة اللينك */}
                <span className="text-xl ml-3">{item.icon}</span>
                {/* اسم اللينك */}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Stats - إحصائيات سريعة */}
          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h3 className="font-medium text-green-300 mb-3">إحصائيات سريعة</h3>
            <div className="space-y-2">
              {/* دي مجرد بيانات ثابتة كشكل جمالي، ممكن بعدين تبقى ديناميكية */}
              <div className="flex justify-between text-sm">
                <span className="text-green-100">الدورات المكتملة</span>
                <span className="font-medium text-green-600">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-100">المحاضرات المشاهدة</span>
                <span className="font-medium text-blue-600">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-100">النقاط المكتسبة</span>
                <span className="font-medium text-yellow-600">450</span>
              </div>
            </div>
          </div>
            <button onClick={logout} className={`${user?'block':'hidden'} text-white bg-red-500 w-full mt-3 py-1 px-8 border border-red-500 rounded-[10px]`}>
                تسجيل الخروج
            </button>
        </div>
      </div>
    </>
  );
}
export default SideBar;