// alloweat — Finance Screen

const FinanceStyles = `
  .ae-finance { padding: 28px 28px 40px; overflow-y: auto; height: 100%; }
  .ae-finance-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
  .ae-finance-tabs { display: flex; gap: 2px; background: rgba(20,20,20,0.05); border-radius: 8px; padding: 3px; margin-bottom: 20px; }
  .ae-finance-tab { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; color: rgba(5,5,5,0.55); cursor: pointer; transition: all 150ms; white-space: nowrap; }
  .ae-finance-tab.active { background: #fff; color: #050505; font-weight: 600; box-shadow: 0 1px 3px rgba(20,20,20,0.08); }
  .ae-finance-tab:hover:not(.active) { color: #050505; }
  .ae-finance-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 20px; }
  .ae-finance-stat { background:#fff; border:1px solid rgba(20,20,20,0.10); border-radius:12px; padding:18px 20px; }
  .ae-finance-stat-label { font-size:12px;font-weight:600;color:rgba(5,5,5,0.45);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.03em; }
  .ae-finance-stat-value { font-size:26px;font-weight:700;color:#050505; }
  .ae-finance-stat-sub { font-size:12px;color:rgba(5,5,5,0.45);margin-top:4px; }
  .ae-finance-card { background:#fff;border:1px solid rgba(20,20,20,0.10);border-radius:12px;overflow:hidden; }
  .ae-finance-table-head { display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:8px;padding:10px 20px;background:rgba(20,20,20,0.02);border-bottom:1px solid rgba(20,20,20,0.08); }
  .ae-finance-th { font-size:11px;font-weight:600;color:rgba(5,5,5,0.40);text-transform:uppercase;letter-spacing:0.04em; }
  .ae-finance-row { display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:8px;padding:12px 20px;border-bottom:1px solid rgba(20,20,20,0.06);align-items:center;cursor:pointer;transition:background 150ms; }
  .ae-finance-row:last-child { border-bottom:none; }
  .ae-finance-row:hover { background:rgba(20,20,20,0.02); }
  .ae-finance-cell { font-size:13px;color:#050505; }
  .ae-finance-cell.muted { color:rgba(5,5,5,0.50); font-size:12px; }
  .ae-finance-cell.bold { font-weight:600; }
  .ae-finance-cell.positive { color:#16A34A;font-weight:600; }
  .ae-finance-cell.negative { color:#DC2626;font-weight:600; }
  .ae-vendor-name { font-weight:500;font-size:13px;color:#050505; }
  .ae-vendor-sub { font-size:11px;color:rgba(5,5,5,0.40);margin-top:1px; }
  .ae-filter-bar { display:flex;align-items:center;gap:8px;margin-bottom:16px; }
  .ae-filter-btn { display:inline-flex;align-items:center;gap:5px;padding:0 12px;height:30px;border:1px solid rgba(20,20,20,0.12);border-radius:6px;font-family:'Figtree',sans-serif;font-size:12px;font-weight:500;color:rgba(5,5,5,0.65);background:#fff;cursor:pointer;transition:all 150ms; }
  .ae-filter-btn:hover { background:#F7F7FB;color:#050505; }
  .ae-filter-btn.active { background:#F5F1FE;border-color:#7448D0;color:#7448D0; }
`;

const invoices = [
  { name: 'Catering Business Sp. z o.o.', sub: 'FV/2026/04/001', amount: '8 400,00 zł', date: '30 kwi 2026', due: '14 maj 2026', status: 'pending' },
  { name: 'Restauracja Smaczna', sub: 'FV/2026/04/002', amount: '1 260,00 zł', date: '27 kwi 2026', due: '11 maj 2026', status: 'paid' },
  { name: 'GreenBox Catering', sub: 'FV/2026/04/003', amount: '3 780,00 zł', date: '25 kwi 2026', due: '09 maj 2026', status: 'paid' },
  { name: 'Bistro Centrum', sub: 'FV/2026/04/004', amount: '720,00 zł', date: '24 kwi 2026', due: '08 maj 2026', status: 'overdue' },
  { name: 'FoodCorp Polska', sub: 'FV/2026/04/005', amount: '5 100,00 zł', date: '20 kwi 2026', due: '04 maj 2026', status: 'paid' },
  { name: 'Lunch Masters', sub: 'FV/2026/04/006', amount: '2 340,00 zł', date: '15 kwi 2026', due: '29 kwi 2026', status: 'paid' },
];

const BADGE = {
  paid:    ['ae-badge ae-badge-green',  'Opłacona'],
  pending: ['ae-badge ae-badge-orange', 'Oczekująca'],
  overdue: ['ae-badge ae-badge-red',    'Zaległa'],
};
const TABS = ['Wszystkie', 'Faktury', 'Przelewy', 'Salda', 'Raporty'];

function Finance() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState('all');

  const filtered = activeFilter === 'all' ? invoices
    : invoices.filter(i => i.status === activeFilter);

  return (
    <React.Fragment>
      <style>{FinanceStyles}</style>
      <div className="ae-finance">
        <div className="ae-finance-header">
          <div>
            <div style={{fontSize:22,fontWeight:700,color:'#050505',marginBottom:2}}>Finanse</div>
            <div style={{fontSize:13,color:'rgba(5,5,5,0.45)'}}>Zarządzanie płatnościami i fakturami</div>
          </div>
        </div>
        <div className="ae-finance-tabs">
          {TABS.map((t, i) => (
            <div key={i} className={`ae-finance-tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</div>
          ))}
        </div>
        <div className="ae-finance-stats">
          <div className="ae-finance-stat">
            <div className="ae-finance-stat-label">Do zapłaty</div>
            <div className="ae-finance-stat-value">8 400,00 zł</div>
            <div className="ae-finance-stat-sub">1 faktura oczekująca</div>
          </div>
          <div className="ae-finance-stat">
            <div className="ae-finance-stat-label">Zapłacono w kwietniu</div>
            <div className="ae-finance-stat-value">13 200,00 zł</div>
            <div className="ae-finance-stat-sub">4 faktury opłacone</div>
          </div>
          <div className="ae-finance-stat">
            <div className="ae-finance-stat-label">Zaległości</div>
            <div className="ae-finance-stat-value" style={{color:'#DC2626'}}>720,00 zł</div>
            <div className="ae-finance-stat-sub">1 faktura zaległa</div>
          </div>
        </div>
        <div className="ae-filter-bar">
          {[['all','Wszystkie'],['paid','Opłacone'],['pending','Oczekujące'],['overdue','Zaległe']].map(([k, label]) => (
            <button key={k} className={`ae-filter-btn${activeFilter === k ? ' active' : ''}`} onClick={() => setActiveFilter(k)}>{label}</button>
          ))}
        </div>
        <div className="ae-finance-card">
          <div className="ae-finance-table-head">
            <div className="ae-finance-th">Dostawca</div>
            <div className="ae-finance-th">Kwota</div>
            <div className="ae-finance-th">Data wystawienia</div>
            <div className="ae-finance-th">Termin płatności</div>
            <div className="ae-finance-th">Status</div>
          </div>
          {filtered.map((inv, i) => (
            <div className="ae-finance-row" key={i}>
              <div>
                <div className="ae-vendor-name">{inv.name}</div>
                <div className="ae-vendor-sub">{inv.sub}</div>
              </div>
              <div className={`ae-finance-cell bold${inv.status === 'overdue' ? ' negative' : ''}`}>{inv.amount}</div>
              <div className="ae-finance-cell muted">{inv.date}</div>
              <div className="ae-finance-cell muted">{inv.due}</div>
              <div><span className={BADGE[inv.status][0]}>{BADGE[inv.status][1]}</span></div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Finance });
