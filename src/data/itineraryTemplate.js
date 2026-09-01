// 미리 짜둔 여행 계획 템플릿.
// "일정" 탭에서 날짜를 고르면 이 목록을 보여주고, 탭하면 시간만 원하는 대로
// 수정해서 실제 일정(schedules 테이블)에 추가할 수 있습니다.
// city는 cities 테이블의 name과 정확히 일치해야 자동으로 매칭됩니다.

export const ITINERARY_TEMPLATE = [
  // 3/7 (일)
  { date: '2027-03-07', time: '22:00', city: '리스본', title: '리스본 숙소 체크인', place: null, memo: null, category: '숙소' },

  // 3/8 (월)
  { date: '2027-03-08', time: '09:00', city: '리스본', title: '알파마 지구', place: '28번 트램, 전망대', memo: null, category: '관광' },
  { date: '2027-03-08', time: '13:00', city: '리스본', title: '상 조르즈 성', place: null, memo: null, category: '관광' },
  { date: '2027-03-08', time: '19:00', city: '리스본', title: '파두 공연 관람', place: null, memo: null, category: '기타' },

  // 3/9 (화)
  { date: '2027-03-09', time: '09:00', city: '리스본', title: '파스텔 드 벨렘', place: '원조 에그타르트', memo: null, category: '식사' },
  { date: '2027-03-09', time: '11:00', city: '리스본', title: '제로니무스 수도원', place: null, memo: null, category: '관광' },
  { date: '2027-03-09', time: '14:00', city: '리스본', title: '발견 기념탑', place: null, memo: null, category: '관광' },

  // 3/10 (수)
  { date: '2027-03-10', time: '09:00', city: '리스본', title: '신트라 궁전', place: null, memo: null, category: '관광' },
  { date: '2027-03-10', time: '12:00', city: '리스본', title: '아젠하스 두 마르', place: '절벽 마을', memo: null, category: '관광' },
  { date: '2027-03-10', time: '14:30', city: '리스본', title: '호카곶', place: null, memo: null, category: '관광' },
  { date: '2027-03-10', time: '16:30', city: '리스본', title: '카스카이스 해변', place: null, memo: null, category: '관광' },

  // 3/11 (목)
  { date: '2027-03-11', time: '09:00', city: '리스본', title: '오비두스 중세 마을 탐방', place: null, memo: null, category: '관광' },
  { date: '2027-03-11', time: '15:00', city: '포르투', title: '포르투 이동', place: null, memo: '기차 이동', category: '이동' },
  { date: '2027-03-11', time: '19:00', city: '포르투', title: '동 루이스 1세 다리 야경', place: null, memo: null, category: '관광' },

  // 3/12 (금)
  { date: '2027-03-12', time: '09:00', city: '포르투', title: '상벤투역 & 렐루 서점', place: null, memo: null, category: '관광' },
  { date: '2027-03-12', time: '11:00', city: '포르투', title: '도루강 크루즈 & 포트 와인 시음', place: null, memo: null, category: '관광' },
  { date: '2027-03-12', time: '20:20', city: '밀라노', title: '밀라노 도착', place: null, memo: '포르투(OPO) → 밀라노(MXP) 항공', category: '이동' },
  { date: '2027-03-12', time: '21:30', city: '밀라노', title: '말펜사 익스프레스 탑승 → 숙소 체크인', place: null, memo: '밀라노 중앙역 근처', category: '이동' },

  // 3/13 (토)
  { date: '2027-03-13', time: '09:00', city: '피렌체', title: '피렌체 이동', place: null, memo: '밀라노 중앙역 → 피렌체 SMN역, 약 1시간 40분', category: '이동' },
  { date: '2027-03-13', time: '14:00', city: '피렌체', title: '피렌체 대성당 (두오모)', place: null, memo: null, category: '관광' },
  { date: '2027-03-13', time: '18:00', city: '피렌체', title: '미켈란젤로 언덕 일몰', place: null, memo: null, category: '관광' },
  { date: '2027-03-13', time: '20:00', city: '피렌체', title: '티본 스테이크 저녁', place: null, memo: null, category: '식사' },

  // 3/14 (일)
  { date: '2027-03-14', time: '09:00', city: '피렌체', title: '피사 당일치기', place: '피사의 사탑', memo: '기차 약 50분', category: '관광' },
  { date: '2027-03-14', time: '14:00', city: '피렌체', title: '우피치 미술관', place: null, memo: null, category: '관광' },
  { date: '2027-03-14', time: '17:00', city: '피렌체', title: '베키오 다리', place: null, memo: null, category: '관광' },

  // 3/15 (월)
  { date: '2027-03-15', time: '09:00', city: '로마', title: '로마 이동', place: null, memo: '피렌체 SMN역 → 로마 테르미니역, 약 1시간 30분', category: '이동' },
  { date: '2027-03-15', time: '15:00', city: '로마', title: '판테온', place: null, memo: null, category: '관광' },
  { date: '2027-03-15', time: '17:00', city: '로마', title: '트레비 분수', place: null, memo: null, category: '관광' },
  { date: '2027-03-15', time: '18:30', city: '로마', title: '스페인 광장', place: null, memo: null, category: '관광' },
  { date: '2027-03-15', time: '20:00', city: '로마', title: '나보나 광장', place: null, memo: null, category: '관광' },

  // 3/16 (화)
  { date: '2027-03-16', time: '09:00', city: '로마', title: '콜로세움', place: null, memo: null, category: '관광' },
  { date: '2027-03-16', time: '11:30', city: '로마', title: '포로 로마노', place: null, memo: null, category: '관광' },
  { date: '2027-03-16', time: '14:00', city: '로마', title: '캄피돌리오 언덕', place: null, memo: null, category: '관광' },
  { date: '2027-03-16', time: '19:00', city: '로마', title: '트라스테베레 야경', place: null, memo: null, category: '기타' },

  // 3/17 (수)
  { date: '2027-03-17', time: '08:00', city: '로마', title: '폼페이 유적지 탐방', place: null, memo: null, category: '관광' },
  { date: '2027-03-17', time: '14:00', city: '로마', title: '포시타노 / 아말피 해안', place: null, memo: '절경 관람', category: '관광' },

  // 3/18 (목)
  { date: '2027-03-18', time: '09:00', city: '로마', title: '바티칸 박물관', place: null, memo: null, category: '관광' },
  { date: '2027-03-18', time: '12:00', city: '로마', title: '성 베드로 대성당', place: null, memo: null, category: '관광' },
  { date: '2027-03-18', time: '14:00', city: '로마', title: '천사성', place: null, memo: null, category: '관광' },
  { date: '2027-03-18', time: '18:00', city: '로마', title: '피우미치노 공항 이동 및 수속', place: null, memo: null, category: '이동' }
]

// 날짜 목록 (참고용)
export const ITINERARY_DATES = [...new Set(ITINERARY_TEMPLATE.map((i) => i.date))]

// 도시 목록 (템플릿에 등장하는 순서대로, 템플릿 브라우저의 도시 탭 순서용)
export const ITINERARY_CITIES = [...new Set(ITINERARY_TEMPLATE.map((i) => i.city))]
