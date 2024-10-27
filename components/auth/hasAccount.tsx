"use client";

export default function HasAccount({ view, setView }) {
  const isSignIn = view === "SIGNIN";
  return (
    <div className="py-4 w-full text-center max-w-lg bg-white">
      {isSignIn ? "아직 계정이 없나요?" : "이미 계정이 있나요?"}{" "}
      <button
        className="text-light-blue-600 font-bold"
        onClick={() => setView(isSignIn ? "SIGNUP" : "SIGNIN")}
      >
        {isSignIn ? "회원가입" : "로그인"}
      </button>
    </div>
  );
}
