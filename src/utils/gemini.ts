import * as dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateSQLQuery = async (userQuestion: string, tableSchema: string) => {
  const prompt = `
You are a PostgreSQL expert.
Given the user's question and the table schema, generate an optimized SQL query.
Only return the SQL query, no explanations.
IMPORTANT: Do not wrap the SQL in markdown formatting or use triple backticks.

User Question:
${userQuestion}

Table Schema:
${tableSchema}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ parts: [{ text: prompt }] }],
  });

  let answer = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "SELECT 1; -- fallback";

  if (answer.startsWith("```")) {
    answer = answer.replace(/```sql|```/g, "").trim();
  }

  console.log("Generated SQL:", answer);
  return answer;
};

export const getFinalAnswer = async (userQuestion: string, rows: any[]) => {
  const dataText = rows.map((r) => JSON.stringify(r)).join("\n");

  const prompt = `
You are a helpful assistant.
Answer the user's question based on the data rows provided.

User Question: "${userQuestion}"

Data:
${dataText}

Answer:
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ parts: [{ text: prompt }] }],
  });

  const answer = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "No response";

  console.log("Final Answer:", answer);
  return answer;
};
