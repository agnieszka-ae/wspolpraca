// alloweat — Sidebar Component
// Narrow 52px icon-only sidebar matching the product screens

const SIDEBAR_ICONS = [
  {
    id: 'dashboard', label: 'Pulpit', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'employees', label: 'Pracownicy', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 15c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M13 12c1.657 0 3 .895 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'calendar', label: 'Kalendarz', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 2v3M12 2v3M2 8.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'finance', label: 'Finanse', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8h14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 12h2M10 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'meals', label: 'Posiłki', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6.238 2 4 4.238 4 7c0 2.418 1.721 4.435 4 4.9V16h2v-4.1c2.279-.465 4-2.482 4-4.9 0-2.762-2.238-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 2v4M11 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'orders', label: 'Zamówienia', group: 'main',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 2h1.5L6 10h8l1.5-6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'reports', label: 'Raporty', group: 'secondary',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="2" width="9" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 6h6M6 9h6M6 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 14l-2 2-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 'integrations', label: 'Integracje', group: 'secondary',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8v1a2 2 0 002 2h1M13 8v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'settings', label: 'Ustawienia', group: 'bottom',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M3.636 3.636l1.06 1.06M13.304 13.304l1.06 1.06M3.636 14.364l1.06-1.06M13.304 4.696l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
];

const SidebarStyles = `
  .ae-sidebar {
    width: 52px;
    background: #fff;
    border-right: 1px solid rgba(20,20,20,0.10);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 12px;
    flex-shrink: 0;
    height: 100%;
    gap: 0;
    position: relative;
    transition: width 300ms cubic-bezier(0.16,1,0.3,1);
    overflow: hidden;
  }
  .ae-sidebar.expanded {
    width: 220px;
    align-items: stretch;
  }
  .ae-sidebar-logo {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px;
    flex-shrink: 0;
    align-self: center;
    transition: all 300ms cubic-bezier(0.16,1,0.3,1);
  }
  .ae-sidebar.expanded .ae-sidebar-logo {
    width: auto;
    padding: 0 8px;
    align-self: auto;
    justify-content: flex-start;
    margin-bottom: 8px;
  }
  .ae-sidebar-logo-icon { flex-shrink: 0; }
  .ae-sidebar-logo-wordmark {
    opacity: 0;
    width: 0;
    overflow: hidden;
    transition: opacity 200ms ease, width 300ms cubic-bezier(0.16,1,0.3,1);
    white-space: nowrap;
  }
  .ae-sidebar.expanded .ae-sidebar-logo-wordmark {
    opacity: 1;
    width: 100px;
    margin-left: 8px;
  }
  .ae-sidebar-divider {
    height: 1px;
    background: rgba(20,20,20,0.10);
    margin: 4px 0;
    flex-shrink: 0;
    transition: margin 300ms;
  }
  .ae-sidebar:not(.expanded) .ae-sidebar-divider { width: 36px; align-self: center; }
  .ae-sidebar.expanded .ae-sidebar-divider { width: calc(100% - 16px); align-self: center; }
  .ae-nav-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease;
    color: rgba(5,5,5,0.45);
    flex-shrink: 0;
  }
  .ae-sidebar:not(.expanded) .ae-nav-icon { align-self: center; }
  .ae-nav-row {
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background 150ms ease;
    margin: 0 8px;
    gap: 0;
    flex-shrink: 0;
  }
  .ae-sidebar:not(.expanded) .ae-nav-row { margin: 0; justify-content: center; width: 36px; align-self: center; }
  .ae-nav-row:hover .ae-nav-icon { color: rgba(5,5,5,0.75); }
  .ae-nav-row:hover { background: rgba(116,72,208,0.07); }
  .ae-nav-row.active .ae-nav-icon { background: #F5F1FE; color: #7448D0; }
  .ae-sidebar:not(.expanded) .ae-nav-row.active { background: transparent; }
  .ae-sidebar.expanded .ae-nav-row.active { background: #F5F1FE; }
  .ae-sidebar.expanded .ae-nav-row.active .ae-nav-icon { background: transparent; }
  .ae-nav-label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(5,5,5,0.65);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    width: 0;
    transition: opacity 200ms ease, width 300ms cubic-bezier(0.16,1,0.3,1);
  }
  .ae-sidebar.expanded .ae-nav-label { opacity: 1; width: 140px; }
  .ae-nav-row.active .ae-nav-label { color: #7448D0; font-weight: 600; }
  .ae-nav-spacer { flex: 1; }
  .ae-sidebar-toggle {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgba(20,20,20,0.12);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 150ms ease, background 150ms ease, border-color 150ms ease;
    z-index: 10;
    color: rgba(5,5,5,0.5);
    flex-shrink: 0;
  }
  .ae-sidebar:hover .ae-sidebar-toggle { opacity: 1; }
  .ae-sidebar-toggle:hover { background: #7448D0; border-color: #7448D0; color: #fff; }
`;

function Sidebar({ active, onNavigate }) {
  const [expanded, setExpanded] = React.useState(false);
  const main = SIDEBAR_ICONS.filter(i => i.group === 'main');
  const secondary = SIDEBAR_ICONS.filter(i => i.group === 'secondary');
  const bottom = SIDEBAR_ICONS.filter(i => i.group === 'bottom');

  function NavRow({ item }) {
    return (
      <div
        className={`ae-nav-row${active === item.id ? ' active' : ''}`}
        onClick={() => onNavigate(item.id)}
        title={expanded ? undefined : item.label}
      >
        <div className="ae-nav-icon"><item.icon /></div>
        <span className="ae-nav-label">{item.label}</span>
      </div>
    );
  }

  return (
    <React.Fragment>
      <style>{SidebarStyles}</style>
      <div className={`ae-sidebar${expanded ? ' expanded' : ''}`}>
        <div className="ae-sidebar-logo">
          <svg className="ae-sidebar-logo-icon" width="28" height="23" viewBox="0 0 36 30" fill="none">
            <path d="M16.327 14.205C15.8675 14.6431 15.8675 15.3549 16.3269 15.793L25.8574 24.8829C26.3186 25.3228 26.3191 26.0416 25.8221 26.4443C23.7743 28.1038 21.3097 29.2373 18.6615 29.7271C15.6253 30.2887 12.4832 29.9793 9.6304 28.8378C6.77756 27.6963 4.34126 25.7736 2.62774 23.3115C0.914225 20.8493 0 17.9577 0 15C0 12.0423 0.914225 9.15065 2.62774 6.68854C4.34126 4.22642 6.77756 2.30374 9.6304 1.16222C12.4832 0.0207016 15.6253 -0.288705 18.6615 0.272896C21.3097 0.762729 23.7742 1.89612 25.8221 3.55564C26.3191 3.9584 26.3185 4.6772 25.8572 5.1171L16.327 14.205Z" fill="#7448D0"/>
            <path d="M36 14.5491C36 10.3399 32.884 7.36709 28.8294 6.65941C28.157 6.54205 27.4831 6.79312 26.9991 7.25471L19.7121 14.2049C19.2527 14.643 19.2527 15.3546 19.712 15.7928L26.8029 22.557C27.2586 22.9918 27.883 23.2408 28.5219 23.1652C30.7484 22.9016 32.8399 21.9679 34.4867 20.4865L31.6868 17.2096C30.4914 18.2412 28.945 18.8223 27.3351 18.845C26.4709 18.9179 25.6061 18.7125 24.878 18.2614C24.15 17.8102 23.6004 17.1393 23.3168 16.3551H35.9273C35.9636 15.5722 36 14.9927 36 14.5491ZM23.2827 13.388C23.4884 12.5982 23.9774 11.9026 24.6645 11.4223C25.3515 10.9421 26.193 10.7077 27.0423 10.7601C28.9969 10.7601 30.507 11.818 30.5818 13.388H23.2827Z" fill="#050505"/>
          </svg>
          <span className="ae-sidebar-logo-wordmark">
            <svg width="100" height="21" viewBox="0 0 129 27" fill="none">
              <path d="M16.327 14.205C15.8675 14.6431 15.8675 15.3549 16.3269 15.793L25.8574 24.8829C26.3186 25.3228 26.3191 26.0416 25.8221 26.4443C23.7743 28.1038 21.3097 29.2373 18.6615 29.7271C15.6253 30.2887 12.4832 29.9793 9.6304 28.8378C6.77756 27.6963 4.34126 25.7736 2.62774 23.3115C0.914225 20.8493 0 17.9577 0 15C0 12.0423 0.914225 9.15065 2.62774 6.68854C4.34126 4.22642 6.77756 2.30374 9.6304 1.16222C12.4832 0.0207016 15.6253 -0.288705 18.6615 0.272896C21.3097 0.762729 23.7742 1.89612 25.8221 3.55564C26.3191 3.9584 26.3185 4.6772 25.8572 5.1171L16.327 14.205Z" fill="#7448D0"/>
              <path d="M36 14.5491C36 10.3399 32.884 7.36709 28.8294 6.65941C28.157 6.54205 27.4831 6.79312 26.9991 7.25471L19.7121 14.2049C19.2527 14.643 19.2527 15.3546 19.712 15.7928L26.8029 22.557C27.2586 22.9918 27.883 23.2408 28.5219 23.1652C30.7484 22.9016 32.8399 21.9679 34.4867 20.4865L31.6868 17.2096C30.4914 18.2412 28.945 18.8223 27.3351 18.845C26.4709 18.9179 25.6061 18.7125 24.878 18.2614C24.15 17.8102 23.6004 17.1393 23.3168 16.3551H35.9273C35.9636 15.5722 36 14.9927 36 14.5491ZM23.2827 13.388C23.4884 12.5982 23.9774 11.9026 24.6645 11.4223C25.3515 10.9421 26.193 10.7077 27.0423 10.7601C28.9969 10.7601 30.507 11.818 30.5818 13.388H23.2827Z" fill="#050505"/>
              <text x="44" y="20" fontFamily="Figtree, system-ui, sans-serif" fontSize="16" fontWeight="700" fill="#2D1D51">alloweat</text>
            </svg>
          </span>
        </div>
        <div className="ae-sidebar-divider"></div>
        {main.map(item => <NavRow key={item.id} item={item} />)}
        <div className="ae-sidebar-divider" style={{marginTop: 4}}></div>
        {secondary.map(item => <NavRow key={item.id} item={item} />)}
        <div className="ae-nav-spacer"></div>
        {bottom.map(item => <NavRow key={item.id} item={item} />)}
        <div
          className="ae-sidebar-toggle"
          onClick={() => setExpanded(e => !e)}
          title={expanded ? 'Zwiń' : 'Rozwiń'}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {expanded
              ? <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Sidebar });
