'use client';

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";

//メインページ
const GenerateWorkoutPage = () => {
  //トレーニング部位の状態管理
  const [part, setPart] = useState('胸');
  //トレーニング道具の状態管理
  const [trainingItem, setTrainingItem] = useState('');
  //生成メニューの状態管理
  const [result, setResult] = useState('')
  //ローディング状況の状態管理
  const [loading, setLoading] = useState(false);

  //トレーニング部位の更新
  const partChange = (value: string) => {
    return setPart(value);
  }

  //トレーニング道具の更新
  const trainingItemChange = (e:ChangeEvent<HTMLInputElement>) => {
    return setTrainingItem(e.target.value);
  }

  //メニュー作成を行う。レスポンスをres変数に設定
  const generateMenu = async () => {
    setResult('');
    setLoading(true);
    const res = await fetch('/api/generateMenu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ part, trainingItem }),
    })

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="bg-dots min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col justify-center items-center flex-1 p-4 gap-4 relative">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-bold text-3xl text-center">筋トレメニュー作成君</CardTitle>
            <CardDescription className="text-center">部位を選択して、筋トレメニューを生成します。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col mb-4">
              <label className="block font-semibold">部位</label>
              <Select value={part} onValueChange={partChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="鍛える部位を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>部位</SelectLabel>
                    <SelectItem value="胸">胸</SelectItem>
                    <SelectItem value="背中">背中</SelectItem>
                    <SelectItem value="脚">脚</SelectItem>
                    <SelectItem value="肩">肩</SelectItem>
                    <SelectItem value="腕">腕</SelectItem>
                    <SelectItem value="腹筋">腹筋</SelectItem>
                    <SelectItem value="全身">全身</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="form" className="block font-semibold">使用器具を入力（例：5kgダンベル）</label>
              <Input value={trainingItem} onChange={trainingItemChange} placeholder="使用する器具を入力" />
            </div>

          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={generateMenu} className="bg-black hover:bg-gray-500 ">{loading ? '生成中' : 'メニュー作成'}</Button>
          </CardFooter>
        </Card>

        {loading && (
          <div className="flex flex-col justify-center items-center text-center mt-4">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="mt-2">オリジナルのメニュー作成中</div>
          </div>
        )}

        {result && (
          <div className="mt-4 whitespace-pre-wrap border p-4 rounded bg-gray-100">
            <h2 className="font-bold mb-2">提案されたメニュー：</h2>
            {result}
          </div>
        )}
      </main>
    </div>
  )
}

export default GenerateWorkoutPage;
