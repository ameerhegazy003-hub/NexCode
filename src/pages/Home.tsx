import {Link} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';   


function Home(){

     const { user } = useAuth(); 

    return(
        <><div className="h-auto w-full p-8 bg-[url('/main-bg.webp')] bg-cover bg-center relative z-0">
            <div className="absolute inset-0 bg-teal-100/20 dark:bg-gradient-to-b from-black to-teal-100/20 opacity-50 z-1"></div>
            <div className="relative  lg:mt-8 flex flex-col lg:gap-5 p-3 justify-center items-center h-[20vh] lg:h-[30vh] space-y-6 lg:mb-6 z-10">
                <h1 className="text-xl flex items-center lg:text-5xl font-bold text-green-200 mb-1 lg:mb-4" style={{ textShadow: '0 4px 10px rgba(1, 52, 14, 0.45)' }}><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    
        <linearGradient id="smallNGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC"/>
            <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>

        <filter id="smallNShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18"/>
        </filter>
  </defs>

  <g filter="url(#smallNShadow)">

    <path d="M32 12L50 22V42L32 52L14 42V22L32 12Z"
          fill="url(#smallNGrad)"
          rx="4"/>


        <path d="M22 42V22L42 42V22" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
  </g>
</svg>
 <span className='mr-4 text-teal-400 text-shadow-white'> NexCode </span>  مرحباً بك في</h1>
                <p className="text-green-200 text-[10px] lg:text-[16px]  lg:font-normal w-full lg:w-[40%] text-center " style={{ textShadow: '0 2px 6px rgba(1, 52, 14, 0.35)' }}>
                    "ابدأ رحلتك في تعلم البرمجة معنا! اكتشف دوراتنا المتنوعة وتعلم المهارات التي تحتاجها لتصبح مطور محترف"</p>
            </div>

            {user ? (

                <div className='mb-8 flex flex-col w-full items-center justify-center relative z-10'>
                    <p className="text-white text-md lg:text-lg font-semibold w-full text-center mb-4">
                        مرحبا بك , {user.name}!👋
                    </p>

                    <Link to="/Courses" className="bg-gradient-to-r from-teal-700 to-teal-600  text-white px-20 py-2.5 lg:px-6 lg:py-3 rounded-[12px] text-md lg:text-lg font-semibold transition-all ">
                        ابدأ التعلم الآن
                    </Link>
                </div>
            ) : (
                <div className="space-x-1 text-center flex flex-col lg:flex-row justify-center gap-2 mb-8 relative z-10">
                    <Link to="/Login" className="bg-gradient-to-r from-teal-700 to-teal-600 border-l-2  border-green-800 text-white px-20 py-2.5 lg:px-6 lg:py-3 rounded-[12px] text-md lg:text-lg font-semibold hover:bg-green-600 transition-all">
                         تسجيل الدخول للبدء
                    </Link>

                    <Link to="/Courses" className="bg-gradient-to-r from-teal-700 to-teal-600 border-l-2 border-green-800 text-white px-20 py-2.5 lg:px-6 lg:py-3 rounded-[12px] text-md lg:text-lg font-semibold hover:bg-green-600 transition-all">
                        تصفح الدورات
                    </Link>
                </div>



            )}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 px-6 relative z-10">
                {/* ميزة 1: دورات شاملة */}
               
                <div className="bg-gradient-to-br from-green-300/50 to-teal-400 backdrop-blur-lg p-8 rounded-xl border border-green-300 shadow-lg text-center hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4 ">📚</div>
                    <h3 className="text-xl font-bold mb-3 text-black">دورات شاملة</h3>
                    <p className="text-gray-800">
                        تعلم HTML، CSS، JavaScript والمزيد من التقنيات الحديثة مع دورات مصممة خصيصاً للمبتدئين
                    </p>
                
                </div>

                {/* ميزة 2: تتبع التقدم */}
                <div className="bg-gradient-to-br from-green-300/50 to-teal-400 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-green-300 text-center hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold mb-3 text-black">تتبع التقدم</h3>
                    <p className="text-gray-800">
                        راقب تقدمك في التعلم واحصل على شهادات إنجاز عند إكمال كل دورة
                    </p>
                </div>

                {/* ميزة 3: مشاريع عملية */}
                <div className="bg-gradient-to-br from-green-300/50 to-teal-400 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-green-300 text-center hover:shadow-xl transition-shadow">
                    <div className="text-5xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-3 text-black">مشاريع عملية</h3>
                    <p className="text-gray-800">
                        طبق ما تعلمته في مشاريع حقيقية وابنِ محفظة أعمال متميزة
                    </p>
                </div>
            </div><div className="mb-16 px-6 relative z-10">
                <div className="bg-black/50 border border-teal-300 rounded-xl shadow-lg backdrop-blur-sm p-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8 text-green-300">إحصائيات منصتنا</h2>
                    {/* دي مجرد أرقام ثابتة كشكل جمالي */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                            <div className="text-green-600">طالب نشط</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                            <div className="text-blue-600">دورة متاحة</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-yellow-600 mb-2">1000+</div>
                            <div className="text-yellow-600">ساعة تعليمية</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
                            <div className="text-red-600">معدل الرضا</div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div></>
         
    )
}
export default Home;