import React from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className='w-80 inline-flex flex-col justify-start items-start gap-2'>
            <label className="justify-start text-text-primary text-sm font-normal font-['Inter']">{label}</label>
            <input className="self-stretch px-4 py-2 text-text-secondary bg-bg-surface rounded-lg outline outline-1 outline-offset-[-1px] outline-border-subtle/10 inline-flex justify-center
             items-center gap-2.5
             bg-surface"
                {...props}
            />
        </div>
    );
};