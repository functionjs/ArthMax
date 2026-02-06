
import React from 'react';
// Mine comment at 23:30 2025.02.06
    interface Props {
                     value: string;
                     onChange: (val: string) => void;
                     placeholder?: string;
                     label: string;
                     minHeight?: string;
    }

export const PromptEditor: React.FC<Props> = 
 ({ value, onChange, placeholder, label, minHeight = "200px" }) => {
  return (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">{label}</label>
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm code-font focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none overflow-y-auto"
              style={{ minHeight }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
            />
          </div>
  );      
};
