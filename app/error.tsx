"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application route failed", { digest: error.digest });
  }, [error.digest]);

  return (
    <section className="error-state" role="alert">
      <p className="eyebrow">오류</p>
      <h1>화면을 불러오지 못했습니다</h1>
      <p>잠시 후 다시 시도해 주세요.</p>
      <button className="primary-button" type="button" onClick={reset}>다시 시도</button>
    </section>
  );
}
