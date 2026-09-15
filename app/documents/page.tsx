import type { Metadata } from "next";

export const metadata: Metadata = { title: "문서" };

export default function DocumentsPage() {
  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">문서</p>
        <h1>내 개인정보 처리방침</h1>
        <p>소유한 문서만 이 목록에 표시됩니다.</p>
      </section>
      <section className="empty-state" aria-label="문서 목록">
        <div className="empty-document" aria-hidden="true"><span /><span /><span /></div>
        <div>
          <h2>표시할 문서가 없습니다</h2>
          <p>문서 기능 구현 후 생성한 문서가 이곳에 표시됩니다.</p>
        </div>
      </section>
    </div>
  );
}
