"use client";
import ErrorScreen from "components/layout/ErrorScreen";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorScreen
          code="500"
          title="무언가 잘못되었습니다."
          message={error.message}
          reset={reset}
        />
        <h1>Global Error</h1>
      </body>
    </html>
  );
}
