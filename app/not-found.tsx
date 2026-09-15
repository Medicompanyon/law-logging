import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="error-state">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소를 확인하거나 홈으로 이동해 주세요.</p>
      <Link className="primary-button" href="/">홈으로 이동</Link>
    </section>
  );
}
