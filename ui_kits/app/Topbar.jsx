// alloweat — Topbar Component

const TopbarStyles = `
  .ae-topbar {
    height: 56px;
    background: #fff;
    border-bottom: 1px solid rgba(20,20,20,0.10);
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 10px;
    flex-shrink: 0;
  }
  .ae-topbar-title {
    font-size: 15px;
    font-weight: 600;
    color: #050505;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ae-topbar-breadcrumb {
    font-size: 13px;
    color: rgba(5,5,5,0.40);
    font-weight: 400;
  }
  .ae-search {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #fff;
    border: 1px solid rgba(20,20,20,0.12);
    border-radius: 8px;
    padding: 0 11px;
    height: 32px;
    width: 220px;
    transition: border-color 150ms, box-shadow 150ms;
  }
  .ae-search:focus-within {
    border-color: #7448D0;
    box-shadow: 0 0 0 3px rgba(116,72,208,0.10);
  }
  .ae-search input {
    border: none; outline: none;
    font-family: 'Figtree', sans-serif;
    font-size: 13px; color: #050505;
    background: transparent; width: 100%;
  }
  .ae-search input::placeholder { color: rgba(5,5,5,0.35); }
  .ae-topbar-btn {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgba(20,20,20,0.10);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 150ms;
    color: #050505;
    flex-shrink: 0;
  }
  .ae-topbar-btn:hover { background: #F7F7FB; }
  .ae-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #7448D0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    border: 1px solid rgba(20,20,20,0.08);
    cursor: pointer;
    flex-shrink: 0;
  }
  .ae-topbar-action {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 0 14px; height: 32px;
    background: #7448D0; color: #fff;
    border-radius: 8px;
    font-family: 'Figtree', sans-serif;
    font-size: 13px; font-weight: 600;
    border: none; cursor: pointer;
    transition: background 150ms;
    white-space: nowrap;
  }
  .ae-topbar-action:hover { background: #59379E; }
`;

function Topbar({ title, breadcrumb, action, actionLabel = 'Dodaj', onAction }) {
  return (
    <React.Fragment>
      <style>{TopbarStyles}</style>
      <div className="ae-topbar">
        <div className="ae-topbar-title">
          {breadcrumb && <span className="ae-topbar-breadcrumb">{breadcrumb} /</span>}
          {title}
        </div>
        <div className="ae-search">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="#727272" strokeWidth="1.3"/>
            <path d="M9 9l2.5 2.5" stroke="#727272" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input placeholder="Szukaj..." />
        </div>
        {action && (
          <button className="ae-topbar-action" onClick={onAction}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            {actionLabel}
          </button>
        )}
        <div className="ae-topbar-btn" title="Powiadomienia">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5C4.791 1.5 3 3.291 3 5.5V7L2 9.5h10L11 7V5.5C11 3.291 9.209 1.5 7 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 9.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="ae-topbar-btn" title="Menu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="ae-avatar" title="Anna Kowalska">AK</div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Topbar });
