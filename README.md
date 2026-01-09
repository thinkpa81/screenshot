# 스크린샷 자동 생성 도구

## 프로젝트 개요
- **이름**: 스크린샷 자동 생성 도구 (Screenshot Automation Tool)
- **목표**: 수십~수백 개의 웹페이지 URL을 입력받아 전체 페이지 스크린샷을 자동으로 생성하는 웹 애플리케이션
- **주요 기능**:
  - **🆕 사이트 URL 자동 분석** - 웹사이트의 모든 페이지 URL을 자동으로 찾아서 복사
  - 여러 URL 일괄 입력 및 처리
  - 자동 크롤링 모드 - 전체 웹사이트 자동 탐색
  - 전체 페이지(Full Page) 스크린샷 지원
  - 다양한 화면 크기 지원 (Desktop, Laptop, Tablet, Mobile)
  - PNG, JPEG, WebP 포맷 지원
  - 실시간 진행 상태 표시
  - 생성된 스크린샷 개별/일괄 다운로드

## URLs
- **개발 서버**: https://3000-ips6pt99u0inim1wati14-5185f4aa.sandbox.novita.ai
- **GitHub**: (배포 후 추가 예정)
- **프로덕션**: (Cloudflare Pages 배포 후 추가 예정)

## 데이터 아키텍처
- **스크린샷 API**: Microlink API (무료, API 키 불필요, 월 50,000회)
- **크롤링 API**: Microlink Links API (JavaScript 렌더링 지원)
- **저장소**: Cloudflare R2 Bucket (`screenshot-storage`)
- **데이터 흐름**:
  1. 사용자가 URL 입력 또는 자동 크롤링 선택
  2. (자동 모드) 백엔드에서 사이트 전체 링크 추출
  3. 각 URL에 대해 Microlink API 호출하여 스크린샷 생성
  4. 생성된 이미지를 R2 버킷에 저장
  5. 저장된 파일명 반환 및 프론트엔드에서 결과 표시

## 사용 방법

### 🎯 방법 1: 사이트 URL 자동 분석 (가장 쉬움!) ⭐⭐⭐

**단 3단계로 모든 페이지 스크린샷 생성!**

1. **사이트 URL 분석**
   - 상단 "🔍 사이트 URL 자동 분석" 섹션에 시작 URL 입력
   - 예: `https://dankook-graduate.onrender.com/`
   - "분석" 버튼 클릭
   - 자동으로 모든 페이지 URL 발견 (수십 개)

2. **URL 목록 적용**
   - 발견된 URL 목록 확인
   - "전체 복사" 버튼으로 클립보드에 복사 (선택사항)
   - "아래 URL 입력란에 적용하기" 버튼 클릭
   - 자동으로 URL 입력란에 모든 URL 입력됨

3. **스크린샷 생성**
   - 옵션 설정 (화면 크기, 포맷 등)
   - "스크린샷 생성 시작" 버튼 클릭
   - 완료 후 다운로드

### 모드 2: 수동 입력 모드
직접 원하는 URL만 선택하고 싶을 때 사용하세요.

1. **크롤링 모드**: "수동 입력 (URL 목록)" 선택
2. URL 목록 입력란에 스크린샷을 찍고 싶은 URL을 한 줄에 하나씩 입력
   ```
   https://dankook-graduate.onrender.com/
   https://dankook-graduate.onrender.com/subjects
   https://dankook-graduate.onrender.com/requirements
   https://dankook-graduate.onrender.com/courses
   https://dankook-graduate.onrender.com/schedule
   ```
3. 화면 크기, 이미지 포맷, 캡처 모드 선택
4. "스크린샷 생성 시작" 버튼 클릭
5. 진행 상태를 실시간으로 확인하며 대기
6. 완료된 스크린샷을 개별적으로 다운로드

### 모드 3: 자동 크롤링 모드 (실험적)
⚠️ **주의**: SPA(Single Page Application)나 JavaScript 기반 사이트는 자동 크롤링이 제한적일 수 있습니다. **사이트 URL 자동 분석**을 사용하는 것을 권장합니다.

1. **크롤링 모드**: "자동 크롤링 (전체 사이트)" 선택
2. 시작 URL만 입력 (예: `https://dankook-graduate.onrender.com/`)
3. **크롤링 옵션** 설정:
   - **최대 페이지 수**: 발견할 최대 페이지 개수 (기본: 20)
   - **크롤링 깊이**: 링크를 따라갈 깊이 (기본: 2)
4. 화면 크기, 이미지 포맷, 캡처 모드 선택
5. "스크린샷 생성 시작" 버튼 클릭
6. 시스템이 자동으로 사이트 내 링크를 찾아서 스크린샷 생성

### 💡 SPA 사이트의 경우
React, Vue, Angular 등으로 만들어진 SPA 사이트는 자동 크롤링이 어려울 수 있습니다. 이런 경우:
1. 브라우저에서 사이트를 직접 탐색
2. 주요 페이지의 URL을 복사하여 목록 작성
3. **수동 입력 모드**를 사용하여 URL 목록 제공

### 옵션 설명
- **화면 너비**: Desktop(1920px), Laptop(1366px), Tablet(768px), Mobile(375px)
- **이미지 포맷**: PNG(고품질), JPEG(작은 용량), WebP(최적화)
- **캡처 모드**: 전체 페이지(스크롤 포함) 또는 첫 화면만
- **최대 페이지 수**: 자동 크롤링 시 발견할 최대 페이지 개수 (1-100)
- **크롤링 깊이**: 링크를 따라갈 깊이 (1-5, 깊을수록 더 많은 페이지 발견)

### 키보드 단축키
- `Ctrl + Enter`: 스크린샷 생성 시작

## 기술 스택
- **프레임워크**: Hono (Cloudflare Workers)
- **프론트엔드**: HTML + TailwindCSS + Vanilla JavaScript
- **백엔드**: Hono API Routes
- **스크린샷 API**: ScreenshotOne API
- **저장소**: Cloudflare R2 Storage
- **배포 플랫폼**: Cloudflare Pages
- **개발 도구**: Vite, Wrangler, PM2

## API 엔드포인트

### POST `/api/analyze` 🆕
사이트의 모든 페이지 URL 자동 분석
```json
// Request
{
  "url": "https://example.com"
}

// Response
{
  "success": true,
  "baseUrl": "https://example.com",
  "foundUrls": ["url1", "url2", ...],
  "count": 44
}
```

### POST `/api/screenshot`
단일 URL 스크린샷 생성
```json
// Request
{
  "url": "https://example.com",
  "width": 1920,
  "format": "png",
  "fullPage": true
}

// Response
{
  "success": true,
  "url": "https://example.com",
  "fileName": "screenshots/1234567890-abc123.png",
  "size": 123456,
  "timestamp": "2026-01-09T13:00:00.000Z"
}
```

### POST `/api/screenshots/batch`
여러 URL 일괄 스크린샷 생성
```json
// Request
{
  "urls": ["https://example.com", "https://another.com"],
  "width": 1920,
  "format": "png",
  "fullPage": true
}

// Response
{
  "success": true,
  "total": 2,
  "succeeded": 2,
  "failed": 0,
  "results": [...]
}
```

### GET `/api/screenshot/:fileName`
저장된 스크린샷 조회 및 다운로드

### GET `/api/screenshots`
저장된 스크린샷 목록 조회

## 로컬 개발 환경

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn
- Cloudflare 계정 (배포 시)

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 개발 서버 시작 (PM2 사용)
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs screenshot-tool --nostream

# 서비스 중지
pm2 delete screenshot-tool
```

### 환경 변수 (.dev.vars)
```bash
SCREENSHOT_API_KEY=your_screenshotone_api_key
```

## 배포

### Cloudflare Pages 배포
```bash
# 1. Cloudflare API 키 설정
setup_cloudflare_api_key

# 2. R2 버킷 생성
npx wrangler r2 bucket create screenshot-storage

# 3. 프로젝트 생성
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2026-01-09

# 4. 배포
npm run deploy:prod

# 5. API 키 설정
npx wrangler pages secret put SCREENSHOT_API_KEY --project-name webapp
```

## 프로젝트 구조
```
webapp/
├── src/
│   ├── index.tsx          # 메인 애플리케이션 및 API 라우트
│   └── renderer.tsx       # JSX 렌더러
├── public/
│   └── static/
│       └── app.js         # 프론트엔드 로직
├── dist/                  # 빌드 출력 디렉토리
├── ecosystem.config.cjs   # PM2 설정
├── wrangler.jsonc         # Cloudflare 설정
├── package.json           # 의존성 및 스크립트
└── README.md              # 프로젝트 문서
```

## 현재 완료된 기능
✅ Hono + Cloudflare Pages 프로젝트 구조 생성  
✅ R2 버킷 연동 설정  
✅ 스크린샷 생성 API 엔드포인트 구현  
✅ URL 목록 입력 UI  
✅ 실시간 진행 상태 표시  
✅ 결과 카드 UI 및 개별 다운로드  
✅ 로컬 개발 서버 설정 및 테스트  
✅ Git 저장소 초기화  

## 아직 구현되지 않은 기능
⏳ 일괄 다운로드 기능 (ZIP 압축)  
⏳ 스크린샷 히스토리 관리  
⏳ 사용자 인증 및 개인 저장소  
⏳ 스케줄링 기능 (정기적 스크린샷)  
⏳ 웹훅 통합 (완료 알림)  

## 개발 다음 단계
1. **ScreenshotOne API 키 발급**: 실제 프로덕션 환경에서 사용할 API 키 등록
2. **R2 버킷 실제 생성**: Cloudflare 계정에서 R2 버킷 생성
3. **일괄 다운로드 구현**: JSZip 라이브러리를 활용한 ZIP 파일 생성
4. **에러 핸들링 강화**: 네트워크 타임아웃, API 제한 처리
5. **성능 최적화**: 병렬 처리 및 큐 시스템 도입
6. **GitHub 저장소 연동**: 코드 버전 관리 및 협업
7. **Cloudflare Pages 배포**: 프로덕션 환경 배포

## 배포 상태
- **플랫폼**: Cloudflare Pages (배포 대기 중)
- **상태**: 🟡 로컬 개발 완료 / 프로덕션 배포 대기
- **기술 스택**: Hono v4 + TypeScript + TailwindCSS + ScreenshotOne API
- **최종 업데이트**: 2026-01-09

## 라이선스
MIT

## 개발자
장순호 부장 - 코아시아 지주사 인사기획팀
