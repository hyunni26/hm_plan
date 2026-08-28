# 배포 가이드 (단계 5)

## 1. Supabase 준비

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 전체 실행
3. 이어서 `supabase/seed_cities.sql` 실행 (도시 6곳 초기 데이터)
4. **Storage 버킷 생성** (QR 코드/바우처 PDF 업로드용)
   - Storage 메뉴 > New bucket > 이름 `vouchers`, Public bucket 체크
   - 업로드 후 파일의 "Get URL"로 나온 값을 예약 등록 시 QR/바우처 URL 칸에 붙여넣기
5. Project Settings > API에서 **Project URL**, **anon public key** 복사

## 2. 로컬 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 Supabase URL/키로 교체:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

로컬 확인:

```bash
npm install
npm run dev
```

## 3. GitHub 저장소 생성 및 푸시

```bash
cd honeymoon-pwa
git init
git add .
git commit -m "초기 프로젝트 세팅"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/honeymoon-pwa.git
git push -u origin main
```

> `.env`는 `.gitignore`에 포함되어 있어 저장소에 올라가지 않습니다. 실제 키 유출 걱정 없이 push하면 됩니다.

## 4. Render 배포 (GitHub 연동, 자동 배포)

1. [render.com](https://render.com) 로그인 → **New** → **Static Site**
2. GitHub 저장소(`honeymoon-pwa`) 선택 → Connect
3. 프로젝트에 `render.yaml`이 포함되어 있어 아래 값이 자동 인식됩니다.
   (자동 인식이 안 되면 수동으로 입력)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**에 아래 2개 추가 (Supabase 값 그대로)
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Create Static Site 클릭 → 첫 배포 진행 (2~3분 소요)
6. 이후 `main` 브랜치에 push할 때마다 Render가 자동으로 재배포합니다.

## 5. PWA 아이콘 준비 (홈 화면 추가 시 표시됨)

`public/icons/` 폴더에 아래 파일을 추가하세요. 없어도 빌드/배포는 되지만 아이콘이 빈 사각형으로 보입니다.

| 파일명 | 크기 | 용도 |
|---|---|---|
| `favicon.ico` | 32x32 | 브라우저 탭 |
| `apple-touch-icon.png` | 180x180 | iOS 홈 화면 |
| `icon-192.png` | 192x192 | Android 홈 화면 |
| `icon-512.png` | 512x512 | Android 홈 화면 (고해상도) |
| `icon-512-maskable.png` | 512x512 | Android 적응형 아이콘 (여백 확보된 버전) |

간단한 로고/이니셜 이미지를 [realfavicongenerator.net](https://realfavicongenerator.net) 등에서 만들면 한 번에 세트로 뽑을 수 있습니다.

## 6. 홈 화면에 추가하기

- **iOS (Safari)**: 배포된 URL 접속 → 공유 버튼 → "홈 화면에 추가"
- **Android (Chrome)**: 배포된 URL 접속 → 우측 상단 메뉴 → "홈 화면에 추가" (또는 자동으로 뜨는 설치 배너)

## 7. 최종 체크리스트

- [ ] Supabase 테이블 4개 생성 확인 (`cities`, `schedules`, `bookings`, `budgets`)
- [ ] `vouchers` Storage 버킷 생성 (Public)
- [ ] Render 환경변수 2개 등록
- [ ] PWA 아이콘 5종 추가
- [ ] 배포된 URL에서 일정/예약/가계부 각각 추가·삭제 테스트
- [ ] 홈 탭에서 오늘 일정, 다음 이동 카운트다운 정상 표시 확인
- [ ] 긴급 연락처(대사관/보험사 번호) 실제 값으로 수정 (`src/components/home/HotLinksRow.jsx`)
