# 변경 이력 (Changelog)

## 2026-08-25

### [보안 및 네비게이션 개편]
- **관리자페이지 헤더 링크 제거**:
  - 헤더 네비게이션(데스크톱 및 모바일)에서 '관리자페이지' 버튼 제거 완료.
  - `/admin` 경로(URL 직접 입력: `http://localhost:5173/admin` 또는 `http://localhost:5173/#admin`)를 통해서만 관리자 페이지에 접속 가능하도록 변경.
  - 관련 파일: [`Homepage.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Homepage.jsx)

### [메뉴 가이드 개편]
- **인어교주해적단 실제 상점(store/0000000157) 메뉴 데이터 동기화**:
  - 1등 부산막회(대광어 3kg+), 풍어 오마카세, 프리미엄 활모둠회(10% 할인), 프리미엄 줄무늬전갱이모둠회, 도다리세꼬시, 미삼회, 광참우회, 명품 민어 모둠회 동기화.
- **메뉴 고화질 사진 등록 및 사용자 실물 민어모둠회 사진 반영**:
  - `명품 민어 모둠회 / 민어회` 카드에 사용자 첨부 실물 사진 ([`minae_modumhoe.jpg`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/minae_modumhoe.jpg)) 등록.
- **풍어 오마카세 회 실물 사진 브라우저 캐시 우회 반영**:
  - 기존 동명의 이미지 파일명 캐싱으로 인한 브라우저 미갱신 문제 해결을 위해 신규 파일 경로([`omakase_real.jpg`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/omakase_real.jpg))로 변경 적용.




