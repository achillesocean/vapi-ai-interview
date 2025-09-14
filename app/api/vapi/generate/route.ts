import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
export async function GET() {
  // supposed to say 'we're live'
  return Response.json({ success: true, data: "we're live" }, { status: 200 });
}

export async function POST(request: Request) {
  // gets questions generated from gemini, stores them within the database.
  const { type, role, level, techstack, amount, userid } = await request.json(); //first time seeing props awaited

  try {
    // generate the text that our vapi ai agent will use. perhaps to qeury gemini?

    const { text: questions } = await generateText(
      // did you know you could rename when destructuring objects?
      {
        model: google("gemini-2.0-flash-001"),
        prompt: `Prepare questions for a job interview. The job role is ${role}. The job experience level is ${level}. The tech stack used in the job is: ${techstack}. The focus between behavioural and technical questions should lean towards: ${type}. The amount of questions required is: ${amount}. Please return only the questions and nothing else. The questions are going to be read by a voice assistant, so do not use "/" or "*" or any other special characters that might break the voice assistant. Return the questions formatted like this: ["Question 1", "Question 2", "Question 3"]`,
      }
    );

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true, // entire interview generated at once?
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: error, data: "something went wrong" },
      { status: 500 }
    );
  }
}
