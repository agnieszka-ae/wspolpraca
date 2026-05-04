// alloweat — Dane i usługi (Data & Services) Screen

const DataServicesStyles = `
  .ae-data { padding: 28px 28px 40px; overflow-y: auto; height: 100%; }
  .ae-section-label { font-size: 11px; font-weight: 600; color: rgba(5,5,5,0.4); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; margin-top: 24px; }
  .ae-employee-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .ae-employee-card { background: #fff; border: 1px solid rgba(20,20,20,0.10); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 150ms; }
  .ae-employee-card:hover { border-color: rgba(116,72,208,0.25); box-shadow: 0 2px 8px rgba(116,72,208,0.08); }
  .ae-emp-avatar { width: 40px; height: 40px; border-radius: 10px; background: #F5F1FE; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #7448D0; flex-shrink: 0; }
  .ae-emp-name { font-size: 13px; font-weight: 600; color: #050505; margin-bottom: 2px; }
  .ae-emp-role { font-size: 11px; color: rgba(5,5,5,0.45); }
  .ae-emp-balance { margin-left: auto; text-align: right; }
  .ae-emp-balance-val { font-size: 13px; font-weight: 700; color: #050505; }
  .ae-emp-balance-label { font-size: 10px; color: rgba(5,5,5,0.40); }
  .ae-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .ae-service-card { background: #fff; border: 1px solid rgba(20,20,20,0.10); border-radius: 12px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; transition: all 150ms; }
  .ae-service-card:hover { border-color: rgba(116,72,208,0.2); box-shadow: 0 2px 8px rgba(116,72,208,0.07); }
  .ae-service-icon { width: 38px; height: 38px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }
  .ae-service-name { font-size: 14px; font-weight: 600; color: #050505; }
  .ae-service-desc { font-size: 12px; color: rgba(5,5,5,0.50); line-height: 1.4; }
  .ae-service-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; width: fit-content; }
  .ae-top-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 0; }
  .ae-search-inline { display: flex; align-items: center; gap: 7px; background: #fff; border: 1px solid rgba(20,20,20,0.12); border-radius: 8px; padding: 0 11px; height: 30px; width: 220px; }
  .ae-search-inline input { border: none; outline: none; font-family: 'Figtree', sans-serif; font-size: 12px; color: #050505; background: transparent; width: 100%; }
  .ae-search-inline input::placeholder { color: rgba(5,5,5,0.35); }
`;

const employees = [
  { name: 'Anna Kowalska', role: 'Marketing · Warszawa', initials: 'AK', balance: '248,00 zł' },
  { name: 'Marek Nowak', role: 'Inżynieria · Kraków', initials: 'MN', balance: '180,50 zł' },
  { name: 'Joanna Wiśniewska', role: 'HR · Wrocław', initials: 'JW', balance: '320,00 zł' },
  { name: 'Piotr Zając', role: 'Sprzedaż · Gdańsk', initials: 'PZ', balance: '95,00 zł' },
  { name: 'Katarzyna Lis', role: 'Finanse · Warszawa', initials: 'KL', balance: '412,00 zł' },
  { name: 'Tomasz Krawczyk', role: 'Inżynieria · Poznań', initials: 'TK', balance: '0,00 zł' },
];

const services = [
  { name: 'Catering Business', desc: 'Codzienne dostawy obiadów do biura', color: '#F5F1FE', iconColor: '#7448D0', status: 'active', statusLabel: 'Aktywna' },
  { name: 'Karta posiłkowa', desc: 'Wirtualna karta do restauracji partnerskich', color: '#F0FDF4', iconColor: '#16A34A', status: 'active', statusLabel: 'Aktywna' },
  { name: 'Voucher śniadaniowy', desc: 'Miesięczne vouchery na śniadania', color: '#FFFBEB', iconColor: '#D97706', status: 'pending', statusLabel: 'Konfiguracja' },
  { name: 'GreenBox Lunch', desc: 'Eko lunch boxy od lokalnych producentów', color: '#EFF6FF', iconColor: '#2563EB', status: 'inactive', statusLabel: 'Nieaktywna' },
  { name: 'Dietetyk online', desc: 'Konsultacje żywieniowe dla pracowników', color: '#FEF2F2', iconColor: '#DC2626', status: 'pending', statusLabel: 'Wkrótce' },
  { name: 'Pakiet premium', desc: 'Rozszerzone świadczenia i rabaty', color: '#F5F1FE', iconColor: '#7448D0', status: 'active', statusLabel: 'Aktywna' },
];

const statusBadge = {
  active: { cls: 'ae-service-badge ae-badge-green', dot: '#16A34A' },
  pending: { cls: 'ae-service-badge ae-badge-orange', dot: '#D97706' },
  inactive: { cls: 'ae-service-badge ae-badge-gray', dot: '#A0A0B8' },
};

function DataServices() {
  return (
    <React.Fragment>
      <style>{DataServicesStyles}</style>
      <div className="ae-data">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <div style={{fontSize:22,fontWeight:700,color:'#050505',marginBottom:2}}>Dane i usługi</div>
            <div style={{fontSize:13,color:'rgba(5,5,5,0.45)'}}>Pracownicy i aktywne usługi żywieniowe</div>
          </div>
          <div className="ae-search-inline">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="#727272" strokeWidth="1.3"/>
              <path d="M9 9l2.5 2.5" stroke="#727272" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input placeholder="Szukaj pracownika..." />
          </div>
        </div>

        <div className="ae-section-label" style={{marginTop:0}}>Pracownicy ({employees.length})</div>
        <div className="ae-employee-grid">
          {employees.map((e, i) => (
            <div className="ae-employee-card" key={i}>
              <div className="ae-emp-avatar">{e.initials}</div>
              <div style={{flex:1, minWidth:0}}>
                <div className="ae-emp-name">{e.name}</div>
                <div className="ae-emp-role">{e.role}</div>
              </div>
              <div className="ae-emp-balance">
                <div className="ae-emp-balance-val">{e.balance}</div>
                <div className="ae-emp-balance-label">saldo</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ae-section-label">Usługi</div>
        <div className="ae-services-grid">
          {services.map((s, i) => (
            <div className="ae-service-card" key={i}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div className="ae-service-icon" style={{background: s.color}}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="7" r="4" stroke={s.iconColor} strokeWidth="1.5"/>
                    <path d="M3 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke={s.iconColor} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="ae-service-name">{s.name}</div>
              </div>
              <div className="ae-service-desc">{s.desc}</div>
              <div className={statusBadge[s.status].cls}>
                <span style={{width:5,height:5,borderRadius:'50%',background:statusBadge[s.status].dot,display:'inline-block'}}></span>
                {s.statusLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { DataServices });
