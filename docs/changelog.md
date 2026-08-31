# 변경 이력 (Changelog)

## 2026-08-31

### [디자인 및 텍스트 스타일 개선]
- **브랜드 로고 교체 및 30% 확대**:
  - 도약하는 활어/파도 그래픽과 영문 표기가 적용된 최신 브랜드 로고([`logo_pungeo_v5.png`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/logo_pungeo_v5.png)) 적용.
  - 가독성 향상을 위해 헤더 로고 크기를 `48px`에서 `62px`로 약 30% 확대 및 네비게이션 높이/텍스트 비율 최적화.
  - 관련 파일: [`Homepage.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Homepage.jsx), [`Admin.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Admin.jsx), [`index.html`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/index.html)
- **히어로 배너 헤드라인 색상 변경**:
  - `선도와 타협하지 않는` 문구 글자색을 신선하고 고급스러운 오션 블루(`#1D4ED8`)로 변경.
  - 관련 파일: [`Homepage.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Homepage.jsx)

### [네이버 및 구글 검색엔진 SEO 설정]
- **네이버 및 구글 서치어드바이저 / 서치콘솔 기본 파일 생성 및 소유권 인증 완료**:
  - [`robots.txt`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/robots.txt): 검색엔진 수집 허용(`Allow: /`), 관리자 페이지 제외(`Disallow: /admin`), sitemap.xml 경로 명시.
  - [`sitemap.xml`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/sitemap.xml): 대표 도메인 표준 XML 사이트맵 생성.
- **대표 URL 및 인증 태그 추가**:
  - [`index.html`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/index.html): `<link rel="canonical" ...>`, `<meta name="naver-site-verification" ...>`, `<meta name="google-site-verification" ...>` 추가.

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
- **1등 부산막회 실물 첨부 사진 강제 캐시 우회 적용**:
  - 기존 브라우저 이미지 캐시로 인한 미반영 문제 해결을 위해 이미지 경로에 캐시 우회 쿼리 파라미터(?v=3)를 적용하고 기본 이미지 파일([`menu_makhoe.jpg`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/menu_makhoe.jpg)) 및 신규 파일([`makhoe_real.jpg`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/makhoe_real.jpg)) 모두 첨부 실물 막회 사진으로 이중 강제 덮어쓰기 완료.

### [로그인 모달 UI/UX 전면 개편]
- **신규 작업 브랜치 생성**: `feature/stylish-auth-modal`
- **프리미엄 세련된 로그인 모달 디자인 반영**:
  - 풍어수산 골드 뱃지 브랜드 상단 헤더, 글래스모피즘 오버레이 및 트림 디자인 적용.
  - 비밀번호 숨김/보기 토글 버튼(`Eye`/`EyeOff`), 인풋 포커스 링 애니메이션, 탭 스위처 적용.
  - 👑 관리자 계정 자동입력 퀵 버튼 추가.
  - 관련 파일: [`AuthModal.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/AuthModal.jsx)




### [브랜드 로고 디자인 리뉴얼]
- **화이트 바탕 & 영문 브랜드 배너 로고 생성 및 캐시 우회 반영**:
  - 기존 48px 정사각형 크롭으로 인해 발생한 영문 텍스트 잘림 현상을 해결하기 위해 **가로형 화이트 바탕 배너 로고([`logo_pungeo_v4.png`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/public/logo_pungeo_v4.png))** 생성 및 적용.
  - 헤더/푸터([`Homepage.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Homepage.jsx)) 및 관리자 사이드바([`Admin.jsx`](file:///c:/Users/%EA%B3%BD%EA%B2%BD%EB%82%A8/Desktop/home%20page/home%20page/src/components/Admin.jsx)) 이미지 렌더링 스타일을 `objectFit: 'contain'`, `width: 'auto'`로 변경하여 화이트 바탕과 영문 명칭(`PUNGEO SUSAN (BUSAN CHEOTJIP)`)이 원본 그대로 선명하게 표시되도록 보장.





