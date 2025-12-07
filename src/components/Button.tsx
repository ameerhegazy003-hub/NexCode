import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function Button(){
    const { theme , setTheme } = useContext(ThemeContext);

    const handleToggel =()=>{
     const prevTheme = theme === 'dark' ? 'light' : 'dark';
     setTheme(prevTheme);
    }

    return (
        <button onClick={handleToggel}>
            {theme === 'dark' ?  <svg className="text-white" width="25" height="25" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="12" cy="12" r="4" />
                                   <path d="M12 2v2M12 20v2M20 12h2M2 12H4M18.36 5.64l1.41-1.41M4.22 19.78l1.41-1.41M18.36 18.36l1.41 1.41M4.22 4.22l1.41 1.41"/>
                                 </svg>
: 
            <svg className="text-gray-800" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
}
        </button>
    );
}
export default Button;