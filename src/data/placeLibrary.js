// 여행지 라이브러리: 날짜와 무관한 "장소 정보 카드" 모음.
// 구조: PLACE_LIBRARY[나라][도시] = [ { title, place, info, note, fee, category }, ... ]
// - title: 목록에 보일 이름
// - place: 정확한 영문/현지 표기 (구글맵 검색 정확도를 높여줌, 없으면 title만 사용)
// - info: 한 줄 설명
// - note: 특이사항 (붐비는 시간, 예약 필요 여부 등)
// - fee: 입장료 (무료면 생략 가능) - 환율/정책 변동 가능성이 있어 방문 전 재확인 권장
// - category: 일정 추가 시 기본 카테고리

export const PLACE_LIBRARY = {
  포르투갈: {
    리스본: [
      { title: '벨렘탑', place: 'Torre de Belem, Lisbon', info: '유네스코 세계유산, 타구스강변의 대항해시대 요새', note: '오전 이른 시간 방문 시 대기 줄이 짧음', fee: '약 6유로', category: '관광' },
      { title: '제로니무스 수도원', place: 'Mosteiro dos Jeronimos, Lisbon', info: '마누엘 양식을 대표하는 대성당과 수도원', note: '내부 회랑이 특히 아름다움, 일요일 오전 무료 입장 시간 있음', fee: '약 10유로', category: '관광' },
      { title: '상 조르즈 성', place: 'Castelo de Sao Jorge, Lisbon', info: '리스본 시내와 강이 한눈에 보이는 언덕 위 성채', note: '일몰 시간대 전망이 좋음', fee: '약 15유로', category: '관광' },
      { title: '알파마 지구', place: 'Alfama, Lisbon', info: '좁은 골목과 파두(전통음악) 공연이 있는 구시가지', note: '28번 트램으로 지구 전체를 둘러볼 수 있음', fee: '무료', category: '관광' },
      { title: '아우구스타 개선문 & 코메르시우 광장', place: 'Arco da Rua Augusta, Lisbon', info: '리스본의 관문 역할을 하는 개선문과 강변 광장', note: '개선문 전망대는 별도 입장료', fee: '전망대 약 3유로', category: '관광' },
      { title: '파스텔 드 벨렝', place: 'Pasteis de Belem, Lisbon', info: '1837년부터 이어온 원조 에그타르트 가게', note: '항상 줄이 길지만 회전이 빨라 오래 기다리지 않음', fee: '무료입장 (음식값 별도)', category: '식사' },
      { title: '산타 주스타 엘리베이터', place: 'Elevador de Santa Justa, Lisbon', info: '19세기에 지어진 철제 전망 엘리베이터', note: '전망대까지 이용하려면 유료, 계단으로도 접근 가능', fee: '약 5.5유로', category: '관광' },
      { title: 'LX 팩토리', place: 'LX Factory, Lisbon', info: '옛 공장 지대를 개조한 편집숍과 카페 거리', note: '주말 빈티지 마켓이 열릴 때가 있음', fee: '무료', category: '쇼핑' }
    ],
    포르투: [
      { title: '동 루이스 1세 다리', place: 'Ponte Dom Luis I, Porto', info: '도루강을 가로지르는 2층 철제 다리, 포르투의 상징', note: '해 질 무렵 다리 위와 강변 야경이 특히 유명', fee: '무료', category: '관광' },
      { title: '렐루 서점', place: 'Livraria Lello, Porto', info: '해리포터에 영감을 준 것으로 알려진 목조 서점', note: '인터넷 사전 예매 필수, 대기 시간이 김', fee: '약 8유로 (도서 구매 시 차감)', category: '관광' },
      { title: '상벤투 기차역', place: 'Estacao de Sao Bento, Porto', info: '2만 장의 아줄레주 타일 벽화로 유명한 기차역', note: '실제 운행 중인 역이라 잠깐 들르기 좋음', fee: '무료', category: '관광' },
      { title: '포트와인 셀러 투어', place: 'Vila Nova de Gaia, Porto', info: '강 건너편 포트와인 저장고 지구, 시음 투어 운영', note: '여러 브랜드 중 선택 가능, 사전 예약 추천', fee: '약 15~25유로', category: '기타' },
      { title: '클레리구스 탑', place: 'Torre dos Clerigos, Porto', info: '포르투 시내 전체가 보이는 바로크 양식 종탑', note: '225개 계단, 좁아서 혼잡할 수 있음', fee: '약 6유로', category: '관광' },
      { title: '도루강 크루즈', place: 'Douro River Cruise, Porto', info: '포르투의 6개 다리를 도는 약 50분 유람선', note: '오후 시간대가 채광이 좋음', fee: '약 20유로', category: '관광' },
      { title: '볼량 시장', place: 'Mercado do Bolhao, Porto', info: '현지 식재료와 간단한 먹거리를 파는 재래시장', note: '리모델링 후 깔끔해짐, 점심시간 추천', fee: '무료입장', category: '식사' }
    ]
  },
  이탈리아: {
    밀라노: [
      { title: '밀라노 두오모', place: 'Duomo di Milano', info: '135개 첨탑을 가진 세계 3대 규모의 고딕 성당', note: '옥상 테라스 티켓은 계단과 엘리베이터 가격이 다름', fee: '약 10~15유로 (옥상 포함)', category: '관광' },
      { title: '비토리오 에마누엘레 2세 갤러리아', place: 'Galleria Vittorio Emanuele II, Milan', info: '19세기에 지어진 유리 지붕의 쇼핑 아케이드', note: '바닥의 황소 문양을 밟으면 행운이 온다는 전설', fee: '무료', category: '쇼핑' },
      { title: '최후의 만찬', place: 'Cenacolo Vinciano, Milan', info: '레오나르도 다빈치의 벽화가 있는 산타 마리아 델레 그라치에 성당', note: '몇 주 전 사전 예약 필수, 15분 단위 입장 통제', fee: '약 15유로', category: '관광' },
      { title: '스포르체스코 성', place: 'Castello Sforzesco, Milan', info: '밀라노 공국의 옛 성채, 여러 박물관이 모여있음', note: '정원은 무료, 박물관은 구역별 별도 요금', fee: '정원 무료 / 박물관 약 5유로', category: '관광' },
      { title: '스칼라 극장 박물관', place: 'Museo Teatrale alla Scala, Milan', info: '세계적으로 유명한 오페라 극장의 부속 박물관', note: '공연 없는 시간대엔 객석도 볼 수 있음', fee: '약 12유로', category: '관광' },
      { title: '나빌리오 운하 지구', place: 'Navigli, Milan', info: '운하를 따라 늘어선 바와 레스토랑 거리', note: '저녁 아페리티보(가벼운 술과 안주) 명소', fee: '무료', category: '식사' }
    ],
    피렌체: [
      { title: '피렌체 두오모', place: 'Cattedrale di Santa Maria del Fiore, Florence', info: '브루넬레스키의 돔으로 유명한 피렌체의 상징', note: '쿠폴라(돔) 등반은 예약 필수, 463계단', fee: '쿠폴라 포함 약 30유로', category: '관광' },
      { title: '우피치 미술관', place: 'Uffizi Gallery, Florence', info: '보티첼리 비너스의 탄생 등 르네상스 걸작 소장', note: '온라인 예약 시 대기 없이 입장 가능', fee: '약 25유로', category: '관광' },
      { title: '베키오 다리', place: 'Ponte Vecchio, Florence', info: '금세공품 상점이 늘어선 아르노강의 옛 다리', note: '일몰 시간대 사진 명소', fee: '무료', category: '관광' },
      { title: '미켈란젤로 광장', place: 'Piazzale Michelangelo, Florence', info: '피렌체 시내 전경을 한눈에 볼 수 있는 언덕', note: '일몰 무렵 가장 붐빔, 걸어 올라가면 20분 정도', fee: '무료', category: '관광' },
      { title: '아카데미아 미술관', place: 'Galleria dell Accademia, Florence', info: '미켈란젤로의 원본 다비드상이 있는 곳', note: '우피치와 마찬가지로 사전 예약 추천', fee: '약 16유로', category: '관광' },
      { title: '피티 궁전 & 보볼리 정원', place: 'Palazzo Pitti, Florence', info: '메디치 가문의 궁전과 이탈리아식 정원', note: '정원이 넓어 반나절 코스로도 가능', fee: '약 22유로', category: '관광' }
    ],
    로마: [
      { title: '콜로세움', place: 'Colosseum, Rome', info: '고대 로마의 원형 경기장, 로마 최고의 랜드마크', note: '포로 로마노 통합권으로 함께 구매 시 유리', fee: '약 18유로 (통합권)', category: '관광' },
      { title: '포로 로마노', place: 'Roman Forum, Rome', info: '고대 로마 정치와 경제의 중심지였던 유적지', note: '그늘이 적어 여름엔 오전 방문 추천', fee: '콜로세움 통합권에 포함', category: '관광' },
      { title: '판테온', place: 'Pantheon, Rome', info: '2000년 가까이 원형을 유지한 고대 로마 신전', note: '천장 원형 채광창(오쿨루스)이 특징', fee: '약 5유로', category: '관광' },
      { title: '트레비 분수', place: 'Trevi Fountain, Rome', info: '동전을 던지면 로마에 다시 온다는 전설의 분수', note: '이른 아침이 상대적으로 한산함', fee: '무료', category: '관광' },
      { title: '바티칸 박물관 & 시스티나 성당', place: 'Vatican Museums, Vatican City', info: '미켈란젤로의 천장화가 있는 세계 최대급 박물관', note: '사전 예약 강력 추천, 반나절 이상 소요', fee: '약 20~28유로', category: '관광' },
      { title: '성 베드로 대성당', place: 'St. Peters Basilica, Vatican City', info: '가톨릭 최대 규모의 대성당', note: '돔 전망대는 계단이나 엘리베이터로 별도 등반', fee: '성당 무료 / 돔 약 10유로', category: '관광' },
      { title: '트라스테베레 지구', place: 'Trastevere, Rome', info: '좁은 골목과 로컬 트라토리아가 많은 구시가지', note: '저녁 식사 후 산책하기 좋은 분위기', fee: '무료', category: '식사' }
    ]
  },
  일본: {
    후쿠오카: [
      { title: '다자이후 텐만구', place: 'Dazaifu Tenmangu, Fukuoka', info: '학문의 신을 모신 유서 깊은 신사', note: '시내에서 전철로 약 30분, 참배길 상점가도 볼거리', fee: '무료 (정원 등 일부 유료)', category: '관광' },
      { title: '캐널시티 하카타', place: 'Canal City Hakata, Fukuoka', info: '실내 운하가 흐르는 대형 쇼핑몰', note: '정시에 열리는 분수쇼가 볼만함', fee: '무료', category: '쇼핑' },
      { title: '오호리공원', place: 'Ohori Park, Fukuoka', info: '호수를 낀 시민 휴식 공간', note: '한 바퀴 산책 코스로 인기, 일본 정원은 별도 입장료', fee: '무료 (일본정원 약 250엔)', category: '관광' },
      { title: '나카스 야타이 거리', place: 'Nakasu Yatai, Fukuoka', info: '강변을 따라 늘어선 포장마차촌', note: '저녁 시간대에만 운영, 라멘과 오뎅이 유명', fee: '식사비 별도', category: '식사' },
      { title: '후쿠오카타워', place: 'Fukuoka Tower', info: '해변가에 위치한 전망 타워', note: '노을 시간대 전망이 아름다움', fee: '약 800엔', category: '관광' },
      { title: '모모치 해변', place: 'Momochi Beach, Fukuoka', info: '후쿠오카타워 옆 인공 해변', note: '산책과 일몰 감상에 좋음', fee: '무료', category: '관광' }
    ]
  },
  홍콩: {
    홍콩: [
      { title: '빅토리아 피크', place: 'Victoria Peak, Hong Kong', info: '피크트램을 타고 오르는 홍콩 최고의 야경 명소', note: '주말이나 저녁엔 트램 대기가 길어 평일 오전 추천', fee: '트램+전망대 약 99홍콩달러~', category: '관광' },
      { title: '스타의 거리 & 심포니 오브 라이츠', place: 'Avenue of Stars, Tsim Sha Tsui', info: '침사추이 해변 산책로, 매일 저녁 라이트쇼 진행', note: '건너편 센트럴 스카이라인이 한눈에 보임', fee: '무료', category: '관광' },
      { title: '몽콕 야시장', place: 'Ladies Market, Mongkok', info: '기념품과 의류 등을 파는 대표적인 야시장', note: '가격 흥정이 일반적, 저녁부터 붐빔', fee: '무료입장', category: '쇼핑' },
      { title: '만모사원', place: 'Man Mo Temple, Hong Kong', info: '문신과 무신을 모신 도교 사원', note: '천장에 매달린 대형 향이 특징', fee: '무료', category: '관광' },
      { title: '센트럴-미드레벨 에스컬레이터', place: 'Central Mid-Levels Escalators', info: '세계에서 가장 긴 야외 에스컬레이터', note: '오전과 오후로 운행 방향이 바뀜', fee: '무료', category: '관광' },
      { title: '딤섬 맛집 투어', place: 'Tim Ho Wan, Hong Kong', info: '미쉐린 스타를 받았던 서민적인 딤섬 전문점', note: '지점마다 대기시간 차이가 큼', fee: '식사비 별도', category: '식사' }
    ]
  },
  싱가포르: {
    싱가포르: [
      { title: '마리나베이 샌즈 스카이파크', place: 'Marina Bay Sands SkyPark', info: '세 개 타워를 잇는 스카이파크 전망대', note: '일몰 시간대가 가장 인기, 인피니티 풀은 투숙객 전용', fee: '약 26싱가포르달러', category: '관광' },
      { title: '가든스 바이 더 베이', place: 'Gardens by the Bay, Singapore', info: '슈퍼트리와 실내 식물원으로 유명한 미래형 정원', note: '클라우드포레스트와 플라워돔은 별도 유료', fee: '슈퍼트리그로브 무료 / 돔 약 32싱가포르달러', category: '관광' },
      { title: '머라이언 파크', place: 'Merlion Park, Singapore', info: '싱가포르의 상징인 머라이언 동상이 있는 공원', note: '마리나베이 샌즈와 함께 사진 찍기 좋은 각도', fee: '무료', category: '관광' },
      { title: '센토사 섬', place: 'Sentosa Island, Singapore', info: '테마파크와 해변이 모여있는 리조트 섬', note: '케이블카 또는 모노레일로 이동, 시설별 요금 상이', fee: '입도 무료 (시설별 별도)', category: '관광' },
      { title: '차이나타운', place: 'Chinatown, Singapore', info: '전통 사원과 로컬 맛집이 밀집한 구역', note: '스리 마리암만 사원 등 무료 개방', fee: '무료', category: '식사' },
      { title: '클락키', place: 'Clarke Quay, Singapore', info: '싱가포르강 변의 야경 명소, 바와 레스토랑 밀집', note: '저녁 이후 분위기가 가장 좋음', fee: '무료', category: '기타' }
    ]
  }
}

// 나라 탭 순서
export const LIBRARY_COUNTRIES = Object.keys(PLACE_LIBRARY)
