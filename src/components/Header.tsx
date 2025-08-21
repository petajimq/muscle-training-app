'use client';

import { Button } from "@/components/ui/button"

const Header = () => {
    const isLoggedIn = false;

    return (
        <header className="w-full bg-black text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="font-bold text-xl">筋トレメニュー作成君</h1>
            <div>
                {isLoggedIn ? (
                    <Button variant="secondary" size="sm">ログアウト</Button>
                ) : (
                    <Button variant="secondary" size="sm">ログイン</Button>
                )}
            </div>
        </header>
    );
};

export default Header;