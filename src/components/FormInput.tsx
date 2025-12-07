import type { FormInputProps } from "../types";

function FormInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    className = "",
}:FormInputProps){
    return(
        <div className = {`w-full ${className}`} >
           <label className="text-sm text-green-300">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
           </label>

           <input 
           type={type}
           placeholder={placeholder}
           onChange={onChange}
           value={value}
           required = {required}
           disabled = {disabled}

           className={` w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          transition-colors duration-200
          ${error?
            'border-red-500 bg-red-50'
            :'border-gray-300 hover:border-gray-400'
          }
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/30 hover:bg-white/70'} 
          `}
           />
           {error && (
            <p className="mt-2 text-sm text-red-500">
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            {error}
            </p>
           )}
        </div>
    );
}
export default FormInput;