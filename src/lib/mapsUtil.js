// 장소명 + 도시명으로 구글맵 "검색" 링크를 만든다.
// place_id 없이도 항상 정확하게 그 장소를 찾아주는 안전한 방식.
export function buildGoogleMapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
