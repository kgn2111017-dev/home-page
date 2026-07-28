import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, TrendingUp, UserPlus, Award, 
  Search, Filter, RefreshCw, Download, ArrowLeft,
  DollarSign, ShoppingCart, Calendar, SlidersHorizontal, ChevronRight
} from 'lucide-react';

export default function Admin({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Real-time client simulation state
  const [liveRegistrations, setLiveRegistrations] = useState([
    { id: 1, name: '이*민', time: '12초 전', action: '회원 가입', amount: '-' },
    { id: 2, name: '김*현', time: '1분 전', action: '구매 완료', amount: '85,000원' },
    { id: 3, name: '박*서', time: '3분 전', action: '회원 가입', amount: '-' },
    { id: 4, name: '정*우', time: '8분 전', action: '구매 완료', amount: '120,000원' }
  ]);

  // Core Customer Database
  const initialCustomers = [
    { id: 1, name: '김철수', email: 'chulsoo@naver.com', gender: '남', age: '30대', grade: 'VIP', freq: 8, spend: 750000, points: 15000, date: '2026-07-14' },
    { id: 2, name: '이영희', email: 'younghee@daum.net', gender: '여', age: '20대', grade: 'GOLD', freq: 4, spend: 320000, points: 6400, date: '2026-07-13' },
    { id: 3, name: '박지성', email: 'jisung@gmail.com', gender: '남', age: '40대', grade: 'VVIP', freq: 15, spend: 1650000, points: 49500, date: '2026-07-14' },
    { id: 4, name: '최민수', email: 'minsu@naver.com', gender: '남', age: '50대 이상', grade: 'SILVER', freq: 2, spend: 130000, points: 1300, date: '2026-07-08' },
    { id: 5, name: '정소희', email: 'sohee99@gmail.com', gender: '여', age: '20대', grade: 'SILVER', freq: 1, spend: 65000, points: 650, date: '2026-07-11' },
    { id: 6, name: '강호동', email: 'hodong@kbs.co.kr', gender: '남', age: '40대', grade: 'VIP', freq: 9, spend: 980000, points: 19600, date: '2026-07-14' },
    { id: 7, name: '유재석', email: 'jaeseok@sbs.co.kr', gender: '남', age: '50대 이상', grade: 'VVIP', freq: 18, spend: 2100000, points: 84000, date: '2026-07-12' },
    { id: 8, name: '송혜교', email: 'hyekyo@naver.com', gender: '여', age: '40대', grade: 'VIP', freq: 7, spend: 810000, points: 16200, date: '2026-07-10' },
    { id: 9, name: '한소희', email: 'sohee_han@gmail.com', gender: '여', age: '20대', grade: 'GOLD', freq: 5, spend: 410000, points: 8200, date: '2026-07-14' },
    { id: 10, name: '공유', email: 'gongyoo@daum.net', gender: '남', age: '30대', grade: 'GOLD', freq: 3, spend: 290000, points: 5800, date: '2026-07-05' },
    { id: 11, name: '김태희', email: 'taehee@naver.com', gender: '여', age: '40대', grade: 'VIP', freq: 8, spend: 890000, points: 17800, date: '2026-07-13' },
    { id: 12, name: '손예진', email: 'yejin@daum.net', gender: '여', age: '30대', grade: 'VVIP', freq: 12, spend: 1350000, points: 40500, date: '2026-07-14' },
    { id: 13, name: '현빈', email: 'hyunbin@naver.com', gender: '남', age: '30대', grade: 'VIP', freq: 6, spend: 680000, points: 13600, date: '2026-07-11' },
    { id: 14, name: '장동건', email: 'donggun@gmail.com', gender: '남', age: '50대 이상', grade: 'GOLD', freq: 4, spend: 380000, points: 7600, date: '2026-07-02' },
    { id: 15, name: '원빈', email: 'wonbin@naver.com', gender: '남', age: '40대', grade: 'SILVER', freq: 1, spend: 90000, points: 900, date: '2026-06-28' }
  ];

  // Dynamic filter states
  const [filterGender, setFilterGender] = useState('All');
  const [filterAge, setFilterAge] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [filterFreq, setFilterFreq] = useState('All');
  const [filterSpend, setFilterSpend] = useState('All');

  // Customer DB state
  const [customers, setCustomers] = useState(initialCustomers);

  // Live Registration Simulator Effect
  useEffect(() => {
    const names = ['장*서', '최*우', '임*은', '강*지', '신*민', '윤*호'];
    const actions = ['회원 가입', '구매 완료'];
    const amounts = ['-', '65,000원', '70,000원', '90,000원', '130,000원'];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomAmount = randomAction === '구매 완료' ? amounts[Math.floor(Math.random() * (amounts.length - 1)) + 1] : '-';
      
      const newReg = {
        id: Date.now(),
        name: randomName,
        time: '방금 전',
        action: randomAction,
        amount: randomAmount
      };

      setLiveRegistrations(prev => [newReg, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Filter application
  useEffect(() => {
    let filtered = initialCustomers;

    // Filter by Search term
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.includes(searchTerm) || c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Gender Filter
    if (filterGender !== 'All') {
      filtered = filtered.filter(c => c.gender === filterGender);
    }

    // Age Filter
    if (filterAge !== 'All') {
      filtered = filtered.filter(c => c.age === filterAge);
    }

    // Grade Filter
    if (filterGrade !== 'All') {
      filtered = filtered.filter(c => c.grade === filterGrade);
    }

    // Frequency Filter
    if (filterFreq !== 'All') {
      if (filterFreq === 'High') filtered = filtered.filter(c => c.freq >= 9);
      else if (filterFreq === 'Medium') filtered = filtered.filter(c => c.freq >= 4 && c.freq <= 8);
      else if (filterFreq === 'Low') filtered = filtered.filter(c => c.freq < 4);
    }

    // Spend Filter
    if (filterSpend !== 'All') {
      if (filterSpend === 'High') filtered = filtered.filter(c => c.spend >= 1000000);
      else if (filterSpend === 'Medium') filtered = filtered.filter(c => c.spend >= 300000 && c.spend < 1000000);
      else if (filterSpend === 'Low') filtered = filtered.filter(c => c.spend < 300000);
    }

    setCustomers(filtered);
  }, [searchTerm, filterGender, filterAge, filterGrade, filterFreq, filterSpend]);

  // Reset Filters helper
  const resetFilters = () => {
    setSearchTerm('');
    setFilterGender('All');
    setFilterAge('All');
    setFilterGrade('All');
    setFilterFreq('All');
    setFilterSpend('All');
  };

  // Grade Distribution Counts
  const gradeCounts = {
    VVIP: initialCustomers.filter(c => c.grade === 'VVIP').length,
    VIP: initialCustomers.filter(c => c.grade === 'VIP').length,
    GOLD: initialCustomers.filter(c => c.grade === 'GOLD').length,
    SILVER: initialCustomers.filter(c => c.grade === 'SILVER').length,
  };
  const totalInDB = initialCustomers.length;

  return (
    <div style={styles.dashboardContainer}>
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo} onClick={() => onNavigate('home')}>
            <span style={styles.logoText} className="text-gradient">풍어수산</span>
            <span style={styles.logoBadge}>ADMIN</span>
          </div>
          <p style={styles.sidebarSubtitle}>매장 관리 콘솔</p>
        </div>

        <nav style={styles.sidebarNav}>
          <button 
            style={{...styles.navItem, ...(activeTab === 'dashboard' ? styles.activeNavItem : {})}}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp size={18} />
            <span>대시보드</span>
          </button>
          <button 
            style={{...styles.navItem, ...(activeTab === 'customers' ? styles.activeNavItem : {})}}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={18} />
            <span>고객관리</span>
          </button>
          <button 
            style={{...styles.navItem, ...(activeTab === 'statistics' ? styles.activeNavItem : {})}}
            onClick={() => setActiveTab('statistics')}
          >
            <BarChart3 size={18} />
            <span>통계 / 리포트</span>
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <button style={styles.backBtn} onClick={() => onNavigate('home')}>
            <ArrowLeft size={16} />
            <span>메인페이지 가기</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main style={styles.mainContent}>
        {/* Header bar */}
        <header style={styles.adminHeader}>
          <h2 style={styles.headerTitle}>
            {activeTab === 'dashboard' && '대시보드 실시간 분석'}
            {activeTab === 'customers' && '정밀 고객 관리'}
            {activeTab === 'statistics' && '통계 및 종합 분석 리포트'}
          </h2>
          <div style={styles.adminInfo}>
            <div style={styles.liveIndicator}>
              <span style={styles.liveDot}></span>
              <span style={styles.liveText}>실시간 수집중</span>
            </div>
            <span style={styles.adminName}>최고관리자 님</span>
          </div>
        </header>

        {/* Tab View Render */}
        <div style={styles.tabContent}>
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              
              {/* KPIs Grid */}
              <div style={styles.kpiGrid}>
                <div className="card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}>
                    <span style={styles.kpiLabel}>전체 고객수</span>
                    <Users size={20} style={{color: 'var(--accent-gold)'}} />
                  </div>
                  <div style={styles.kpiValContainer}>
                    <span style={styles.kpiValue} className="font-number">{totalInDB}</span>
                    <span style={styles.kpiTrendPositive}>+12.4%</span>
                  </div>
                  <p style={styles.kpiSubText}>전월 동기 대비 기준</p>
                </div>

                <div className="card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}>
                    <span style={styles.kpiLabel}>누적 매출액</span>
                    <DollarSign size={20} style={{color: 'var(--accent-color)'}} />
                  </div>
                  <div style={styles.kpiValContainer}>
                    <span style={styles.kpiValue} className="font-number">10,950,000원</span>
                    <span style={styles.kpiTrendPositive}>+8.9%</span>
                  </div>
                  <p style={styles.kpiSubText}>최근 30일 포장/주문 기준</p>
                </div>

                <div className="card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}>
                    <span style={styles.kpiLabel}>총 거래 건수</span>
                    <ShoppingCart size={20} style={{color: '#2E7D32'}} />
                  </div>
                  <div style={styles.kpiValContainer}>
                    <span style={styles.kpiValue} className="font-number">148건</span>
                    <span style={styles.kpiTrendPositive}>+15.2%</span>
                  </div>
                  <p style={styles.kpiSubText}>재방문율 42.1% 기록</p>
                </div>
              </div>

              {/* Real-time Feeds and Level Distribution Split */}
              <div className="split-grid" style={styles.dashboardSplitGrid}>
                
                {/* Donut Chart and Info */}
                <div className="card" style={styles.splitPanel}>
                  <h3 style={styles.panelTitle}>고객 등급별 분포</h3>
                  <div style={styles.chartArea}>
                    {/* SVG Donut Chart */}
                    <div style={styles.donutContainer}>
                      <svg width="180" height="180" viewBox="0 0 100 100">
                        {/* Circle circumference is 314.159 (2 * PI * 50) */}
                        {/* Circle radius r=40, cx=50, cy=50. C = 2*PI*40 = 251.3 */}
                        
                        {/* SILVER Segment: 40% (offset 0, dash 100.5) */}
                        <circle cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="#E2E8F0" 
                          strokeWidth="10"
                          strokeDasharray="251.3"
                          strokeDashoffset="0"
                        />
                        {/* GOLD Segment: 27% (dash 67.8, offset -100.5) */}
                        <circle cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="var(--accent-gold)" 
                          strokeWidth="10"
                          strokeDasharray="67.8 251.3"
                          strokeDashoffset="-100.5"
                        />
                        {/* VIP Segment: 20% (dash 50.3, offset -168.3) */}
                        <circle cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="var(--accent-color)" 
                          strokeWidth="10"
                          strokeDasharray="50.3 251.3"
                          strokeDashoffset="-168.3"
                        />
                        {/* VVIP Segment: 13% (dash 32.7, offset -218.6) */}
                        <circle cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="#1A1512" 
                          strokeWidth="10"
                          strokeDasharray="32.7 251.3"
                          strokeDashoffset="-218.6"
                        />
                        
                        {/* Donut Center Text */}
                        <text x="50" y="47" textAnchor="middle" dominantBaseline="middle" style={{fontSize: '9px', fontWeight: '800', fill: 'var(--text-primary)'}}>고객</text>
                        <text x="50" y="59" textAnchor="middle" dominantBaseline="middle" style={{fontSize: '12px', fontWeight: '800', fill: 'var(--accent-color)'}} className="font-number">100%</text>
                      </svg>
                    </div>

                    <div style={styles.chartLegends}>
                      <div style={styles.legendRow}>
                        <span style={{...styles.legendDot, backgroundColor: '#1A1512'}}></span>
                        <span style={styles.legendLabel}>VVIP (13%)</span>
                        <span style={styles.legendVal} className="font-number">{gradeCounts.VVIP}명</span>
                      </div>
                      <div style={styles.legendRow}>
                        <span style={{...styles.legendDot, backgroundColor: 'var(--accent-color)'}}></span>
                        <span style={styles.legendLabel}>VIP (20%)</span>
                        <span style={styles.legendVal} className="font-number">{gradeCounts.VIP}명</span>
                      </div>
                      <div style={styles.legendRow}>
                        <span style={{...styles.legendDot, backgroundColor: 'var(--accent-gold)'}}></span>
                        <span style={styles.legendLabel}>GOLD (27%)</span>
                        <span style={styles.legendVal} className="font-number">{gradeCounts.GOLD}명</span>
                      </div>
                      <div style={styles.legendRow}>
                        <span style={{...styles.legendDot, backgroundColor: '#E2E8F0'}}></span>
                        <span style={styles.legendLabel}>SILVER (40%)</span>
                        <span style={styles.legendVal} className="font-number">{gradeCounts.SILVER}명</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Registrations simulation */}
                <div className="card" style={styles.splitPanel}>
                  <div style={styles.panelHeaderRow}>
                    <h3 style={styles.panelTitle}>실시간 수집 현황</h3>
                    <span style={styles.pulseIndicator}>
                      <span style={styles.pulseDot}></span>
                      수집 중 (6초 주기)
                    </span>
                  </div>
                  <div style={styles.registrationList}>
                    {liveRegistrations.map((reg) => (
                      <div key={reg.id} style={styles.regRow} className="animate-fade-in">
                        <div style={styles.regInfo}>
                          <span style={styles.regAvatar}>{reg.name[0]}</span>
                          <div>
                            <p style={styles.regDesc}>
                              <strong>{reg.name}</strong> 님이 {reg.action}하셨습니다.
                            </p>
                            <span style={styles.regTime}>{reg.time}</span>
                          </div>
                        </div>
                        {reg.amount !== '-' && (
                          <span style={styles.regAmt} className="font-number">+{reg.amount}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* New Customer List Panel */}
              <div className="card" style={styles.fullPanel}>
                <div style={styles.panelHeaderRow}>
                  <h3 style={styles.panelTitle}>최근 가입 고객 목록</h3>
                  <button 
                    style={styles.panelLink} 
                    onClick={() => setActiveTab('customers')}
                  >
                    <span>고객관리 보기</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="custom-table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>고객명</th>
                        <th>이메일</th>
                        <th>고객등급</th>
                        <th>성별</th>
                        <th>연령대</th>
                        <th>최근 방문일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialCustomers.slice(0, 5).map((c) => (
                        <tr key={c.id}>
                          <td style={{fontWeight: '600'}}>{c.name}</td>
                          <td className="font-number">{c.email}</td>
                          <td>
                            <span className={`badge ${
                              c.grade === 'VVIP' ? 'badge-vvip' : 
                              c.grade === 'VIP' ? 'badge-vip' : 
                              c.grade === 'GOLD' ? 'badge-gold' : 'badge-silver'
                            }`}>
                              {c.grade}
                            </span>
                          </td>
                          <td>{c.gender}</td>
                          <td>{c.age}</td>
                          <td className="font-number">{c.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'customers' && (
            <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              
              {/* Customer Filters */}
              <div className="card" style={styles.filterCard}>
                <div style={styles.filterTitleRow}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <SlidersHorizontal size={18} style={{color: 'var(--accent-color)'}} />
                    <h3 style={styles.panelTitle} style={{margin: 0, fontSize: '1.05rem', fontWeight: '700'}}>고객 검색 필터</h3>
                  </div>
                  <button style={styles.resetBtn} onClick={resetFilters}>
                    <RefreshCw size={14} />
                    필터 초기화
                  </button>
                </div>

                <div style={styles.filterGrid}>
                  <div style={styles.filterBox}>
                    <label style={styles.filterLabel}>성별</label>
                    <select 
                      style={styles.filterSelect}
                      value={filterGender}
                      onChange={(e) => setFilterGender(e.target.value)}
                    >
                      <option value="All">전체 성별</option>
                      <option value="남">남성</option>
                      <option value="여">여성</option>
                    </select>
                  </div>

                  <div style={styles.filterBox}>
                    <label style={styles.filterLabel}>연령대</label>
                    <select 
                      style={styles.filterSelect}
                      value={filterAge}
                      onChange={(e) => setFilterAge(e.target.value)}
                    >
                      <option value="All">전체 연령대</option>
                      <option value="20대">20대</option>
                      <option value="30대">30대</option>
                      <option value="40대">40대</option>
                      <option value="50대 이상">50대 이상</option>
                    </select>
                  </div>

                  <div style={styles.filterBox}>
                    <label style={styles.filterLabel}>고객등급</label>
                    <select 
                      style={styles.filterSelect}
                      value={filterGrade}
                      onChange={(e) => setFilterGrade(e.target.value)}
                    >
                      <option value="All">전체 등급</option>
                      <option value="SILVER">SILVER</option>
                      <option value="GOLD">GOLD</option>
                      <option value="VIP">VIP</option>
                      <option value="VVIP">VVIP</option>
                    </select>
                  </div>

                  <div style={styles.filterBox}>
                    <label style={styles.filterLabel}>구매 빈도</label>
                    <select 
                      style={styles.filterSelect}
                      value={filterFreq}
                      onChange={(e) => setFilterFreq(e.target.value)}
                    >
                      <option value="All">전체 빈도</option>
                      <option value="High">우수 (9회 이상)</option>
                      <option value="Medium">보통 (4회~8회)</option>
                      <option value="Low">일반 (3회 이하)</option>
                    </select>
                  </div>

                  <div style={styles.filterBox}>
                    <label style={styles.filterLabel}>구매 금액</label>
                    <select 
                      style={styles.filterSelect}
                      value={filterSpend}
                      onChange={(e) => setFilterSpend(e.target.value)}
                    >
                      <option value="All">전체 누적액</option>
                      <option value="High">우수 (100만원 이상)</option>
                      <option value="Medium">보통 (30만~100만원)</option>
                      <option value="Low">일반 (30만원 이하)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.searchRow}>
                  <div style={styles.searchWrapper}>
                    <Search size={18} style={styles.searchIcon} />
                    <input 
                      type="text" 
                      placeholder="고객 이름 또는 이메일 검색..." 
                      style={styles.searchInput}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Customer Management Summary Bar */}
              <div style={styles.summaryBar}>
                <span>필터 결과: <strong>{customers.length}</strong>명 / 전체 데이터 중</span>
                <span className="font-number" style={{color: 'var(--accent-color)', fontWeight: '700'}}>
                  누적 매출: {customers.reduce((acc, c) => acc + c.spend, 0).toLocaleString()}원
                </span>
                <span className="font-number" style={{color: 'var(--accent-gold)', fontWeight: '700'}}>
                  누적 지급포인트: {customers.reduce((acc, c) => acc + c.points, 0).toLocaleString()}P
                </span>
              </div>

              {/* Main List */}
              <div className="card" style={{padding: '16px'}}>
                <div className="custom-table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>고객명</th>
                        <th>성별</th>
                        <th>연령대</th>
                        <th>등급</th>
                        <th>구매 빈도</th>
                        <th>누적 구매금액</th>
                        <th>적립 포인트</th>
                        <th>최근 방문일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.length > 0 ? (
                        customers.map((c) => (
                          <tr key={c.id}>
                            <td style={{fontWeight: '600'}}>{c.name}</td>
                            <td>{c.gender}</td>
                            <td>{c.age}</td>
                            <td>
                              <span className={`badge ${
                                c.grade === 'VVIP' ? 'badge-vvip' : 
                                c.grade === 'VIP' ? 'badge-vip' : 
                                c.grade === 'GOLD' ? 'badge-gold' : 'badge-silver'
                              }`}>
                                {c.grade}
                              </span>
                            </td>
                            <td className="font-number">{c.freq}회</td>
                            <td style={{fontWeight: '600'}} className="font-number">{c.spend.toLocaleString()}원</td>
                            <td style={{color: 'var(--accent-gold)'}} className="font-number">{c.points.toLocaleString()}P</td>
                            <td className="font-number">{c.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
                            필터링 조건과 일치하는 고객이 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              
              {/* Split Charts Container */}
              <div className="split-grid" style={styles.dashboardSplitGrid}>
                
                {/* Sales Line Chart */}
                <div className="card" style={styles.splitPanel}>
                  <div style={styles.panelHeaderRow}>
                    <h3 style={styles.panelTitle}>최근 6주 주간 매출 추이</h3>
                    <span style={styles.chartSubtext}>단위: 만원</span>
                  </div>
                  
                  <div style={{...styles.chartWrapper, height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                    {/* SVG Line Chart */}
                    <svg width="100%" height="200" style={{overflow: 'visible'}}>
                      {/* Grid Lines */}
                      <line x1="10%" y1="20" x2="90%" y2="20" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="70" x2="90%" y2="70" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="120" x2="90%" y2="120" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="170" x2="90%" y2="170" stroke="var(--border-color)" strokeWidth="1.5" />
                      
                      {/* Grid labels */}
                      <text x="5%" y="24" style={{fontSize: '8px', fill: 'var(--text-muted)'}}>150</text>
                      <text x="5%" y="74" style={{fontSize: '8px', fill: 'var(--text-muted)'}}>100</text>
                      <text x="5%" y="124" style={{fontSize: '8px', fill: 'var(--text-muted)'}}>50</text>
                      
                      {/* Line Paths. Values: W1: 65, W2: 85, W3: 75, W4: 120, W5: 98, W6: 142 */}
                      {/* Mapping function: X: 10% + index * 16%, Y: 170 - (value / 150 * 150px) */}
                      {/* Points coordinates: W1(10%, 105), W2(26%, 85), W3(42%, 95), W4(58%, 50), W5(74%, 72), W6(90%, 28) */}
                      <path 
                        d="M 40 115 L 104 95 L 168 105 L 232 60 L 296 82 L 360 38" 
                        fill="none" 
                        stroke="var(--accent-color)" 
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Dots and Labels */}
                      {[
                        {x: 40, y: 115, val: '65만'},
                        {x: 104, y: 95, val: '85만'},
                        {x: 168, y: 105, val: '75만'},
                        {x: 232, y: 60, val: '120만'},
                        {x: 296, y: 82, val: '98만'},
                        {x: 360, y: 38, val: '142만'}
                      ].map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="5" fill="#FFFFFF" stroke="var(--accent-color)" strokeWidth="2.5" />
                          <text x={p.x} y={p.y - 10} textAnchor="middle" style={{fontSize: '9px', fontWeight: '800', fill: 'var(--text-primary)'}} className="font-number">{p.val}</text>
                          <text x={p.x} y="185" textAnchor="middle" style={{fontSize: '9px', fill: 'var(--text-muted)'}} className="font-number">{idx + 1}주차</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Segment Bar Chart */}
                <div className="card" style={styles.splitPanel}>
                  <div style={styles.panelHeaderRow}>
                    <h3 style={styles.panelTitle}>연령대별 평균 거래금액</h3>
                    <span style={styles.chartSubtext}>단위: 만원</span>
                  </div>
                  
                  <div style={{...styles.chartWrapper, height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                    {/* SVG Bar Chart */}
                    <svg width="100%" height="200" style={{overflow: 'visible'}}>
                      {/* Grid Lines */}
                      <line x1="10%" y1="20" x2="90%" y2="20" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="70" x2="90%" y2="70" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="120" x2="90%" y2="120" stroke="var(--border-light)" strokeWidth="1" />
                      <line x1="10%" y1="170" x2="90%" y2="170" stroke="var(--border-color)" strokeWidth="1.5" />

                      {/* Bar Data: 20s: 32만, 30s: 78만, 40s: 110만, 50s+: 87만 */}
                      {/* Values mapped to height out of 120max. Y = 170 - (val / 120 * 150px) */}
                      {[
                        {x: 60, h: 40, y: 130, age: '20대', val: '32만', color: '#E2E8F0'},
                        {x: 140, h: 97, y: 73, age: '30대', val: '78만', color: 'var(--accent-gold)'},
                        {x: 220, h: 137, y: 33, age: '40대', val: '110만', color: 'var(--accent-color)'},
                        {x: 300, h: 108, y: 62, age: '50대+', val: '87만', color: '#2C2621'}
                      ].map((b, idx) => (
                        <g key={idx}>
                          <rect 
                            x={b.x} 
                            y={b.y} 
                            width="36" 
                            height={b.h} 
                            fill={b.color} 
                            rx="4"
                            style={{transition: 'all 0.3s ease'}}
                          />
                          <text x={b.x + 18} y={b.y - 8} textAnchor="middle" style={{fontSize: '9px', fontWeight: '800', fill: 'var(--text-primary)'}} className="font-number">{b.val}</text>
                          <text x={b.x + 18} y="185" textAnchor="middle" style={{fontSize: '9px', fill: 'var(--text-secondary)'}}>{b.age}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

              </div>

              {/* Statistics Actions Row */}
              <div className="card" style={styles.fullPanel}>
                <h3 style={styles.panelTitle} style={{marginBottom: '16px'}}>주요 리포트 요약 및 익스포트</h3>
                <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px'}}>
                  위의 실시간 집계 데이터 및 매출 데이터를 다양한 포맷으로 내보낼 수 있습니다. 이메일 정기 보고 기능을 설정하면 매주 월요일 아침 요약 본이 전달됩니다.
                </p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  <button className="btn btn-primary" onClick={() => alert('PDF 리포트 생성이 시작되었습니다.')}>
                    <Download size={16} /> PDF 리포트 다운로드
                  </button>
                  <button className="btn btn-secondary" onClick={() => alert('Excel 데이터 변환이 완료되었습니다.')}>
                    <Download size={16} /> 엑셀 파일 내보내기 (CSV)
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F9F7F2',
    color: 'var(--text-primary)',
  },
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--text-primary)',
    color: '#ECE5DB',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '2px solid var(--accent-gold)',
    flexShrink: 0,
  },
  sidebarHeader: {
    padding: '24px 20px',
    borderBottom: '1px solid #483E36',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logoBadge: {
    backgroundColor: 'var(--accent-gold)',
    color: '#FFFFFF',
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  sidebarSubtitle: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    marginTop: '4px',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '20px 12px',
    flexGrow: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    color: '#A89B8F',
    fontWeight: '500',
    fontSize: '0.92rem',
    transition: 'var(--transition-fast)',
    textAlign: 'left',
  },
  activeNavItem: {
    backgroundColor: 'rgba(219, 88, 41, 0.15)',
    color: 'var(--accent-color)',
    fontWeight: '700',
  },
  sidebarFooter: {
    padding: '20px 16px',
    borderTop: '1px solid #483E36',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #483E36',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#A89B8F',
    transition: 'var(--transition-fast)',
  },
  
  /* Main Content Styles */
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'auto',
  },
  adminHeader: {
    height: '72px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid var(--border-color)',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
  },
  adminInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'var(--bg-secondary)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-color)',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 8px #4CAF50',
  },
  liveText: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  adminName: {
    fontSize: '0.88rem',
    fontWeight: '600',
  },

  tabContent: {
    padding: '32px',
    flexGrow: 1,
  },

  /* Dashboard View KPI Card Styles */
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  kpiCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  kpiLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  kpiValContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '6px',
  },
  kpiValue: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: 'var(--text-primary)',
  },
  kpiTrendPositive: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#2E7D32',
  },
  kpiSubText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },

  /* Dashboard Split Grid Layout */
  dashboardSplitGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  splitPanel: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '300px',
  },
  panelHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  panelTitle: {
    fontSize: '1.05rem',
    fontWeight: '800',
  },
  panelLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.82rem',
    color: 'var(--accent-color)',
    fontWeight: '600',
  },
  chartArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  donutContainer: {
    flexShrink: 0,
  },
  chartLegends: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flexGrow: 1,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    marginRight: '8px',
  },
  legendLabel: {
    color: 'var(--text-secondary)',
    flexGrow: 1,
  },
  legendVal: {
    fontWeight: '700',
  },

  /* Real-time ticker styling */
  pulseIndicator: {
    fontSize: '0.78rem',
    color: 'var(--accent-color)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '700',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-color)',
    boxShadow: '0 0 6px var(--accent-color)',
  },
  registrationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflowY: 'hidden',
  },
  regRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-light)',
  },
  regInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  regAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--border-color)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.82rem',
  },
  regDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    margin: 0,
  },
  regTime: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  regAmt: {
    fontSize: '0.85rem',
    fontWeight: '800',
    color: 'var(--accent-color)',
  },

  fullPanel: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
  },

  /* Filter Panel Section Styles */
  filterCard: {
    padding: '24px',
    backgroundColor: '#FFFFFF',
  },
  filterTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '14px',
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    transition: 'var(--transition-fast)',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  filterLabel: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  filterSelect: {
    padding: '10px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    outline: 'none',
    fontSize: '0.88rem',
  },
  searchRow: {
    borderTop: '1px solid var(--border-light)',
    paddingTop: '16px',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    color: 'var(--text-muted)',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 42px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    outline: 'none',
    fontSize: '0.9rem',
  },
  summaryBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    padding: '14px 20px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.88rem',
    fontWeight: '500',
    border: '1px solid var(--border-color)',
  },

  /* Statistics Chart Styles */
  chartSubtext: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  chartWrapper: {
    width: '100%',
    padding: '10px 0',
  }
};
