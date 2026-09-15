export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="page-heading" aria-labelledby="workspace-title">
        <p className="eyebrow">문서 작업 공간</p>
        <h1 id="workspace-title">개인정보 처리방침</h1>
        <p>작성 중인 문서와 최근 검토 내용을 한곳에서 관리합니다.</p>
      </section>
      <section className="content-section" aria-labelledby="recent-title">
        <div className="section-heading">
          <h2 id="recent-title">최근 문서</h2>
          <span className="status-label">0개</span>
        </div>
        <div className="empty-state">
          <div className="empty-document" aria-hidden="true"><span /><span /><span /></div>
          <div>
            <h3>아직 작성한 문서가 없습니다</h3>
            <p>문서 생성 기능은 계정과 권한 기반이 준비된 뒤 제공됩니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
