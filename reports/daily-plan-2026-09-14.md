# 2026-09-14 일일 개발 계획

- 기준 시간: 2026-09-14 10:11 KST
- 작업 시간: 평일 09:00-17:00 KST 기준, 작성 시점 이후 잔여 시간 중심
- 대상: `Medicompanyon/law-logging` `main`
- 오늘의 목표: 모든 MVP 기능의 선행 조건인 #8 Foundation을 실행·검증 가능한 상태로 구축한다.

## 저장소 및 진행 상태

- `main` HEAD: [`6dcd8e9`](https://github.com/Medicompanyon/law-logging/commit/6dcd8e92433689f7c95ff91f1f7d4ac8a5da2f98), `docs: add daily development result for 2026-09-11` (2026-09-11 17:15 KST).
- 최근 커밋은 일일 결과 문서, 일일 계획 문서, 저장소 초기화의 3건이다. 2026-09-11 이후 제품 구현 커밋은 없다.
- 현재 `main` 루트에는 `README.md`와 `reports/`만 있다. Next.js 소스, 패키지 설정, PostgreSQL 구성, 마이그레이션, 테스트, CI는 없다.
- 열린 이슈는 9개([#1](https://github.com/Medicompanyon/law-logging/issues/1)-[#9](https://github.com/Medicompanyon/law-logging/issues/9))이며 열린 PR은 0개다.
- 전체 진행 판단: 계획 수립 단계이며 구현은 시작 전이다. [#9 MVP EPIC](https://github.com/Medicompanyon/law-logging/issues/9)의 첫 선행 작업인 [#8 Foundation](https://github.com/Medicompanyon/law-logging/issues/8)이 임계 경로다.

## 우선순위 1: Next.js·TypeScript 실행 골격 구축

- 관련 이슈: [#8 Foundation](https://github.com/Medicompanyon/law-logging/issues/8), [#9 MVP EPIC](https://github.com/Medicompanyon/law-logging/issues/9)
- 권장 시간: 10:20-12:00 KST
- 목표: 빈 저장소를 로컬에서 실행하고 정적 검증할 수 있는 Next.js App Router 프로젝트로 전환한다.
- 구체적 구현 범위:
  - Next.js App Router, TypeScript strict, ESLint, npm lockfile과 기본 테스트 러너를 구성한다.
  - `dev`, `lint`, `typecheck`, `test`, `build` 스크립트를 추가한다.
  - 루트 레이아웃과 홈 화면에 흰 배경, 파란 강조, 상단 탐색, 넓은 여백과 카드형 작업 영역을 적용한다.
  - skip link, 의미 있는 landmark, 명확한 focus 표시와 모바일 반응형 구조를 포함한다.
- 완료 조건:
  - 깨끗한 환경에서 `npm ci` 후 `npm run dev`로 홈 화면이 열린다.
  - lint, typecheck, 단위 테스트와 production build가 통과한다.
  - 320px 모바일부터 데스크톱까지 콘텐츠가 겹치거나 잘리지 않는다.
  - 저장소와 로그에 실제 개인정보나 비밀 값이 없다.
- 테스트 방법:
  - `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`를 실행한다.
  - 320px, 768px, 1440px 뷰포트에서 화면을 확인하고 키보드만으로 탐색한다.
- 보안·개인정보 위험:
  - 서버 전용 환경변수가 클라이언트 번들에 노출될 수 있다. 공개 값만 `NEXT_PUBLIC_`을 사용한다.
  - 샘플과 fixture에는 합성 데이터만 사용한다.
  - 신규 의존성의 공급망 및 알려진 취약점을 점검한다.
- 예상 차단 요소:
  - 기존 코드 규칙이 없어 테스트 러너와 패키지 선택 근거를 기록해야 한다.
  - 참고 UI의 세부 화면은 후속 기능 범위이므로 오늘은 공통 레이아웃에 한정한다.

## 우선순위 2: 환경변수 검증과 PostgreSQL 기반 구축

- 관련 이슈: [#8 Foundation](https://github.com/Medicompanyon/law-logging/issues/8), [#3 Architecture](https://github.com/Medicompanyon/law-logging/issues/3)
- 권장 시간: 13:00-15:00 KST
- 목표: 합성 설정만으로 로컬 PostgreSQL을 기동하고 연결과 마이그레이션을 재현할 수 있게 한다.
- 구체적 구현 범위:
  - Docker Compose에 PostgreSQL 서비스, healthcheck와 영속 볼륨을 구성한다.
  - TypeScript ORM을 선정하고 연결 모듈, 마이그레이션 디렉터리와 최초 마이그레이션을 추가한다.
  - `.env.example`에는 자리표시자 또는 합성 개발 값만 두고 실제 환경 파일, 덤프와 로그를 `.gitignore`로 차단한다.
  - 필수 환경변수를 서버 시작 전에 검증하고 오류에는 변수 이름만 표시한다.
  - #3을 위한 트랜잭션, 테스트 DB와 마이그레이션 규칙을 문서화한다.
- 완료 조건:
  - 문서화된 절차로 DB 기동, 연결과 마이그레이션 적용이 성공한다.
  - 마이그레이션 재실행 시 중복 스키마가 생성되지 않는다.
  - 환경변수 누락이나 형식 오류가 값을 노출하지 않고 명확히 실패한다.
  - 환경 파일, 덤프, 실제 자격증명과 개인정보가 추적되지 않는다.
- 테스트 방법:
  - 빈 볼륨에서 DB를 기동하고 마이그레이션 적용 및 재적용을 확인한다.
  - 누락, 잘못된 형식, 정상 합성 환경변수 케이스를 테스트한다.
  - 추적 파일과 로그에 비밀정보나 실제 개인정보가 없는지 검색한다.
- 보안·개인정보 위험:
  - DB 연결 문자열, 비밀번호와 쿼리 값이 소스나 로그에 노출될 수 있다.
  - 개발 DB가 외부 인터페이스에 노출되거나 개발용 값이 운영에 재사용될 수 있다.
  - ORM 디버그 로그에 향후 개인정보가 기록될 수 있어 값 로깅을 기본 비활성화해야 한다.
- 예상 차단 요소:
  - ORM이 확정되지 않았다. PostgreSQL 지원, 마이그레이션 안정성, 타입 안전성과 운영 복잡도로 결정한다.
  - Docker 사용이 불가능한 환경에서는 별도 PostgreSQL 접속이 필요하다.

## 우선순위 3: CI 품질 게이트와 비밀정보 방지선

- 관련 이슈: [#8 Foundation](https://github.com/Medicompanyon/law-logging/issues/8), [#4 Release](https://github.com/Medicompanyon/law-logging/issues/4)
- 권장 시간: 15:00-16:10 KST
- 목표: 이후 변경의 타입, lint, 테스트, 빌드 실패와 명백한 비밀정보 유입을 자동 검출한다.
- 구체적 구현 범위:
  - GitHub Actions에 `npm ci`, lint, typecheck, 단위 테스트와 production build를 구성한다.
  - 워크플로 권한을 `contents: read` 중심으로 제한하고 외부 Action은 검토된 고정 참조를 사용한다.
  - 테스트에는 합성 환경만 주입하고 저장소에 맞는 비밀정보 검사 단계를 추가한다.
  - README의 검증 명령을 실제 CI 명령과 일치시킨다.
- 완료 조건:
  - `main` 커밋에서 모든 품질 단계가 실행되고 통과한다.
  - 실패 원인은 확인할 수 있지만 환경 값, 비밀번호, 토큰과 개인정보는 로그에 나타나지 않는다.
  - 재현 가능한 lockfile 설치를 사용한다.
- 테스트 방법:
  - 정상 워크플로 결과를 확인한다.
  - 커밋하지 않는 임시 실패와 합성 가짜 시크릿 패턴으로 게이트 동작을 검증한다.
  - 워크플로 권한과 로그를 수동 검토한다.
- 보안·개인정보 위험:
  - 과도한 Actions 권한과 변경 가능한 외부 Action 태그는 공급망 침해 범위를 키운다.
  - fixture, 스냅샷과 실패 출력에 실제 정보가 포함될 수 있다.
- 예상 차단 요소:
  - `main` 보호와 필수 상태 검사 설정은 별도 저장소 운영 변경이므로 오늘 문서 승인 범위에는 포함되지 않는다.
  - Actions 대기나 패키지 레지스트리 장애가 검증을 지연할 수 있다.

## 우선순위 4: 재현 검증과 #3 착수 준비

- 관련 이슈: [#8 Foundation](https://github.com/Medicompanyon/law-logging/issues/8), [#3 Architecture](https://github.com/Medicompanyon/law-logging/issues/3), [#9 MVP EPIC](https://github.com/Medicompanyon/law-logging/issues/9)
- 권장 시간: 16:10-17:00 KST
- 목표: 오늘 결과를 새 환경 관점에서 검증하고 다음 영업일의 데이터 모델과 권한 정책 작업을 준비한다.
- 구체적 구현 범위:
  - README 절차로 설치, DB 기동, 마이그레이션과 전체 검증을 처음부터 재실행한다.
  - 구현 권한이 별도로 주어진 경우 #8에 결정, 검증 결과, 남은 위험과 미완료 항목을 기록한다.
  - #3의 엔터티 경계, 문단 안정 ID, 외래키·삭제 정책, 트랜잭션 경계와 소유권 검사 인터페이스를 정리한다.
- 완료 조건:
  - 신규 checkout을 가정한 절차가 추가 설명 없이 재현된다.
  - 실패 항목에는 원인, 영향과 다음 조치가 기록된다.
  - #3의 첫 구현 단위와 정책 결정이 분리되어 있다.
- 테스트 방법:
  - 기존 의존성 캐시와 DB 볼륨 없이 설치부터 전체 검증까지 수행한다.
  - 생성물, 로그, 환경 파일과 최종 변경 목록에 합성 데이터만 남았는지 확인한다.
- 보안·개인정보 위험:
  - 검증 결과를 기록할 때 환경 값이나 로컬 경로가 복사될 수 있어 결과만 요약해야 한다.
  - 삭제 정책을 담당자 검토 없이 확정하면 삭제 요청과 감사 보존 요구가 충돌할 수 있다.
- 예상 차단 요소:
  - 기반 작업 실패 또는 CI 지연 시 #3은 설계 질문 정리까지만 수행한다.
  - 리소스별 보유·삭제·익명화 기간은 실제 처리 활동과 담당자 결정이 필요하다.

## 오늘 종료 기준과 이월 규칙

- 필수 종료 기준: 실행 골격과 정적 검증, 환경변수 차단 규칙이 완료되어야 한다.
- 목표 종료 기준: PostgreSQL 마이그레이션과 CI까지 재현 검증을 통과한다.
- 시간이 부족하면 #3 설계 준비를 먼저 이월하되 비밀정보 노출 가능성이 있는 변경은 검증 없이 남기지 않는다.
- #1, #2, #4-#7 기능 구현은 #8과 #3의 선행 조건이 충족될 때까지 시작하지 않는다.

## 확인 필요 사항

- ORM과 테스트 러너 선택 및 아키텍처 결정 기록 위치.
- `main` 브랜치 보호, 필수 상태 검사와 커밋 서명 정책.
- 계정 삭제 시 리소스별 삭제, 익명화와 보존 정책.
- AWS 서울 리전 계정, 예산, 네트워크, 백업과 운영 책임자는 #4 착수 전에 확인한다.

> 이 계획은 개발 작업 문서이며 법률 자문이 아니다. 개인정보 처리방침과 보유·삭제 정책은 실제 처리 활동, 관할 법령, 업종 및 담당자의 검토가 필요하다.
