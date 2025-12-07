
import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import  FormInput  from "../components/FormInput";


function Login() {

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  useEffect(() => {

    if (user) {
      navigate("/");
    }
  }, [user, navigate]); 


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setError("");
    
 
   
    if (!username.trim()) {
      setError("يرجى إدخال اسم المستخدم");
      return; 
    }


    if (username.trim().length < 2) {
      setError("اسم المستخدم يجب أن يكون أكثر من حرفين");
      return; 
    }


    login(username.trim());
  };

  
  return (
    <div className="w-full min-h-screen bg-[url('/main-bg.webp')] bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className=" max-w-md w-full space-y-8 relative z-10">
     
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-300 mb-2">مرحباً بك!</h2>
          <p className="text-green-200">سجل دخولك للبدء في رحلة التعلم</p>
        </div>

        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
           
            <FormInput
              label="اسم المستخدم"
              type="text"
              placeholder="أدخل اسمك"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              error={error} 
            />

       
            <button
              type="submit"
              className="w-full bg-teal-700  text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              تسجيل الدخول
            </button>
          </form>

     
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              ليس لديك حساب؟ 
              <span className="text-green-600 font-medium"> !يمكنك التسجيل مجاناً</span>
            </p>
          </div>
        </div>

     
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-l from-teal-300 to-teal-400/50 backdrop-blur-lg rounded-lg p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-2xl ml-3">🎓</div>
              <div>
                <h3 className="font-medium text-black">تعلم مجاني</h3>
                <p className="text-[12px] text-black/50">جميع الدورات متاحة مجاناً</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-l from-teal-300 to-teal-400/50 backdrop-blur-lg rounded-lg p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-2xl ml-3">📱</div>
              <div>
                <h3 className="font-medium text-black">متاح على جميع الأجهزة</h3>
                <p className="text-[12px] text-black/50">تعلم من أي مكان وفي أي وقت</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;