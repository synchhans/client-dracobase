interface ErrorResponse {
  message: string;
  type: string;
}

type DebugLog = string;

export interface AIResponse {
  query: string;
  response: string;
  error?: ErrorResponse;
  solution?: string;
  debugLogs?: DebugLog[];
  confidenceScore: number;
}

export const parseAIResponse = (rawResponse: string): AIResponse => {
  const lines = rawResponse.split("\n");

  let error: ErrorResponse | undefined = undefined;
  let solution: string | undefined = undefined;
  let debugLogs: DebugLog[] = [];
  let confidenceScore = 0;

  lines.forEach((line) => {
    if (line.includes("**Error**:")) {
      error = {
        message: line.replace("- **Error**:", "").trim(),
        type: "Unknown",
      };
    } else if (line.includes("**Solution**:")) {
      solution = line.replace("- **Solution**:", "").trim();
    } else if (line.startsWith("- ")) {
      debugLogs.push(line.trim());
    }
  });

  confidenceScore = calculateConfidenceScore(rawResponse);

  return {
    query: extractQueryFromResponse(rawResponse),
    response: rawResponse,
    error,
    solution,
    debugLogs,
    confidenceScore,
  };
};

const calculateConfidenceScore = (responseContent: string): number => {
  let score = 0;

  const responseLength = responseContent.length;
  score += Math.max(0, 1 - responseLength / 500);

  const keywords = ["error", "bug", "solution", "fix", "saran", "solusi"];
  const keywordCount = keywords.reduce((count, keyword) => {
    return count + (responseContent.toLowerCase().includes(keyword) ? 1 : 0);
  }, 0);
  score += Math.min(0.5, keywordCount * 0.1);

  const hasErrorSection = responseContent.includes("**Error**:");
  const hasSolutionSection = responseContent.includes("**Solution**:");
  if (hasErrorSection && hasSolutionSection) {
    score += 0.3;
  }

  return Math.min(1, score);
};

const extractQueryFromResponse = (responseContent: string): string => {
  const queryRegex = /<h1>(.*?)<\/h1>/;
  const match = responseContent.match(queryRegex);
  return match ? match[1].trim() : "No query found";
};
