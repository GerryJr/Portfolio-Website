const REWARDS = [
  { name: 'Free Drip Coffee', points: 50, desc: 'Any size drip coffee' },
  { name: '$3 Off Any Drink', points: 100, desc: 'Applied at checkout' },
  { name: 'Free Specialty Latte', points: 150, desc: 'Any specialty latte, any size' },
  { name: 'Free Acai Bowl', points: 250, desc: 'Classic acai or pitaya bowl' },
  { name: '$10 Off Order', points: 350, desc: 'Applied to your total' },
];

export default function KrispRewards() {
  return (
    <>
      <section className="krisp-rewards-hero">
        <h1 className="krisp-rewards-heroTitle">KRISP Rewards</h1>
        <p className="krisp-rewards-heroSubtitle">
          Earn 1 point for every $1 spent. Redeem for free drinks, food, and more.
          Just use your phone number at checkout.
        </p>
        <div className="krisp-rewards-phoneForm">
          <input type="tel" placeholder="Enter your phone number" className="krisp-rewards-phoneInput" />
          <button className="krisp-btn krisp-btn-primary">Look Up Points</button>
        </div>
      </section>

      <section style={{ padding: '60px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>How It Works</h2>
        <div className="krisp-rewards-stepsGrid">
          <div className="krisp-rewards-step">
            <div className="krisp-rewards-stepIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <h3 className="krisp-rewards-stepTitle">1. Sign Up</h3>
            <p className="krisp-rewards-stepDesc">Give your phone number at checkout or in the app.</p>
          </div>
          <div className="krisp-rewards-step">
            <div className="krisp-rewards-stepIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            </div>
            <h3 className="krisp-rewards-stepTitle">2. Earn Points</h3>
            <p className="krisp-rewards-stepDesc">1 point per $1 spent. Added automatically.</p>
          </div>
          <div className="krisp-rewards-step">
            <div className="krisp-rewards-stepIcon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            </div>
            <h3 className="krisp-rewards-stepTitle">3. Redeem</h3>
            <p className="krisp-rewards-stepDesc">Cash in points for free drinks, food, and discounts.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', background: 'var(--secondary)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>Available Rewards</h2>
        <div className="krisp-rewards-rewardsGrid">
          {REWARDS.map((r, i) => (
            <div key={i} className="krisp-rewards-rewardCard">
              <div className="krisp-rewards-rewardInfo">
                <h3 className="krisp-rewards-rewardName">{r.name}</h3>
                <p className="krisp-rewards-rewardDesc">{r.desc}</p>
              </div>
              <div className="krisp-rewards-rewardCost">
                <div className="krisp-rewards-rewardPoints">{r.points}</div>
                <div className="krisp-rewards-rewardLabel">pts</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 24 }}>
          Powered by Toast Loyalty. Points tracked by phone number.
        </p>
      </section>
    </>
  );
}
