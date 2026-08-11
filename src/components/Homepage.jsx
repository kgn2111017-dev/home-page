import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Clock, Star, Menu, LogIn, UserPlus, 
  LogOut, Compass, Award, Utensils, ShieldCheck, ChevronRight, 
  ChevronLeft, MessageSquare, UserCheck, Activity
} from 'lucide-react';
import heroOwners from '../assets/hero_owners.png';
import heroSashimi1 from '../assets/hero_sashimi1.png';
import heroSashimi2 from '../assets/hero_sashimi2.png';

export default function Homepage({ user, onLogout, onOpenAuth, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const slides = [
    { id: 1, img: '/h1.jpg', alt: '풍어수산 메인 1', objectPosition: 'center' },
    { id: 2, img: '/h2.jpg', alt: '풍어수산 메인 2', objectPosition: 'center' },
    { id: 3, img: '/h3.jpg', alt: '풍어수산 메인 3', objectPosition: 'center' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const categories = [
    { id: 'all', label: '전체 메뉴' },
    { id: 'signature', label: '시그니처' },
    { id: 'classic', label: '클래식 활어' },
    { id: 'seasonal', label: '제철 모둠회' },
    { id: 'vip', label: 'VIP 오마카세' },
  ];

  const menus = [
    {
      id: 1,
      category: 'signature',
      name: '프리미엄 활모둠회',
      desc: '광어, 국산 참돔, 연어 등 제철 활어로 다채롭게 구성한 풍어수산의 시그니처 메뉴',
      price: '65,000원 ~',
      tag: '대표 시그니처',
      stars: 4.9,
      reviews: 421
    },
    {
      id: 2,
      category: 'classic',
      name: '프리미엄 광참우회',
      desc: '명품 대광어, 국산 참돔, 찰진 우럭만을 골라 담은 클래식 활어회의 극치',
      price: '70,000원 ~',
      tag: '인기 활어',
      stars: 4.8,
      reviews: 219
    },
    {
      id: 3,
      category: 'seasonal',
      name: '프리미엄 줄무늬전갱이 모둠회',
      desc: '사각사각한 식감과 고급스러운 기름진 맛이 일품인 최고급 줄무늬전갱이 조합',
      price: '75,000원 ~',
      tag: '제철 추천',
      stars: 5.0,
      reviews: 184
    },
    {
      id: 4,
      name: '풍어 오마카세 회',
      desc: '당일 수산시장 최고의 선도를 자랑하는 최고급 어종만을 셰프가 직접 엄선한 스페셜 코스',
      price: '90,000원 ~',
      tag: 'VIP',
      stars: 5.0,
      reviews: 98
    }
  ];

  const highlights = [
    {
      icon: <ShieldCheck size={28} className="text-gradient" />,
      title: '당일 활어 즉시 손질',
      desc: '고급활어를 최적의 숙성과정을 거쳐, 손질후, 주문시간에 맞추어 순살중량제로 제공됩니다.'
    },
    {
      icon: <Utensils size={28} className="text-gradient" />,
      title: '2층 초장집 연계 식사',
      desc: '1층 풍어수산에서 신선한 회를 직접 고르신 후, 2층 식당가에서 쾌적하고 편안하게 드실 수 있습니다.'
    },
    {
      icon: <Compass size={28} className="text-gradient" />,
      title: '인어교주해적단 프리미엄',
      desc: '수산물 전문 플랫폼인 인어교주해적단 공식 제휴점으로 전국 어디서든 검증된 퀄리티를 보장합니다.'
    }
  ];

  const reviews = [
    {
      user: '김*현 (네이버 예약)',
      rating: 5,
      content: '부모님 생신이라 오마카세 포장했는데 진짜 감탄했습니다. 두께도 두툼하고 선도가 장난 아니네요. 앞으로 회는 무조건 여기서만 먹기로 약속했습니다.',
      date: '3일 전'
    },
    {
      user: '이*우 (인어교주해적단)',
      rating: 5,
      content: '줄무늬전갱이 모둠회 포장했는데 주차권도 챙겨주시고 매운탕거리도 엄청 푸짐해요! 광어 지느러미도 가득 넣어주셔서 배터지게 먹었습니다. 마포시장 원탑!',
      date: '1주일 전'
    },
    {
      user: '정*은 (네이버 리뷰)',
      rating: 5,
      content: '항상 웃으시면서 친절하게 맞이해주셔서 갈 때마다 기분 좋아요. 회 양도 정말 많고 쌈장도 수제인지 너무 맛있습니다. 2층 초장집에서 바로 먹기 딱 좋음.',
      date: '2주일 전'
    }
  ];

  return (
    <div style={styles.page}>
      {/* Navigation Header */}
      <header style={styles.header} className="glass">
        <div style={styles.navContainer} className="container">
          <div style={styles.logo} onClick={() => onNavigate('home')}>
            <span style={styles.logoText} className="text-gradient">풍어수산</span>
            <span style={styles.logoSubtext}>부산첫집</span>
          </div>

          <nav className="desktop-nav" style={styles.desktopNav}>
            <a href="#menu" style={styles.navLink}>메뉴안내</a>
            <a href="#features" style={styles.navLink}>우리의 고집</a>
            <a href="#location" style={styles.navLink}>찾아오시는 길</a>
            <button 
              onClick={() => onNavigate('admin')} 
              style={{...styles.navLink, color: 'var(--accent-gold)', fontWeight: '600'}}
            >
              관리자페이지
            </button>
          </nav>

          <div style={styles.authButtons}>
            {user ? (
              <div style={styles.userInfo}>
                <span style={styles.userBadge}>
                  <UserCheck size={14} style={{marginRight: 4}} />
                  {user.name} 님 ({user.grade})
                </span>
                <button onClick={onLogout} style={styles.iconBtn} title="로그아웃">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button onClick={onOpenAuth} style={styles.loginBtn}>
                  <LogIn size={16} />
                  <span>로그인</span>
                </button>
              </>
            )}
            <button 
              className="mobile-toggle"
              style={styles.mobileMenuToggle} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-nav" style={styles.mobileNav}>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} style={styles.mobileLink}>메뉴안내</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} style={styles.mobileLink}>우리의 고집</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} style={styles.mobileLink}>찾아오시는 길</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('admin'); }} 
              style={{...styles.mobileLink, color: 'var(--accent-gold)', width: '100%', textAlign: 'left'}}
            >
              관리자페이지
            </button>
          </div>
        )}
      </header>

      {/* Hero Banner Section */}
      <section style={styles.heroSection}>
        <div className="container hero-grid" style={styles.heroContainer}>
          <div style={styles.heroTextBox}>
            <div style={styles.heroBadge}>
              <Award size={14} style={{color: 'var(--accent-gold)'}} />
              <span>마포농수산물시장 1층 3301호 | 30년 전통</span>
            </div>
            <h1 style={styles.heroTitle} className="font-serif">
              선도와 타협하지 않는<br />
              <span className="text-gradient">풍어수산 (부산첫집)</span>
            </h1>
            <p style={styles.heroSubtitle}>
              동해와 남해 최고의 산지에서 당일 직송된 활어만을 사용하여 비교할 수 없는 두툼함과 최상의 단맛을 선사합니다. 인어교주해적단 공식 프리미엄 인증 제휴 매장.
            </p>
            
            <div style={styles.ctaGroup}>
              <a 
                href="https://tpirates.com/store/0000000157" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                인어교주 배달/주문 <ChevronRight size={16} />
              </a>
              <a 
                href="https://naver.me/GEd4WLhg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold"
              >
                네이버 예약하기 <ChevronRight size={16} />
              </a>
              <a href="tel:02-373-7887" className="btn btn-secondary" style={{backgroundColor: '#FFFFFF'}}>
                <Phone size={16} /> 전화 주문
              </a>
            </div>
          </div>
          
          <div style={styles.heroImageWrapper}>
            <div style={styles.sliderContainer}>
              {slides.map((slide, idx) => (
                <div 
                  key={slide.id} 
                  style={{
                    ...styles.slide, 
                    opacity: idx === activeSlide ? 1 : 0,
                    zIndex: idx === activeSlide ? 2 : 1,
                    visibility: idx === activeSlide ? 'visible' : 'hidden',
                  }}
                >
                  <img 
                    src={slide.img} 
                    alt={slide.alt} 
                    className={idx === activeSlide ? 'kenburns-active' : ''}
                    style={{
                      ...styles.heroImgNew,
                      objectPosition: slide.objectPosition
                    }} 
                  />
                </div>
              ))}
              
              <button 
                onClick={handlePrevSlide} 
                style={styles.sliderArrowLeft}
                aria-label="이전 사진"
                className="slider-arrow-btn"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextSlide} 
                style={styles.sliderArrowRight}
                aria-label="다음 사진"
                className="slider-arrow-btn"
              >
                <ChevronRight size={20} />
              </button>

              <div style={styles.sliderDots}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }}
                    style={{
                      ...styles.sliderDot,
                      backgroundColor: idx === activeSlide ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.4)',
                      width: idx === activeSlide ? '24px' : '8px',
                    }}
                    className="slider-dot"
                    aria-label={`${idx + 1}번째 사진 보기`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Our Philosophy Section */}
      <section id="features" style={styles.featuresSection} className="container">
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>OUR PHILOSOPHY</span>
          <h2 style={styles.sectionTitle} className="font-serif">풍어수산이 약속하는 3가지 고집</h2>
          <p style={styles.sectionSubtitle}>어설픈 가격 타협보다 완벽한 회 맛으로 보답하겠습니다.</p>
        </div>

        <div style={styles.featuresGrid}>
          {highlights.map((h, i) => (
            <div key={i} className="card hover-bounce glass-card" style={styles.featureCard}>
              <div style={styles.featureIconBg}>{h.icon}</div>
              <h3 style={styles.featureCardTitle} className="font-serif">{h.title}</h3>
              <p style={styles.featureCardDesc}>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Guide Section */}
      <section id="menu" style={styles.menuSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>PREMIUM SELECTION</span>
            <h2 style={styles.sectionTitle} className="font-serif">대표 명품 메뉴</h2>
            <p style={styles.sectionSubtitle}>매일 아침 가장 물 좋은 생선으로 엄선하여 최적의 두께로 썰어냅니다.</p>
          </div>

          {/* Menu Category Filter Tabs */}
          <div style={styles.categoryFilterContainer}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  ...styles.categoryTab,
                  ...(selectedCategory === cat.id ? styles.categoryTabActive : {})
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={styles.menuGrid}>
            {(selectedCategory === 'all' ? menus : menus.filter(m => m.category === selectedCategory)).map((m) => (
              <div key={m.id} className="card hover-bounce" style={styles.menuCard}>
                <div style={styles.menuCardTop}>
                  <span style={styles.menuTag}>{m.tag}</span>
                  <div style={styles.menuRating}>
                    <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={styles.ratingVal}>{m.stars}</span>
                    <span style={styles.reviewCount}>({m.reviews})</span>
                  </div>
                </div>
                
                <h3 style={styles.menuName} className="font-serif">{m.name}</h3>
                <p style={styles.menuDesc}>{m.desc}</p>
                
                <div style={styles.menuFooter}>
                  <div style={styles.priceContainer}>
                    <span style={styles.priceLabel}>권장시세</span>
                    <span style={styles.priceVal} className="font-number">{m.price}</span>
                  </div>
                  <a 
                    href="https://tpirates.com/store/0000000157" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline" 
                    style={styles.menuOrderBtn}
                  >
                    주문하기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section style={styles.reviewsSection} className="container">
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>REAL REVIEWS</span>
          <h2 style={styles.sectionTitle}>고객님들의 생생한 리뷰</h2>
          <p style={styles.sectionSubtitle}>네이버 및 인어교주해적단 앱에서 직접 작성해주신 실제 만족도입니다.</p>
        </div>

        <div style={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <div key={i} className="card" style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <span style={styles.reviewUser}>{r.user}</span>
                <span style={styles.reviewDate}>{r.date}</span>
              </div>
              <div style={styles.starsRow}>
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} size={15} fill="var(--accent-gold)" color="var(--accent-gold)" />
                ))}
              </div>
              <p style={styles.reviewContent}>"{r.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Map Location Section */}
      <section id="location" style={styles.locationSection}>
        <div className="container location-grid" style={styles.locationContainer}>
          <div style={styles.locationInfoPanel}>
            <span style={styles.sectionBadge}>CONTACT & LOCATION</span>
            <h2 style={{...styles.sectionTitle, textAlign: 'left', marginBottom: '24px'}}>풍어수산 오시는 길</h2>
            
            <div style={styles.infoRow}>
              <MapPin size={20} style={{color: 'var(--accent-color)', flexShrink: 0}} />
              <div>
                <h4 style={styles.infoLabel}>매장 주소</h4>
                <p style={styles.infoValue}>서울특별시 마포구 월드컵로 235 마포농수산물시장 1층 3301호</p>
                <p style={styles.infoSubValue}>(월드컵경기장역 1번 출구에서 경기장 남문 맞은편 방향 300m)</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <Clock size={20} style={{color: 'var(--accent-color)', flexShrink: 0}} />
              <div>
                <h4 style={styles.infoLabel}>영업 시간</h4>
                <p style={styles.infoValue}>매일 09:00 - 21:00 (연중무휴)</p>
                <p style={styles.infoSubValue}>(1층 수산코너 주문은 20:30까지 가능합니다)</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <Phone size={20} style={{color: 'var(--accent-color)', flexShrink: 0}} />
              <div>
                <h4 style={styles.infoLabel}>예약 및 퀵 문의</h4>
                <p style={styles.infoValue} style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-color)'}} className="font-number">
                  02-373-7887
                </p>
              </div>
            </div>

            <div style={{marginTop: '20px', display: 'flex', gap: '12px'}}>
              <a href="tel:02-373-7887" className="btn btn-primary">
                전화 바로 걸기
              </a>
              <a 
                href="https://naver.me/GEd4WLhg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                네이버 지도에서 보기
              </a>
            </div>
          </div>

          <div style={styles.mapMockPanel}>
            {/* Visual simulation of Naver Maps */}
            <div style={styles.mapHeader}>
              <div style={styles.mapIndicator}>
                <div style={styles.dot}></div>
                <span>풍어수산(부산첫집) 위치</span>
              </div>
              <span style={styles.mapMarketBadge}>마포농수산물시장 1층</span>
            </div>
            
            <div style={styles.mapGraphic}>
              {/* Abstract minimalist map drawing representing Noryangjin/Mapo market structures */}
              <div style={styles.mapRoad1}>월드컵로 (World Cup-ro)</div>
              <div style={styles.mapRoad2}>마포구청 사거리 방면</div>
              <div style={styles.marketBuilding}>
                <div style={styles.marketName}>마포농수산물시장</div>
                <div style={styles.marketStoreHighlight}>
                  <MapPin size={24} fill="var(--accent-color)" color="#FFF" />
                  <span style={styles.storePulse}></span>
                  <div style={styles.storeNameBox}>풍어수산 [3301호]</div>
                </div>
              </div>
              <div style={styles.mapStation}>월드컵경기장역 1번 출구</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo} className="text-gradient">풍어수산 (부산첫집)</h3>
            <p style={styles.footerTagline}>최고의 선도, 프리미엄 활어회 전문 브랜드</p>
          </div>
          <div style={styles.footerMeta}>
            <p>대표자: 이연순 | 사업자등록번호: 105-18-54215</p>
            <p>매장전화: 02-373-7887 | 주소: 서울특별시 마포구 월드컵로 235 마포농수산물시장 1층 3301호</p>
            <p style={styles.copyright}>© 2026 PungeoSusan. All rights reserved. Powered by Antigravity IDE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-normal)',
  },
  navContainer: {
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '1.4rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    lineHeight: '1.2',
  },
  logoSubtext: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  desktopNav: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    transition: 'var(--transition-fast)',
    borderBottom: '2px solid transparent',
    padding: '4px 0',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  userBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: '1px solid var(--border-color)',
  },
  iconBtn: {
    padding: '8px',
    borderRadius: '50%',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    backgroundColor: '#FFFFFF',
    transition: 'var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'var(--accent-color)',
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.88rem',
    fontWeight: '500',
    boxShadow: '0 4px 10px rgba(217, 88, 41, 0.2)',
    transition: 'var(--transition-fast)',
  },
  mobileMenuToggle: {
    display: 'none',
    padding: '6px',
    color: 'var(--text-primary)',
  },
  mobileNav: {
    display: 'none',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-card)',
    borderBottom: '1px solid var(--border-color)',
    padding: '12px 24px',
    gap: '12px',
  },
  mobileLink: {
    fontSize: '1rem',
    fontWeight: '500',
    padding: '6px 0',
    color: 'var(--text-secondary)',
  },
  
  /* Hero Banner Styles */
  heroSection: {
    backgroundColor: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-color)',
    position: 'relative',
    overflow: 'hidden',
    padding: '60px 0',
  },
  heroContainer: {
    height: '100%',
  },
  heroTextBox: {
    animation: 'fadeIn var(--transition-slow) forwards',
    zIndex: 5,
  },
  heroImageWrapper: {
    width: '100%',
    height: '460px',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    border: '3px solid var(--accent-gold)',
    position: 'relative',
    zIndex: 5,
    animation: 'fadeIn var(--transition-slow) forwards',
  },
  heroImgNew: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity var(--transition-slow) ease-in-out, visibility var(--transition-slow) ease-in-out',
  },
  sliderArrowLeft: {
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all var(--transition-fast)',
  },
  sliderArrowRight: {
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all var(--transition-fast)',
  },
  sliderDots: {
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 38, 33, 0.4)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-full)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },
  sliderDot: {
    height: '8px',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-normal)',
    padding: 0,
    border: 'none',
    cursor: 'pointer',
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-full)',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: '700',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '3.1rem',
    fontWeight: '900',
    lineHeight: '1.25',
    color: 'var(--text-primary)',
    marginBottom: '20px',
    letterSpacing: '-1.5px',
  },
  heroSubtitle: {
    fontSize: '1.08rem',
    color: 'var(--text-secondary)',
    marginBottom: '32px',
    lineHeight: '1.7',
  },
  ctaGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },

  /* Section Header */
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '650px',
    margin: '0 auto 52px',
  },
  sectionBadge: {
    fontSize: '0.78rem',
    fontWeight: '800',
    color: 'var(--accent-gold)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  },
  sectionTitle: {
    fontSize: '2.1rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '14px',
    letterSpacing: '-0.8px',
  },
  sectionSubtitle: {
    fontSize: '0.98rem',
    color: 'var(--text-secondary)',
  },

  /* Highlights Section */
  featuresSection: {
    padding: '80px 24px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px 28px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-color)',
  },
  featureIconBg: {
    width: '64px',
    height: '64px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  featureCardTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: 'var(--text-primary)',
  },
  featureCardDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },

  /* Menu Section */
  menuSection: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '88px 24px',
    borderTop: '1px solid var(--border-color)',
    borderBottom: '1px solid var(--border-color)',
  },
  categoryFilterContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '40px',
  },
  categoryTab: {
    padding: '10px 20px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: '#FFFFFF',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    boxShadow: 'var(--shadow-sm)',
  },
  categoryTabActive: {
    backgroundColor: 'var(--accent-color)',
    color: '#FFFFFF',
    borderColor: 'var(--accent-color)',
    boxShadow: '0 4px 14px rgba(217, 88, 41, 0.3)',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  menuCard: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  menuCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  menuTag: {
    backgroundColor: 'rgba(219, 88, 41, 0.08)',
    color: 'var(--accent-color)',
    fontSize: '0.72rem',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid rgba(219, 88, 41, 0.2)',
  },
  menuRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ratingVal: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  reviewCount: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  menuName: {
    fontSize: '1.25rem',
    fontWeight: '800',
    marginBottom: '10px',
    color: 'var(--text-primary)',
  },
  menuDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    marginBottom: '24px',
    flexGrow: 1,
  },
  menuFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 'auto',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '16px',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  priceVal: {
    fontSize: '1.18rem',
    fontWeight: '800',
    color: 'var(--accent-color)',
  },
  menuOrderBtn: {
    padding: '8px 16px',
    fontSize: '0.82rem',
  },

  /* Reviews Section */
  reviewsSection: {
    padding: '88px 24px',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  reviewCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-color)',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  reviewUser: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  reviewDate: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },
  starsRow: {
    display: 'flex',
    gap: '2px',
    marginBottom: '12px',
  },
  reviewContent: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },

  /* Location Section */
  locationSection: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    padding: '88px 24px',
  },
  locationContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
  },
  locationInfoPanel: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  infoRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '28px',
  },
  infoLabel: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  infoSubValue: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  
  /* Map mock graphic (minimal SVG architecture style) */
  mapMockPanel: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    height: '420px',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column',
  },
  mapHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  mapIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.88rem',
    fontWeight: '700',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-color)',
  },
  mapMarketBadge: {
    backgroundColor: 'var(--bg-secondary)',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
  },
  mapGraphic: {
    backgroundColor: '#ECE7DB',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapRoad1: {
    position: 'absolute',
    left: '10%',
    top: '30%',
    width: '80%',
    height: '48px',
    backgroundColor: '#DCD4C4',
    borderTop: '2px dashed #C8BCA6',
    borderBottom: '2px dashed #C8BCA6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8C7E6F',
    fontWeight: '600',
    fontSize: '0.75rem',
    transform: 'rotate(-5deg)',
  },
  mapRoad2: {
    position: 'absolute',
    left: '70%',
    top: 0,
    width: '40px',
    height: '100%',
    backgroundColor: '#DCD4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8C7E6F',
    fontWeight: '600',
    fontSize: '0.75rem',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
  },
  marketBuilding: {
    position: 'absolute',
    left: '20%',
    top: '55%',
    width: '50%',
    height: '120px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #CCA250',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-sm)',
  },
  marketName: {
    fontSize: '0.88rem',
    fontWeight: '800',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  },
  marketStoreHighlight: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  storePulse: {
    position: 'absolute',
    top: 0,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(217, 88, 41, 0.4)',
    zIndex: 1,
    animation: 'pulseSubtle 2s infinite',
  },
  storeNameBox: {
    position: 'absolute',
    top: '28px',
    backgroundColor: 'var(--text-primary)',
    color: '#FFFFFF',
    fontSize: '0.72rem',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
    zIndex: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },
  mapStation: {
    position: 'absolute',
    left: '5%',
    top: '10%',
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: 'var(--radius-full)',
  },

  /* Footer Section */
  footer: {
    backgroundColor: 'var(--text-primary)',
    color: '#ECE5DB',
    padding: '60px 24px',
    borderTop: '2px solid var(--accent-gold)',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  footerBrand: {
    borderBottom: '1px solid #483E36',
    paddingBottom: '20px',
  },
  footerLogo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    marginBottom: '8px',
  },
  footerTagline: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
  },
  footerMeta: {
    fontSize: '0.8rem',
    color: '#A89B8F',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  copyright: {
    marginTop: '16px',
    fontSize: '0.75rem',
    color: '#807266',
  }
};
