"use client";

import { useState } from "react";
import SignUp from "./signup";
import SignIn from "./signin";

type AuthView = "SIGNIN" | "SIGNUP";

export default function Auth() {
  const [view, setView] = useState<AuthView>("SIGNIN");
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        {view === "SIGNIN" ? (
          <SignIn view={view} setView={setView} />
        ) : (
          <SignUp view={view} setView={setView} />
        )}
      </div>
    </main>
  );
}
