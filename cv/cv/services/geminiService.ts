
import { GoogleGenAI, Type } from "@google/genai";
import type { VerificationLetterData, School } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    teacher: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "A common, realistic full name for a teacher in the UK." },
        title: { type: Type.STRING, description: "A standard teaching title, e.g., 'Mathematics Teacher', relevant to the school." },
        email: { type: Type.STRING, description: "A plausible school email for the teacher, based on the school's website domain." },
        startDate: { type: Type.STRING, description: "A realistic employment start date within the last 5-7 years, formatted as YYYY-MM-DD." },
      },
       required: ["name", "title", "email", "startDate"]
    },
    principal: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "A realistic full name for the school's principal or headteacher." },
        title: { type: Type.STRING, description: "The principal's title, such as 'Headteacher' or 'Principal'." },
      },
       required: ["name", "title"]
    },
    letter: {
        type: Type.OBJECT,
        properties: {
            date: { type: Type.STRING, description: "Today's date, formatted as YYYY-MM-DD." },
            recipient: { type: Type.STRING, description: "The recipient of the letter. Must be 'To Whom It May Concern'." },
            subject: { type: Type.STRING, description: "A formal subject line, like 'Subject: Verification of Employment for {TEACHER_NAME}'." },
            body: { type: Type.STRING, description: "A formal letter body of exactly three paragraphs (separated by a single newline character '\\n'). Paragraph 1 verifies employment, title, and start date. Paragraph 2 mentions good standing and the 'Canva for Education program'. Paragraph 3 invites contact and restates the school phone number." }
        },
        required: ["date", "recipient", "subject", "body"]
    }
  },
  required: ["teacher", "principal", "letter"]
};

const generatePrompt = (school: School) => `
Generate all necessary fictional details for an official teacher employment verification letter from ${school.name} (${school.address}).
The purpose of this letter is to verify a fictional teacher's credentials for their application to the Canva for Education program.
The output must be a single JSON object that strictly adheres to the provided schema, generating details ONLY for the teacher, principal, and letter sections.

- School Context:
  - School Name: ${school.name}
  - School Website (for email domain): ${school.website}
  - School Phone (for letter body): ${school.phone}

- Generation Requirements:
  - Teacher: Create a realistic full name, a relevant teaching title, a school email using the school's domain, and a start date from the last 5-7 years.
  - Principal: Create a realistic full name for the Headteacher/Principal and their correct title.
  - Letter:
    - date: Today's date (YYYY-MM-DD).
    - recipient: Must be 'To Whom It May Concern'.
    - subject: Must be 'Subject: Verification of Employment for {TEACHER_NAME}'.
    - body: Must be exactly three paragraphs, separated by a single newline character.
      1. A formal verification stating {TEACHER_NAME}'s employment at ${school.name}, their full-time status, their {TEACHER_TITLE}, and their start date ({START_DATE}).
      2. A short paragraph describing the teacher as a dedicated member of staff in good standing, and stating the purpose of the verification is for their application to the 'Canva for Education program'.
      3. The final paragraph must be: 'Should you require additional information or have any questions regarding this verification, please do not hesitate to contact our main office at ${school.phone}.'

Do not include markdown formatting like \`\`\`json.
`;


export const generateLetterData = async (school: School): Promise<VerificationLetterData> => {
  try {
    const prompt = generatePrompt(school);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 1.0,
      },
    });
    
    const text = response.text.trim();
    const generatedData = JSON.parse(text);
    
    const fullData: VerificationLetterData = {
        school: school,
        teacher: generatedData.teacher,
        principal: generatedData.principal,
        letter: generatedData.letter,
    };

    return fullData;
  } catch (error) {
    console.error("Error generating letter data:", error);
    throw new Error("Failed to generate letter data from Gemini API. Please check your API key and connection.");
  }
};
