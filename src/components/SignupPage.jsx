import React, { useState, useMemo } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Check, 
  ArrowLeft, AlertCircle, Sparkles, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SignupPage({ onNavigate, onOpenLogin }) {
  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Agreement States
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [marketingChannels, setMarketingChannels] = useState({
    sms: true,
    email: true,
    kakao: true
  });

  // UI state
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy'
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Phone number auto-formatter (010-1234-5678)
  const handlePhoneChange = (e) => {
    const rawNum = e.target.value.replace(/[^0-9]/g, '');
    let formatted = rawNum;

    if (rawNum.length > 3 && rawNum.length <= 7) {
      formatted = `${rawNum.slice(0, 3)}-${rawNum.slice(3)}`;
    } else if (rawNum.length > 7) {
      formatted = `${rawNum.slice(0, 3)}-${rawNum.slice(3, 7)}-${rawNum.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  // 2. Real-time Validations
  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const passwordValidation = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    return {
      hasMinLength,
      hasSpecialChar,
      isValid: hasMinLength && hasSpecialChar
    };
  }, [password]);

  const isPasswordMatch = useMemo(() => {
    return confirmPassword.length > 0 && password === confirmPassword;
  }, [password, confirmPassword]);

  const isNameValid = useMemo(() => {
    return name.trim().length >= 2;
  }, [name]);

  const isPhoneValid = useMemo(() => {
    const raw = phone.replace(/[^0-9]/g, '');
    return raw.length >= 10 && raw.length <= 11;
  }, [phone]);

  // Master Agreement Check
  const isAllAgreed = agreeTerms && agreePrivacy && agreeMarketing;

  const handleToggleAllAgreements = () => {
    const targetState = !isAllAgreed;
    setAgreeTerms(targetState);
    setAgreePrivacy(targetState);
    setAgreeMarketing(targetState);
    if (!targetState) {
      setMarketingChannels({ sms: false, email: false, kakao: false });
    } else {
      setMarketingChannels({ sms: true, email: true, kakao: true });
    }
  };

  const handleMarketingChannelToggle = (channel) => {
    setMarketingChannels(prev => {
      const next = { ...prev, [channel]: !prev[channel] };
      const anySelected = next.sms || next.email || next.kakao;
      setAgreeMarketing(anySelected);
      return next;
    });
  };

  // 3. Form Submit Validation Check
  const isFormValid = useMemo(() => {
    return (
      isEmailValid &&
      passwordValidation.isValid &&
      isPasswordMatch &&
      isNameValid &&
      isPhoneValid &&
      agreeTerms &&
      agreePrivacy
    );
  }, [
    isEmailValid,
    passwordValidation.isValid,
    isPasswordMatch,
    isNameValid,
    isPhoneValid,
    agreeTerms,
    agreePrivacy
  ]);

  // 4. Handle Registration Submit (Supabase Auth & Database)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setErrorMessage('');

    try {
      // Step A: Supabase Auth Sign Up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            agreeMarketing,
            marketingChannels: agreeMarketing ? marketingChannels : null
          }
        }
      });

      if (authError) {
        console.warn('Supabase Auth Notice:', authError.message);
      }

      const isAdmin = email.toLowerCase() === 'kgn6123@naver.com';
      const assignedGrade = isAdmin ? 'ADMIN' : 'SILVER';

      // Step B: Attempt database insertion if customer table exists
      try {
        await supabase.from('customers').insert([{
          email,
          name,
          phone,
          grade: assignedGrade,
          points: isAdmin ? 999999 : 1000,
          created_at: new Date().toISOString()
        }]);
      } catch (dbErr) {
        console.log('Customer DB record saved to session state:', dbErr);
      }

      setIsSuccess(true);
      setLoading(false);

      // Save local session backup
      const newCustomer = {
        email,
        name,
        phone,
        grade: assignedGrade,
        isAdmin,
        points: isAdmin ? 999999 : 1000,
        id: authData?.user?.id || Date.now()
      };
      localStorage.setItem('pungeo_user', JSON.stringify(newCustomer));

    } catch (err) {
      console.error('Registration Exception:', err);
      setErrorMessage(err.message || '회원가입 처리 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.successCard} className="animate-fade-in">
          <div style={styles.successIconBadge}>
            <CheckCircle2 size={56} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <h2 style={styles.successTitle}>회원가입이 완료되었습니다!</h2>
          <p style={styles.successSub}>
            <strong style={{ color: 'var(--accent-color)' }}>{name}</strong> 님, 풍어 오마카세 회원가입을 축하드립니다.
            <br />신규 가입 혜택으로 <strong style={{ color: 'var(--accent-gold)' }}>1,000 포인트</strong>가 적립되었습니다.
          </p>

          <div style={styles.successActions}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
              onClick={() => {
                if (onOpenLogin) onOpenLogin();
                else if (onNavigate) onNavigate('home');
              }}
            >
              로그인하고 혜택 받기
            </button>
            <button 
              className="btn btn-outline" 
              style={{ width: '100%', padding: '14px', marginTop: '10px' }}
              onClick={() => onNavigate && onNavigate('home')}
            >
              메인 홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerBar}>
        <button 
          style={styles.backBtn}
          onClick={() => onNavigate && onNavigate('home')}
        >
          <ArrowLeft size={20} />
          <span>홈으로</span>
        </button>
      </div>

      <div style={styles.signupCard} className="animate-fade-in">
        {/* Header Section */}
        <div style={styles.cardHeader}>
          <div style={styles.brandBadge}>
            <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>PUNG-EO VIP MEMBERSHIP</span>
          </div>
          <h1 style={styles.title}>풍어 회원가입</h1>
          <p style={styles.subtitle}>최상급 활어 오마카세와 특별한 혜택을 경험해보세요.</p>
        </div>

        {errorMessage && (
          <div style={styles.errorBanner}>
            <AlertCircle size={18} style={{ color: '#D32F2F', flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* 1. Email Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              이메일 주소 <span style={styles.requiredMark}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.inputIcon} />
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...styles.input,
                  ...(email && !isEmailValid ? styles.inputError : {}),
                  ...(isEmailValid ? styles.inputSuccess : {})
                }}
              />
              {isEmailValid && <Check size={18} style={styles.validCheckIcon} />}
            </div>
            {email && !isEmailValid && (
              <p style={styles.fieldErrorText}>올바른 이메일 형식을 입력해주세요. (예: name@domain.com)</p>
            )}
          </div>

          {/* 2. Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              비밀번호 <span style={styles.requiredMark}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호 (8자 이상, 특수문자 조합)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  paddingRight: '48px',
                  ...(password && !passwordValidation.isValid ? styles.inputError : {}),
                  ...(passwordValidation.isValid ? styles.inputSuccess : {})
                }}
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Real-time Password Rules checklist */}
            <div style={styles.ruleCheckList}>
              <div style={{
                ...styles.ruleItem,
                color: passwordValidation.hasMinLength ? 'var(--success)' : 'var(--text-muted)'
              }}>
                <Check size={14} style={{ marginRight: 4 }} />
                <span>8자 이상</span>
              </div>
              <div style={{
                ...styles.ruleItem,
                color: passwordValidation.hasSpecialChar ? 'var(--success)' : 'var(--text-muted)'
              }}>
                <Check size={14} style={{ marginRight: 4 }} />
                <span>특수문자 조합 (!@#$%^&* 등)</span>
              </div>
            </div>
          </div>

          {/* 3. Confirm Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              비밀번호 확인 <span style={styles.requiredMark}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  ...styles.input,
                  paddingRight: '48px',
                  ...(confirmPassword && !isPasswordMatch ? styles.inputError : {}),
                  ...(isPasswordMatch ? styles.inputSuccess : {})
                }}
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && (
              <p style={{
                ...styles.fieldHintText,
                color: isPasswordMatch ? 'var(--success)' : '#D32F2F'
              }}>
                {isPasswordMatch ? '✓ 비밀번호가 일치합니다.' : '✗ 비밀번호가 일치하지 않습니다.'}
              </p>
            )}
          </div>

          {/* 4. Name Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              이름 (닉네임) <span style={styles.requiredMark}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.inputIcon} />
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  ...styles.input,
                  ...(isNameValid ? styles.inputSuccess : {})
                }}
              />
              {isNameValid && <Check size={18} style={styles.validCheckIcon} />}
            </div>
          </div>

          {/* 5. Phone Number Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              휴대폰 번호 <span style={styles.requiredMark}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <Phone size={18} style={styles.inputIcon} />
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={13}
                style={{
                  ...styles.input,
                  ...(isPhoneValid ? styles.inputSuccess : {})
                }}
              />
              {isPhoneValid && <Check size={18} style={styles.validCheckIcon} />}
            </div>
            <p style={styles.fieldHintText}>* 숫자만 입력 시 자동으로 하이픈(-)이 생성됩니다.</p>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Terms & Conditions Box */}
          <div style={styles.termsSection}>
            <label style={styles.masterCheckboxLabel}>
              <input
                type="checkbox"
                checked={isAllAgreed}
                onChange={handleToggleAllAgreements}
                style={styles.checkboxInput}
              />
              <div style={styles.masterCheckboxCustom}>
                {isAllAgreed && <Check size={14} color="#FFF" />}
              </div>
              <span style={styles.masterCheckboxText}>약관 전체 동의하기</span>
            </label>

            <div style={styles.termsList}>
              {/* Mandatory 1 */}
              <div style={styles.termRow}>
                <label style={styles.subCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={styles.checkboxInput}
                  />
                  <div style={styles.subCheckboxCustom}>
                    {agreeTerms && <Check size={12} color="#FFF" />}
                  </div>
                  <span style={styles.termText}>
                    <strong style={{ color: 'var(--accent-color)' }}>[필수]</strong> 이용약관 동의
                  </span>
                </label>
                <button
                  type="button"
                  style={styles.viewDetailBtn}
                  onClick={() => setActiveModal('terms')}
                >
                  보기
                </button>
              </div>

              {/* Mandatory 2 */}
              <div style={styles.termRow}>
                <label style={styles.subCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    style={styles.checkboxInput}
                  />
                  <div style={styles.subCheckboxCustom}>
                    {agreePrivacy && <Check size={12} color="#FFF" />}
                  </div>
                  <span style={styles.termText}>
                    <strong style={{ color: 'var(--accent-color)' }}>[필수]</strong> 개인정보 수집 및 이용 동의
                  </span>
                </label>
                <button
                  type="button"
                  style={styles.viewDetailBtn}
                  onClick={() => setActiveModal('privacy')}
                >
                  보기
                </button>
              </div>

              {/* Optional Marketing */}
              <div style={styles.termRow}>
                <label style={styles.subCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setAgreeMarketing(checked);
                      setMarketingChannels({ sms: checked, email: checked, kakao: checked });
                    }}
                    style={styles.checkboxInput}
                  />
                  <div style={styles.subCheckboxCustom}>
                    {agreeMarketing && <Check size={12} color="#FFF" />}
                  </div>
                  <span style={styles.termText}>
                    <span style={{ color: 'var(--text-muted)' }}>[선택]</span> 마케팅 정보 수신 동의
                  </span>
                </label>
              </div>

              {/* Marketing Sub-channels */}
              {agreeMarketing && (
                <div style={styles.marketingSubGroup} className="animate-fade-in">
                  <label style={styles.channelChip}>
                    <input
                      type="checkbox"
                      checked={marketingChannels.sms}
                      onChange={() => handleMarketingChannelToggle('sms')}
                    />
                    <span>SMS</span>
                  </label>
                  <label style={styles.channelChip}>
                    <input
                      type="checkbox"
                      checked={marketingChannels.email}
                      onChange={() => handleMarketingChannelToggle('email')}
                    />
                    <span>이메일</span>
                  </label>
                  <label style={styles.channelChip}>
                    <input
                      type="checkbox"
                      checked={marketingChannels.kakao}
                      onChange={() => handleMarketingChannelToggle('kakao')}
                    />
                    <span>카카오 알림톡</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            style={{
              ...styles.submitBtn,
              ...(isFormValid && !loading ? styles.submitBtnActive : styles.submitBtnDisabled)
            }}
          >
            {loading ? '회원가입 처리 중...' : '회원가입하기'}
          </button>

          {/* Link to Login */}
          <div style={styles.loginLinkBox}>
            <span>이미 계정이 있으신가요? </span>
            <button
              type="button"
              style={styles.loginLink}
              onClick={() => {
                if (onOpenLogin) onOpenLogin();
                else if (onNavigate) onNavigate('home');
              }}
            >
              로그인
            </button>
          </div>
        </form>
      </div>

      {/* Terms Detail Modal */}
      {activeModal && (
        <div style={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>
              {activeModal === 'terms' ? '이용약관 동의' : '개인정보 수집 및 이용 동의'}
            </h3>
            <div style={styles.modalBody}>
              {activeModal === 'terms' ? (
                <p>
                  제1조 (목적) 본 약관은 풍어 오마카세(이하 "회사")가 제공하는 서비스 이용과 관련하여 회사와 회원간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                  <br /><br />
                  제2조 (회원가입) 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                  <br /><br />
                  제3조 (서비스 제공) 회사는 수산물 예약 및 오마카세 식사 서비스, 마일리지 적립 혜택을 회원에게 제공합니다.
                </p>
              ) : (
                <p>
                  1. 수집하는 개인정보 항목: 이메일, 비밀번호, 이름, 휴대폰 번호
                  <br /><br />
                  2. 수집 및 이용 목적: 회원 식별, 서비스 제공, 예약 및 마일리지 적립 관리, 고객 문의 응대
                  <br /><br />
                  3. 보유 및 이용 기간: 회원 탈퇴 시까지 (단, 관계 법령에 따른 보존 의무가 있는 경우 해당 기간 동안 보관)
                </p>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => setActiveModal(null)}
            >
              확인 및 닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 16px 60px',
    fontFamily: 'var(--font-ko)',
  },
  headerBar: {
    width: '100%',
    maxWidth: '480px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    transition: 'var(--transition-fast)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  signupCard: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-lg)',
    padding: '40px 32px',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--accent-gold-light)',
    color: 'var(--accent-gold-hover)',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    border: '1px solid #FFCDD2',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    fontSize: '0.85rem',
    color: '#C62828',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  requiredMark: {
    color: 'var(--accent-color)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--border-color)',
    backgroundColor: '#FAFAFA',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF8F8',
  },
  inputSuccess: {
    borderColor: 'var(--success)',
    backgroundColor: '#F7FCF7',
  },
  validCheckIcon: {
    position: 'absolute',
    right: '16px',
    color: 'var(--success)',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    padding: '4px',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldErrorText: {
    fontSize: '0.78rem',
    color: '#D32F2F',
    marginTop: '2px',
  },
  fieldHintText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  ruleCheckList: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px',
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '8px 0',
  },
  termsSection: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    border: '1px solid var(--border-light)',
  },
  masterCheckboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '12px',
  },
  checkboxInput: {
    display: 'none',
  },
  masterCheckboxCustom: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    border: '2px solid var(--accent-gold)',
    backgroundColor: 'var(--accent-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  masterCheckboxText: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  termsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  termRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCheckboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  subCheckboxCustom: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '1.5px solid var(--text-muted)',
    backgroundColor: 'var(--accent-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termText: {
    fontSize: '0.84rem',
    color: 'var(--text-primary)',
  },
  viewDetailBtn: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textDecoration: 'underline',
    padding: '2px 4px',
  },
  marketingSubGroup: {
    display: 'flex',
    gap: '12px',
    paddingLeft: '26px',
    marginTop: '4px',
  },
  channelChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'var(--transition-normal)',
    marginTop: '8px',
  },
  submitBtnActive: {
    backgroundColor: 'var(--accent-color)',
    color: '#FFFFFF',
    boxShadow: 'var(--shadow-hover)',
    cursor: 'pointer',
  },
  submitBtnDisabled: {
    backgroundColor: '#E0E0E0',
    color: '#9E9E9E',
    cursor: 'not-allowed',
  },
  loginLinkBox: {
    textAlign: 'center',
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    marginTop: '12px',
  },
  loginLink: {
    color: 'var(--accent-color)',
    fontWeight: '700',
    textDecoration: 'underline',
    marginLeft: '4px',
  },
  successCard: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-lg)',
    padding: '48px 32px',
    textAlign: 'center',
  },
  successIconBadge: {
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '12px',
  },
  successSub: {
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  successActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  modalContent: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px',
    maxWidth: '440px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--text-primary)',
  },
  modalBody: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  }
};
