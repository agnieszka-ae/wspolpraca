// alloweat — Dashboard Screen

const DashboardStyles = `
  .ae-dashboard { padding: 28px 28px 40px; overflow-y: auto; height: 100%; }
  .ae-page-header { margin-bottom: 24px; }
  .ae-page-title { font-size: 22px; font-weight: 700; color: #050505; margin-bottom: 2px; }
  .ae-page-sub { font-size: 13px; color: rgba(5,5,5,0.45); font-weight: 400; }
  .ae-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .ae-stat-card { background: #fff; border: 1px solid rgba(20,20,20,0.10); border-radius: 12px; padding: 18px 20px; }
  .ae-stat-label { font-size: 12px; font-weight: 600; color: rgba(5,5,5,0.45); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em; }
  .ae-stat-value { font-size: 26px; font-weight: 700; color: #050505; line-height: 1.1; margin-bottom: 6px; }
  .ae-stat-delta { font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
  .ae-delta-up { color: #16A34A; }
  .ae-delta-down { color: #DC2626; }
  .ae-row { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 12px; }
  .ae-card { background: #fff; border: 1px solid rgba(20,20,20,0.10); border-radius: 12px; padding: 20px; }
  .ae-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .ae-card-title { font-size: 14px; font-weight: 600; color: #050505; }
  .ae-card-action { font-size: 12px; font-weight: 500; color: #7448D0; cursor: pointer; }
  .ae-card-action:hover { text-decoration: underline; }
  .ae-table { width: 100%; border-collapse: collapse; }
  .ae-table th { font-size: 11px; font-weight: 600; color: rgba(5,5,5,0.4); text-transform: uppercase; letter-spacing: 0.04em; text-align: left; padding: 0 0 10px; border-bottom: 1px solid rgba(20,20,20,0.08); }
  .ae-table td { font-size: 13px; color: #050505; padding: 11px 0; border-bottom: 1px solid rgba(20,20,20,0.06); vertical-align: middle; }
  .ae-table tr:last-child td { border-bottom: none; }
  .ae-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
  .ae-badge-green { background: #F0FDF4; color: #16A34A; }
  .ae-badge-red { background: #FEF2F2; color: #DC2626; }
  .ae-badge-orange { background: #FFFBEB; color: #D97706; }
  .ae-badge-purple { background: #F5F1FE; color: #7448D0; }
  .ae-badge-gray { background: rgba(20,20,20,0.06); color: rgba(5,5,5,0.55); }
  .ae-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .ae-activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(20,20,20,0.06); }
  .ae-activity-item:last-child { border-bottom: none; }
  .ae-activity-icon { width: 32px; height: 32px; border-radius: 8px; background: #F5F1FE; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .ae-activity-text { flex: 1; }
  .ae-activity-title { font-size: 13px; font-weight: 500; color: #050505; margin-bottom: 1px; }
  .ae-activity-sub { font-size: 12px; color: rgba(5,5,5,0.45); }
  .ae-activity-time { font-size: 11px; color: rgba(5,5,5,0.35); white-space: nowrap; }
  .ae-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .ae-bar-label { font-size: 12px; font-weight: 500; color: rgba(5,5,5,0.6); width: 90px; flex-shrink: 0; text-align: right; }
  .ae-bar-track { flex: 1; height: 8px; background: rgba(20,20,20,0.06); border-radius: 99px; overflow: hidden; }
  .ae-bar-fill { height: 100%; border-radius: 99px; background: #7448D0; transition: width 600ms cubic-bezier(0.16,1,0.3,1); }
  .ae-bar-val { font-size: 12px; font-weight: 600; color: #050505; width: 50px; }
`;

const recentTransactions = [
  { name: 'Restauracja Smaczna', category: 'Obiad', amount: '-42,00 zł', date: '27 kwi', status: 'paid' },
  { name: 'Catering Business', category: 'Lunch box', amount: '-85,00 zł', date: '26 kwi', status: 'paid' },
  { name: 'Doładowanie salda', category: 'Przelew', amount: '+500,00 zł', date: '25 kwi', status: 'success' },
  { name: 'Bistro Centrum', category: 'Śniadanie', amount: '-18,50 zł', date: '25 kwi', status: 'paid' },
  { name: 'Zaliczka kwiecień', category: 'Przelew', amount: '+1200,00 zł', date: '01 kwi', status: 'success' },
];

const activityFeed = [
  { title: 'Nowy pracownik dodany', sub: 'Marek Nowak · Dział IT', time: '5 min temu', color: '#7448D0' },
  { title: 'Raport miesięczny gotowy', sub: 'Marzec 2026 · 48 stron', time: '1 godz. temu', color: '#16A34A' },
  { title: 'Zamówienie #1284 odrzucone', sub: 'Catering Express', time: '3 godz. temu', color: '#DC2626' },
  { title: 'Integracja HR zsynchronizowana', sub: 'Workday · 248 rekordów', time: 'wczoraj', color: '#2563EB' },
];

const departments = [
  { name: 'Marketing', pct: 92, val: '8 420 zł' },
  { name: 'Inżynieria', pct: 78, val: '14 200 zł' },
  { name: 'Sprzedaż', pct: 64, val: '6 800 zł' },
  { name: 'HR', pct: 41, val: '3 150 zł' },
  { name: 'Finanse', pct: 33, val: '2 600 zł' },
];

function Dashboard() {
  return (
    <React.Fragment>
      <style>{DashboardStyles}</style>
      <div className="ae-dashboard">
        <div className="ae-page-header">
          <div className="ae-page-title">Pulpit</div>
          <div className="ae-page-sub">Podsumowanie · kwiecień 2026</div>
        </div>
        <div className="ae-stats-grid">
          {[
            { label: 'Saldo konta', value: '34 820 zł', delta: '+12%', up: true },
            { label: 'Aktywni pracownicy', value: '1 248', delta: '+23', up: true },
            { label: 'Wydano w tym miesiącu', value: '18 340 zł', delta: '-4%', up: false },
            { label: 'Zamówienia', value: '892', delta: '+67', up: true },
          ].map((s, i) => (
            <div className="ae-stat-card" key={i}>
              <div className="ae-stat-label">{s.label}</div>
              <div className="ae-stat-value">{s.value}</div>
              <div className={`ae-stat-delta ${s.up ? 'ae-delta-up' : 'ae-delta-down'}`}>
                {s.up ? '↑' : '↓'} {s.delta} vs poprzedni miesiąc
              </div>
            </div>
          ))}
        </div>
        <div className="ae-row">
          <div className="ae-card">
            <div className="ae-card-header">
              <div className="ae-card-title">Ostatnie transakcje</div>
              <div className="ae-card-action">Zobacz wszystkie →</div>
            </div>
            <table className="ae-table">
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Kategoria</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th style={{textAlign:'right'}}>Kwota</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: 500}}>{t.name}</td>
                    <td style={{color:'rgba(5,5,5,0.55)', fontSize: 12}}>{t.category}</td>
                    <td style={{color:'rgba(5,5,5,0.45)', fontSize: 12}}>{t.date}</td>
                    <td>
                      <span className={`ae-badge ${t.status === 'success' ? 'ae-badge-green' : t.status === 'pending' ? 'ae-badge-orange' : 'ae-badge-gray'}`}>
                        <span className="ae-dot" style={{background: t.status === 'success' ? '#16A34A' : '#727272'}}></span>
                        {t.status === 'success' ? 'Zrealizowany' : 'Opłacony'}
                      </span>
                    </td>
                    <td style={{textAlign:'right', fontWeight: 600, color: t.amount.startsWith('+') ? '#16A34A' : '#050505'}}>{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <div className="ae-card">
              <div className="ae-card-header">
                <div className="ae-card-title">Budżet wg działu</div>
              </div>
              {departments.map((d, i) => (
                <div className="ae-bar-row" key={i}>
                  <div className="ae-bar-label">{d.name}</div>
                  <div className="ae-bar-track">
                    <div className="ae-bar-fill" style={{width: `${d.pct}%`, opacity: 0.7 + i * 0.06}}></div>
                  </div>
                  <div className="ae-bar-val">{d.val}</div>
                </div>
              ))}
            </div>
            <div className="ae-card">
              <div className="ae-card-header">
                <div className="ae-card-title">Aktywność</div>
              </div>
              {activityFeed.map((a, i) => (
                <div className="ae-activity-item" key={i}>
                  <div className="ae-activity-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke={a.color} strokeWidth="1.4"/>
                      <path d="M7 4.5v3l1.5 1.5" stroke={a.color} strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="ae-activity-text">
                    <div className="ae-activity-title">{a.title}</div>
                    <div className="ae-activity-sub">{a.sub}</div>
                  </div>
                  <div className="ae-activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Dashboard });
