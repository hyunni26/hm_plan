-- ============================================================
-- 신혼여행 PWA - Supabase 스키마
-- 실행 방법: Supabase Dashboard > SQL Editor 에 전체 붙여넣기 후 Run
-- 로그인 없이 anon key로 바로 사용하는 구조이므로,
-- RLS는 "활성화 + 전체 허용" 정책으로 열어둡니다. (URL 비공개로 보안 유지)
-- ============================================================

-- uuid 생성 함수 사용을 위한 확장 (Supabase는 기본 활성화되어 있음)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 공통: updated_at 자동 갱신 트리거 함수
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 1) cities - 방문 도시 마스터
-- ============================================================
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,                 -- 한글 표기 (예: 리스본)
  name_en text,                       -- 영문 표기 (예: Lisbon)
  country text not null check (country in ('portugal', 'italy')),
  timezone text not null default 'Europe/Lisbon',
  sort_order int not null default 0,  -- 여행 동선 순서 (필터/정렬용)
  created_at timestamptz not null default now()
);

comment on table cities is '여행 방문 도시 목록 (일정/예약 필터 기준)';

-- ============================================================
-- 2) schedules - 일정 타임라인
-- ============================================================
create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  city_id uuid references cities(id) on delete set null,
  schedule_date date not null,
  start_time time,
  end_time time,
  title text not null,                -- 일정 제목 (예: 벨렘탑 방문)
  place_name text,                    -- 장소명
  memo text,
  map_url text,                       -- 구글맵 링크
  category text not null default '기타'
    check (category in ('관광', '식사', '이동', '숙소', '쇼핑', '기타')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table schedules is '일자별 타임라인 일정 (도시별 필터 가능)';

create index if not exists idx_schedules_date on schedules (schedule_date);
create index if not exists idx_schedules_city on schedules (city_id);

drop trigger if exists trg_schedules_updated_at on schedules;
create trigger trg_schedules_updated_at
  before update on schedules
  for each row execute function set_updated_at();

-- ============================================================
-- 3) bookings - 항공/기차/숙소/티켓 예약
-- ============================================================
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  booking_type text not null
    check (booking_type in ('flight', 'train', 'accommodation', 'museum', 'other')),
  title text not null,                -- 예: 인천→리스본, CP 리스본→포르투
  provider text,                      -- 항공사/철도사/숙소명 (예: 대한항공, CP, Italo)
  city_id uuid references cities(id) on delete set null,
  booking_date date,
  booking_time time,
  confirmation_number text,           -- 예약 확인번호/PNR
  qr_code_url text,                   -- QR 코드 이미지 URL (Supabase Storage)
  voucher_url text,                   -- 바우처/티켓 PDF URL (Supabase Storage)
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table bookings is '항공/기차/숙소/박물관 등 예약 및 바우처 정보';

create index if not exists idx_bookings_date on bookings (booking_date);
create index if not exists idx_bookings_type on bookings (booking_type);

drop trigger if exists trg_bookings_updated_at on bookings;
create trigger trg_bookings_updated_at
  before update on bookings
  for each row execute function set_updated_at();

-- ============================================================
-- 4) budgets - 가계부
-- ============================================================
create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  expense_date date not null,
  category text not null default '기타'
    check (category in ('교통', '숙박', '식비', '관광/입장료', '쇼핑', '기타')),
  payer text not null default '공동'
    check (payer in ('본인', '배우자', '공동')),
  description text,
  amount_eur numeric(10, 2) not null,
  exchange_rate numeric(10, 4),       -- 입력 시점 적용된 환율 (기록용)
  amount_krw numeric(12, 0),          -- 환산된 원화 금액 (자동 계산 후 저장)
  created_at timestamptz not null default now()
);

comment on table budgets is '지출 내역 - EUR 입력, KRW 자동 환산하여 함께 저장';

create index if not exists idx_budgets_date on budgets (expense_date);
create index if not exists idx_budgets_category on budgets (category);

-- ============================================================
-- RLS (Row Level Security)
-- 로그인 없는 구조이므로 anon 키로 전체 CRUD 허용.
-- 대신 URL/anon key는 외부에 공개하지 않도록 주의.
-- ============================================================
alter table cities enable row level security;
alter table schedules enable row level security;
alter table bookings enable row level security;
alter table budgets enable row level security;

drop policy if exists "public_full_access" on cities;
create policy "public_full_access" on cities
  for all using (true) with check (true);

drop policy if exists "public_full_access" on schedules;
create policy "public_full_access" on schedules
  for all using (true) with check (true);

drop policy if exists "public_full_access" on bookings;
create policy "public_full_access" on bookings
  for all using (true) with check (true);

drop policy if exists "public_full_access" on budgets;
create policy "public_full_access" on budgets
  for all using (true) with check (true);
