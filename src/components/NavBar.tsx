import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import Button from "./Button";

interface NavBarProps {
    onMenuClick : ()=>void;
}

function NavBar ({onMenuClick}:NavBarProps){

    const {user} = useAuth();

    return(
        <nav className="w-full fixed top-0 left-0 z-50 h-[70px] flex items-center justify-center px-auto bg-white dark:bg-black  transition-colors duration-300 ease-in-out backdrop-blur-xl shadow-lg ">
            <div className=" w-full lg:w-[70%] h-full flex items-center">
                <div className="w-full flex justify-between">
                    {/* النص الشمال  */}
                    <div className=" space-x-4">
                       <div className="flex items-center gap-3 ">
                        <button
                         onClick={onMenuClick}
                         className="lg:hidden p-2 rounded-md text-green-300 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500" 
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                        </button>
                        <Link to="/" className="flex items-center" >
                            <div className="flex-shrink-0">
                            <h1 className=" flex flex-row-reverse items-center lg:text-2xl font-bold text-teal-400">NexCode <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 64 64">
                                    <defs>
                                        
                                        <linearGradient id="smallNGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stop-color="#86EFAC"/>
                                        <stop offset="100%" stop-color="#22D3EE"/>
                                        </linearGradient>

                                    
                                        <filter id="smallNShadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.18"/>
                                        </filter>
                                    </defs>

                                    <g filter="url(#smallNShadow)">
                                    
                                        <path d="M32 12L50 22V42L32 52L14 42V22L32 12Z"
                                            fill="url(#smallNGrad)"
                                            rx="4"/>

                                    
                                        <path d="M22 42V22L42 42V22" 
                                            stroke="white" 
                                            stroke-width="4" 
                                            stroke-linecap="round" 
                                            stroke-linejoin="round"/>
                                    </g>
                                    </svg>
                             </h1>
                            </div>
                        </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                        <>
                            <div className="flex items-center mx-6 gap-4 lg:gap-6">
                                <Link to="/Courses" className="hidden lg:block text-white text-[10px] lg:text-[16px] font-semibold">
                                الدورات
                                </Link>
                                <Link to="/Profile" className="hidden lg:block text-white text-[10px] lg:text-[16px] font-semibold">
                                الملف الشخصي
                                </Link>
                            </div>
                            <div className="space-x-4 flex items-center">
                                <div className="flex gap-2 px-4 items-center">
                                    <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-teal-200 font-semibold text-[14px] lg:text-md  truncate">{user.name}</span>
                                </div>
                                {/* <div className="">
                                    <button onClick={logout} className="hidden lg:block text-red-500 text-[10px] lg:text-md lg:font-semibold">
                                        تسجيل الخروج
                                    </button>
                                </div> */}
                            </div>
                            < Button />
                        </>
    
                        ) : (
                            <div className="flex gap-4">
                            <Link to="/login" className="text-green-500 text-xs border rounded-full hover:bg-green-500 hover:text-black p-3 font-semibold">
                                تسجيل الدخول
                            </Link>

                            < Button />
                            </div>
                            
                     
                        )}
                    
                </div>
                
            </div>
          </div>
        </nav>

    )

}
export default NavBar;

