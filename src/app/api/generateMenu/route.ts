import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Gemini API クライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  const { part, trainingItem } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `
  # 命令
  あなたは筋トレの専門家です。部位「${part}」を対象に、器具「${trainingItem}」を使った自宅でできるメニューを3〜5個、初心者向けに提案してください。

  # 制約事項
  - 器具の指定がない場合は自重トレーニングを提案すること
  - 室内でできること
  - 初心者向けに作成すること
  - 順番を決めてメニューを作成すること
  - 順番ごとにナンバリングして見やすく作成すること
  - 大体10分～15分で終わる内容にすること
  - 絵文字などを使用して見やすくすること
  - 出力はMarkdown形式ではなく、プレーンテキストで箇条書きで作成すること。見出し（##や*など）や記号は不要です。
  - 専門家としての挨拶を入れること（やあ！世界一の筋トレ専門家だよ！みたいな感じ）
`;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log(part, trainingItem)
    return NextResponse.json({ result: text.trim() }, { status: 200 });
  } catch (err) {
    console.error("Gemini API Error in API route:", err);
    return NextResponse.json(
      { result: "とりあえず腕立て100回!!" },
      { status: 500 }
    );
  }
}