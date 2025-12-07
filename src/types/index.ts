
export interface Course{
    id:number;
    title:string;
    description:string;
    duration?:string;
    level?:'beginner' | 'intermediate' | 'advanced'; 
    image?:string;
}
export interface CourseProps{
    course:Course;
}

export interface User{
    name: string;
    email?: string;
    avatar?: string;
}

export interface AuthContextType{
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
}
export interface FormInputProps {
    label:string;
    type?: 'text'| 'email'| 'password'| 'number'| 'tel'| 'url'| 'date';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export interface ProgressBarProps {
    progress:number;
    total:number;
    showPercentage?:boolean;
    className?:string;
    color?:'green'|'red'|'blue'|'yellow';
    size?:'md'|'sm'|'lg';
}
export interface ProgressState{
    completed:number[];
    currentLecture?:number;
}
export interface ProgressAction{
    type:'COMPLETE-LECTURE' | 'RESET-PROGRESS' | 'SET-CURRENT-LECTURE';
    payload?:number;
}
