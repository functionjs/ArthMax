
import React, { useState } from 'react';
import { PromptEditor } from './components/PromptEditor';
import { RefinementResultView } from './components/RefinementResultView';
import { refinePrompt } from './services/geminiService';
import { PromptState } from './types';
import { Sparkles, Terminal, ShieldCheck, AlertCircle } from 'lucide-react';

const INITIAL_SYSTEM_PROMPT = `<system>
1. Combine all parts of the problem discussion into a single text

2. Add headings of different levels in MarkDown (MD) format
2.1 Make a top-level heading (# Your Topic) that describes the main topic of the prompt
2.2 The first subheading (## Problem Legend) indicates a free-form description of the problem (problem context)
2.3 This can be followed by subheadings (and sub-subheadings, etc.) that indicate the main free-form subtasks that need to be solved.
3. In the following sections (## Task 1 , ## Task 2, ...) you formulate specific tasks (in this case, specific software tasks) to be solved.
4. In the next subsection (## Requirements) and its subsections, you state the requirements and instructions (e.g., programming language, how information is entered into the program and how it is output, whether to comment each line of code, etc.), restrictions (e.g., how to write the code - each command on a separate line or not, maximum number of lines, restrictions on the use of data structures and program constructs, maximum input size, input data types, etc.) and examples of input data and corresponding program results.

5. Translate the prepared structured prompt into English (e.g., using an online translator), correct possible translation errors
</system>`;

const INITIAL_USER_PROMPT = `<prompt>
# Prompt concise name

## Problem Legend


## Subproblem 1

## Subproblem 2

## ...

## Task 1.
Write the simplest program with console input and output that solves the problem 



## Requirements
### Requirement 1
Build  programs (AI can be used) on  hosting
### Requirement 2
Use only ... but ...

### Input-output examples
... (various examples) ...
</prompt>`;

const App: React.FC = () => {
  const [state, setState] = useState<PromptState>({
    systemPrompt: INITIAL_SYSTEM_PROMPT,
    userPrompt: INITIAL_USER_PROMPT,
    loading: false,
    error: null,
    result: null,
  });

  const handleRefine = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await refinePrompt(state.systemPrompt, state.userPrompt);
      setState(prev => ({ ...prev, result, loading: false }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err instanceof Error ? err.message : 'An unknown error occurred' 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Prompt Architect
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefine}
              disabled={state.loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${
                state.loading 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg active:scale-95'
              }`}
            >
              {state.loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Optimize Prompt
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Input Editor */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <h2 className="font-semibold">System Configuration</h2>
            </div>
            <PromptEditor
              value={state.systemPrompt}
              onChange={(v) => setState(p => ({ ...p, systemPrompt: v }))}
              placeholder="Enter system instruction template..."
              label="System Template"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <Terminal className="w-5 h-5 text-indigo-500" />
              <h2 className="font-semibold">User Task Prompt</h2>
            </div>
            <PromptEditor
              value={state.userPrompt}
              onChange={(v) => setState(p => ({ ...p, userPrompt: v }))}
              placeholder="Enter user prompt for analysis..."
              label="Input Prompt"
              minHeight="400px"
            />
          </div>
        </section>

        {/* Right: Results */}
        <section className="relative">
          {state.error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{state.error}</p>
            </div>
          )}

          {!state.result && !state.loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 p-12 text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Sparkles className="w-12 h-12 text-indigo-100" />
              </div>
              <h3 className="text-xl font-medium text-slate-600 mb-2">Ready to Refine</h3>
              <p className="max-w-xs text-sm">
                Paste your prompts and click Optimize to generate structural refinements and logical improvements.
              </p>
            </div>
          )}

          {state.loading && (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-inner" />
              <p className="text-slate-500 font-medium animate-pulse">Consulting Gemini 3 Pro Intelligence...</p>
            </div>
          )}

          {state.result && (
            <RefinementResultView result={state.result} />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
