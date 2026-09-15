import Link from "next/link";

const navigation = [
  { href: "/", label: "홈" },
  { href: "/documents", label: "문서" },
  { href: "/mypage", label: "마이페이지" },
];

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="로우로깅 홈">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span>Law Logging</span>
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="navigation-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
