
import React from 'react';
import { RefinementResult } from '../types';
import { CheckCircle2, AlertTriangle, FileCode, Wand2, Copy } from 'lucide-react';

interface Props {
  result: RefinementResult;
}

export const RefinementResultView: React.FC<Props> = ({ result }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple feedback could be added here
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Concise System Prompt Section */}
      <div className="bg-white rounded-2xl shadow-md border border-indigo-100 overflow-hidden">
        <div className="bg-indigo-50/50 px-6 py-4 flex items-center justify-between border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-indigo-900">Refined System Instructions</h3>
          </div>
          <button 
            onClick={() => copyToClipboard(result.conciseSystemPrompt)}
            className="p-1.5 hover:bg-white rounded-md transition-colors text-indigo-400 hover:text-indigo-600"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <pre className="text-sm code-font bg-slate-50 p-4 rounded-xl border border-slate-100 overflow-x-auto whitespace-pre-wrap">
            {result.conciseSystemPrompt}
          </pre>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden">
        <div className="bg-amber-50/50 px-6 py-4 flex items-center gap-2 border-b border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-amber-900">Inaccuracies & Shortcomings</h3>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {result.inaccuracies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Refined User Prompt Section */}
      <div className="bg-white rounded-2xl shadow-md border border-emerald-100 overflow-hidden">
        <div className="bg-emerald-50/50 px-6 py-4 flex items-center justify-between border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Refined Problem Prompt</h3>
          </div>
          <button 
            onClick={() => copyToClipboard(result.refinedUserPrompt)}
            className="p-1.5 hover:bg-white rounded-md transition-colors text-emerald-400 hover:text-emerald-600"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap code-font bg-slate-50 p-4 rounded-xl border border-slate-100">
            {result.refinedUserPrompt}
          </div>
        </div>
      </div>
    </div>
  );
};
