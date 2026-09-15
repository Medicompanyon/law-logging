import type { Metadata } from "next";

export const metadata: Metadata = { title: "마이페이지" };

export default function MyPage() {
  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">계정</p>
        <h1>마이페이지</h1>
        <p>로그인 후 계정 정보와 보안 설정을 관리할 수 있습니다.</p>
      </section>
      <div className="tab-list" role="tablist" aria-label="마이페이지 메뉴">
        <button role="tab" aria-selected="true" type="button">프로필</button>
        <button role="tab" aria-selected="false" type="button" disabled>보안</button>
      </div>
      <section className="profile-placeholder" aria-labelledby="profile-title">
        <div className="avatar-placeholder" aria-hidden="true">L</div>
        <div>
          <h2 id="profile-title">계정 정보</h2>
          <p>인증 기능이 연결되면 최소한의 프로필 정보가 표시됩니다.</p>
        </div>
      </section>
    </div>
  );
}
