// export const languageModelResponse = async (prompt: string): Promise<string> => {


//     try {
//       // Simulate an API call with a 10-second timeout
//       const response = await Promise.race([
//         fetch('https://api.example.com/language-model', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ prompt }),
//         }).then((res) => res.json()),
//         new Promise((_, reject) =>
//           setTimeout(() => reject(new Error('Timeout')), 10000)
//         ),
//       ]);
  
//       // Handle the API response
//       if (response.success) {
//         return response.result;
//       } else {
//         return 'I am unable to respond at the moment. Please try again later.';
//       }
//     } catch (err) {
//       console.error('Language Model API error:', err);
//       return 'I am unable to respond at the moment. Please try again later.';
//     }
//   };








import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

interface GenerationConfig {
  maxOutputTokens: number;
  temperature: number;
  topP: number;
  topK: number;
}

const generateText = async (msg: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, How are you?" }],
      },
      {
        role: "model",
        parts: [{ text: "I am great. Will meet you later." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
      temperature: 1,
      topP: 0.1,
      topK: 16,
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  return text;
};

export default generateText;




