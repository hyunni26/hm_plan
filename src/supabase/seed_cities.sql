-- ============================================================
-- 초기 도시 데이터 시드
-- schema.sql 실행 이후에 실행하세요.
-- 이미 데이터가 있다면 중복 삽입 방지를 위해 확인 후 실행 권장.
-- ============================================================

insert into cities (name, name_en, country, timezone, sort_order) values
  ('리스본', 'Lisbon',   'portugal', 'Europe/Lisbon', 1),
  ('포르투', 'Porto',    'portugal', 'Europe/Lisbon', 2),
  ('로마',   'Rome',     'italy',    'Europe/Rome',   3),
  ('피렌체', 'Florence', 'italy',    'Europe/Rome',   4),
  ('베네치아', 'Venice', 'italy',    'Europe/Rome',   5),
  ('밀라노', 'Milan',    'italy',    'Europe/Rome',   6);
