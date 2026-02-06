
    export interface RefinementResult {
      conciseSystemPrompt: string;
      inaccuracies: string[];
      refinedUserPrompt: string;
    }

export interface PromptState {
  systemPrompt: string;
  userPrompt: string;
  loading: boolean;
  error: string | null;
  result: RefinementResult | null;
}
