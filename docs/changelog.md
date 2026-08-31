# 변경 이력 (Changelog)

## 2026-08-31

### [네이버 검색엔진 SEO 기본 설정]
- **네이버 서치어드바이저(Yeti 봇) 기본 파일 생성**:
  - [`robots.txt`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/robots.txt): 검색엔진 수집 허용(`Allow: /`), 관리자 페이지 제외(`Disallow: /admin`), sitemap.xml 경로 명시.
  - [`sitemap.xml`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/sitemap.xml): 대표 도메인 표준 XML 사이트맵 생성.
- **대표 URL(Canonical Tag) 지정**:
  - [`index.html`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/index.html): `<link rel="canonical" href="https://pungeosusan.com/" />` 추가.

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

### [브랜드 로고 디자인 리뉴얼]
- **화이트 바탕 & 영문 브랜드 배너 로고 생성 및 캐시 우회 반영**:
  - 기존 48px 정사각형 크롭으로 인해 발생한 영문 텍스트 잘림 현상을 해결하기 위해 **가로형 화이트 바탕 배너 로고([`logo_pungeo_v4.png`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/logo_pungeo_v4.png))** 생성 및 적용.
  - 헤더/푸터([`Homepage.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Homepage.jsx)) 및 관리자 사이드바([`Admin.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Admin.jsx)) 이미지 렌더링 스타일을 `objectFit: 'contain'`, `width: 'auto'`로 변경하여 화이트 바탕과 영문 명칭(`PUNGEO SUSAN (BUSAN CHEOTJIP)`)이 원본 그대로 선명하게 표시되도록 보장.





