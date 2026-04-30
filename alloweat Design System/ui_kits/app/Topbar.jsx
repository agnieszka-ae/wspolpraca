// alloweat — Topbar Component

const TopbarStyles = `
  .ae-topbar {
    height: 56px;
    background: #fff;
    border-bottom: 1px solid rgba(89,55,158,0.10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    flex-shrink: 0;
    gap: 16px;
  }
  .ae-topbar-title {
    flex: 1 0 0;
    font-size: 18px;
    font-weight: 700;
    color: #050505;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ae-topbar-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border: 1px solid rgba(89,55,158,0.10);
    border-radius: 8px;
    padding: 8px;
    width: 400px;
    flex-shrink: 0;
    transition: border-color 150ms, box-shadow 150ms;
  }
  .ae-topbar-search:focus-within {
    border-color: #7448D0;
    box-shadow: 0 0 0 3px rgba(116,72,208,0.10);
  }
  .ae-topbar-search input {
    border: none;
    outline: none;
    font-family: 'Figtree', sans-serif;
    font-size: 14px;
    line-height: 24px;
    color: #141414;
    background: transparent;
    width: 100%;
  }
  .ae-topbar-search input::placeholder {
    color: rgba(20,20,20,0.45);
  }
  .ae-topbar-actions {
    flex: 1 0 0;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
    min-width: 0;
  }
  .ae-topbar-icon-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ae-topbar-icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background: #fff;
    border: 1px solid rgba(89,55,158,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 150ms;
    flex-shrink: 0;
    position: relative;
  }
  .ae-topbar-icon-btn:hover {
    background: #F7F7FB;
  }
  .ae-topbar-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 15px;
    height: 15px;
    background: #D44450;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 600;
    color: #fff;
    border: 1.5px solid #fff;
    line-height: 1;
  }
  .ae-topbar-user-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid rgba(89,55,158,0.10);
    border-radius: 100px;
    padding: 4px 8px 4px 4px;
    height: 40px;
    cursor: pointer;
    transition: background 150ms;
    flex-shrink: 0;
  }
  .ae-topbar-user-btn:hover {
    background: #F7F7FB;
  }
  .ae-topbar-user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #d0489a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }
  .ae-topbar-user-name {
    font-size: 14px;
    font-weight: 600;
    color: #050505;
    white-space: nowrap;
  }
`;

function Topbar({ title }) {
  return (
    <React.Fragment>
      <style>{TopbarStyles}</style>
      <div className="ae-topbar">

        {/* Left: screen title */}
        <div className="ae-topbar-title">{title}</div>

        {/* Center: search */}
        <div className="ae-topbar-search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
            <circle cx="10.5" cy="10.5" r="6" stroke="#727272" strokeWidth="1.5"/>
            <path d="M15.5 15.5L19 19" stroke="#727272" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input placeholder="Szukaj klientów (imię, nazwisko, adres email)" />
        </div>

        {/* Right: action icons + user */}
        <div className="ae-topbar-actions">
          <div className="ae-topbar-icon-group">

            {/* Monitor icon */}
            <div className="ae-topbar-icon-btn" title="Ekran">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" stroke="#727272" strokeWidth="1.5"/>
                <path d="M7 17h6M10 13.5V17" stroke="#727272" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Chat icon */}
            <div className="ae-topbar-icon-btn" title="Wiadomości">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.5 10c0 3.59-2.91 6.5-6.5 6.5a6.47 6.47 0 01-3.25-.87L3.5 16.5l.87-3.25A6.47 6.47 0 013.5 10C3.5 6.41 6.41 3.5 10 3.5s6.5 2.91 6.5 6.5z" stroke="#727272" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Bell icon + notification badge */}
            <div className="ae-topbar-icon-btn" title="Powiadomienia">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5C7.24 2.5 5 4.74 5 7.5v1.75L3.5 12.5h13L15 9.25V7.5C15 4.74 12.76 2.5 10 2.5z" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 12.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5" stroke="#727272" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div className="ae-topbar-badge">6</div>
            </div>

          </div>

          {/* User pill */}
          <div className="ae-topbar-user-btn">
            <div className="ae-topbar-user-avatar">KS</div>
            <span className="ae-topbar-user-name">Karolina Szafrańska</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
              <path d="M4 6l4 4 4-4" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Topbar });
