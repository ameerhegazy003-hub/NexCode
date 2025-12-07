import type { ProgressBarProps } from "../types";

function ProgressBar({
    progress,
    total,
    showPercentage = true,
    className = "",
    color = "green",
    size = "md"
}:ProgressBarProps){
 const percentage = total > 0 ? Math.round(progress / total * 100) : 0 ;

 const getColorClasses = ()=>{
    switch(color){
        case "blue":
            return "bg-blue-500";
        case "red":
            return "bg-red-500";
        case "yellow":
            return "bg-yellow-500";
        default:
            return "bg-green-500";            
    }
 };

 const getSizeClasses = ()=>{
    switch(size){
        case "lg":
            return "h-4";
        case "sm":
            return "h-2";
        default:
            return "h-3";        
    }
 };

 return(
   <div className={`w-full ${className}`}>

    <div className="w-full flex justify-between items-center mb-2">
       
       <span className="text-gray-600 text-md font-medium"
       
       > التقدم:{total}من {progress}
       </span>

       {showPercentage &&(
        <span className="text-gray-600 text-md font-medium">
            {percentage}%
        </span>
       )}

    </div>

    <div className={`w-full rounded-full overflow-hidden bg-gray-500 ${getSizeClasses()}`}>
        <div className={`h-full transition-all duration-500 ease-out ${getColorClasses()}`}
        style={{width:`${percentage}%`}}> 

        </div>

        {showPercentage && (
            <div className="mt-1 text-xs text-gray-200 text-center">
                {percentage === 100?"مكتمل!":`${percentage}مكتمل % `}
            </div>
        )}
    </div>

   </div>   
 );

}
export default ProgressBar;