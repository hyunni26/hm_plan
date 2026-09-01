export const COUNTRY_NAMES = {
  portugal: '포르투갈',
  italy: '이탈리아'
}

// cities 목록(등록 순서 = sort_order 기준)에서 등장하는 나라를 중복 없이
// "포르투갈 & 이탈리아" 형태로 만들어준다. cities 테이블만 바뀌면 자동 반영됨.
export function buildCountryLabel(cities) {
  const uniqueCountries = [...new Set(cities.map((c) => c.country))]
  const names = uniqueCountries.map((code) => COUNTRY_NAMES[code] ?? code)
  return names.join(' & ')
}
