import React, { useState } from 'react';
import { X, Mail, Lock, User, Info, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    setIsSuccess(true);
    setMessage(isLogin ? '성공적으로 로그인되었습니다!' : '회원가입이 완료되었습니다!');
    
    // Simulate Supabase response after 1s
    setTimeout(() => {
      onLoginSuccess({
        email,
        name: isLogin ? email.split('@')[0] : name,
        grade: 'SILVER',
        points: 1000
      });
      setIsSuccess(false);
      setMessage('');
      setEmail('');
      setPassword('');
      setName('');
      onClose();
    }, 1200);
  };

  return (
    <div className="auth-overlay animate-fade-in-simple" style={styles.overlay} onClick={onClose}>
      <div 
        className="auth-modal animate-fade-in" 
        style={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <button style={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div style={styles.tabContainer}>
          <button 
            style={{...styles.tab, ...(isLogin ? styles.activeTab : {})}} 
            onClick={() => { setIsLogin(true); setMessage(''); }}
          >
            로그인
          </button>
          <button 
            style={{...styles.tab, ...(!isLogin ? styles.activeTab : {})}} 
            onClick={() => { setIsLogin(false); setMessage(''); }}
          >
            회원가입
          </button>
        </div>

        <div style={styles.infoBox}>
          <Info size={16} style={{color: 'var(--accent-gold)', flexShrink: 0}} />
          <p style={styles.infoText}>
            현재는 프론트엔드 모의 기능만 작동합니다. 추후 <strong>Supabase</strong> 데이터베이스와 실연동될 예정입니다.
          </p>
        </div>

        {message && (
          <div style={{
            ...styles.messageBox, 
            ...(isSuccess ? styles.successMessageBox : styles.errorMessageBox)
          }}>
            {isSuccess && <CheckCircle2 size={16} style={{marginRight: 6}} />}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">이름 / 닉네임</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.inputIcon} />
                <input 
                  type="text" 
                  className="form-control" 
                  style={styles.input}
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">이메일 주소</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.inputIcon} />
              <input 
                type="email" 
                className="form-control" 
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input 
                type="password" 
                className="form-control" 
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
            {isLogin ? '로그인하기' : '회원가입하기'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 38, 33, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '400px',
    padding: '32px 24px 24px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: 'var(--text-secondary)',
    transition: 'var(--transition-fast)',
    padding: 4,
    borderRadius: '50%',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid var(--border-color)',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    transition: 'var(--transition-fast)',
  },
  activeTab: {
    color: 'var(--accent-color)',
    borderBottom: '2px solid var(--accent-color)',
  },
  infoBox: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1.5px dashed var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  infoText: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  messageBox: {
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  errorMessageBox: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    border: '1px solid #FFCDD2',
  },
  successMessageBox: {
    backgroundColor: 'var(--success-bg)',
    color: 'var(--success)',
    border: '1px solid rgba(46, 125, 50, 0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  input: {
    paddingLeft: '44px',
  },
  submitBtn: {
    marginTop: '8px',
    width: '100%',
  }
};
