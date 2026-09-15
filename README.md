# Law Logging

개인정보 처리방침 문서 작성, 검토, 버전 관리를 위한 Next.js 애플리케이션입니다.

## 요구 사항

- Node.js 20.9 이상
- Docker 및 Docker Compose

## 로컬 실행

1. `.env.example`을 `.env.local`로 복사합니다.
2. `docker compose up -d`로 PostgreSQL을 실행합니다.
3. `npm install`로 의존성을 설치합니다.
4. `npm run db:migrate`로 데이터베이스를 준비합니다.
5. `npm run dev`를 실행하고 `http://localhost:3000`을 엽니다.

## 검증

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

상태 확인 엔드포인트는 `GET /api/health`입니다. 데이터베이스 연결이 정상일 때 `200`, 사용할 수 없을 때 `503`을 반환합니다.

## 보안 원칙

- 실제 개인정보, 비밀번호, API 키, 토큰은 코드·로그·이슈에 기록하지 않습니다.
- 비밀 값은 환경변수 또는 배포 환경의 비밀 관리 기능으로 주입합니다.
- 데이터 접근은 인증뿐 아니라 각 리소스의 소유권을 서버에서 검증합니다.

## 법적 안내

이 시스템이 작성하는 개인정보 처리방침은 법률 자문이 아닙니다. 실제 처리 활동, 관할 법령, 업종에 대한 담당자 검토가 필요합니다.
