// app/api/generateWorkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { part, equipment } = await req.json();

  const prompt = `あなたは筋トレの専門家です。部位「${part}」を対象に、自宅でできる自重メニュー（器具: ${equipment}）を3〜5個、初心者向けに提案してください。`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "あなたはパーソナルトレーナーです。" },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();
    console.log('🔍 OpenAI API Response:', data); 
    const content =
      data.choices?.[0]?.message?.content || "メニューの生成に失敗しました。";

    return NextResponse.json({ result: content });
  } catch (e: any) {
    console.error("エラー発生", e);
    return NextResponse.json({ result: `通信エラー：${e.message}` });
  }
}
