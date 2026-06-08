import { buildTutorResponse } from "@/lib/tutor-knowledge";

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };

    if (!message?.trim()) {
      return Response.json(
        { answer: "Ask me anything about Qubitcoin, qPoW, mining, or wallets.", sources: [] },
        { status: 200 },
      );
    }

    const { answer, sources } = buildTutorResponse(message.trim());

    return Response.json({ answer, sources });
  } catch {
    return Response.json(
      { answer: "Something went wrong. Please try again.", sources: [] },
      { status: 500 },
    );
  }
}
