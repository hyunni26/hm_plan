# 신혼여행 PWA — 포르투갈 & 이탈리아

React + Vite + Tailwind + Supabase 기반 모바일 전용 여행 관리 앱.

## 진행 상황: 단계 1~5 전체 구현 완료

- **단계 1** Vite + React 18 골격, Tailwind(네이비 + 포르투갈/이탈리아 포인트 컬러), PWA 설정, Supabase 클라이언트
- **단계 2** Supabase 테이블 스키마 (`cities`, `schedules`, `bookings`, `budgets`) + 도시 시드 데이터
- **단계 3** 하단 4탭 네비게이션, 모바일 셸 레이아웃, 공용 Card/Modal 컴포넌트
- **단계 4** 탭별 핵심 기능
  - 홈: 한국/현지 실시간 시계, 다음 이동 카운트다운, 오늘 일정 브리핑, 긴급연락처·바우처 핫링크
  - 일정: 도시 필터, 날짜별 타임라인, 추가/수정/삭제 모달 (Supabase 연동)
  - 예약: 타입별 필터, QR/바우처 보기, 추가/수정/삭제 모달
  - 가계부: EUR 입력 시 실시간 환율로 KRW 자동 환산, 카테고리·결제자별 집계
- **단계 5** Git/Render 배포 가이드, PWA 아이콘 체크리스트 → `DEPLOY.md` 참고

빌드(`npm run build`)와 ESLint 검증을 마친 상태입니다.

## 로컬 실행 방법

\`\`\`bash
npm install
cp .env.example .env   # 이후 Supabase 프로젝트 값으로 채우기
npm run dev
\`\`\`

## 직접 준비해야 하는 것

자세한 순서는 **`DEPLOY.md`**를 따라주세요. 요약하면:

1. Supabase 프로젝트 생성 → `supabase/schema.sql`, `supabase/seed_cities.sql` 실행 → Storage에 `vouchers` 버킷 생성
2. `.env`에 Supabase URL/anon key 입력
3. `public/icons/`에 PWA 아이콘 5종 추가 (없어도 빌드는 됨)
4. GitHub push → Render에서 Static Site 연동 (`render.yaml` 자동 인식) → 환경변수 2개 등록
5. `src/components/home/HotLinksRow.jsx`의 대사관/보험사 연락처를 실제 값으로 교체

## 폴더 구조

\`\`\`
honeymoon-pwa/
├── public/
│   └── icons/                    # PWA 아이콘 (직접 추가 필요)
├── src/
│   ├── components/
│   │   ├── layout/                # BottomNav
│   │   ├── home/                   # ClockCard, CountdownCard, TodayBriefCard, HotLinksRow
│   │   ├── schedule/                # CityFilterBar, TimelineCard, ScheduleFormModal
│   │   ├── bookings/                 # BookingCard, BookingFormModal, QrViewerModal
│   │   ├── budget/                    # BudgetSummary, BudgetEntryForm, BudgetListItem
│   │   └── common/                     # Card, Modal, CityBadge
│   ├── pages/                    # HomePage, SchedulePage, BookingsPage, BudgetPage
│   ├── hooks/                    # useCities, useSchedules, useBookings, useBudgets, useExchangeRate
│   ├── lib/
│   │   ├── supabaseClient.js
│   │   └── dateUtils.js
│   ├── styles/index.css
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   ├── schema.sql                # 테이블 + RLS 정책
│   └── seed_cities.sql
├── DEPLOY.md                     # 단계 5: 배포 가이드
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── render.yaml
├── .env.example
└── package.json
\`\`\`
