import { Link, useSearchParams } from 'react-router-dom';

export default function KrispConfirmation() {
  const [params] = useSearchParams();

  const orderNumber = params.get('order');
  const total = params.get('total');
  const points = params.get('points');
  const location = params.get('location');

  /* Loading skeleton if somehow no params */
  if (!orderNumber) {
    return (
      <div className="krisp-confirm-page">
        <div className="krisp-confirm-container">
          <div className="krisp-confirm-shimmerCircle" />
          <div className="krisp-confirm-shimmerLine" />
          <div className="krisp-confirm-shimmerLine" />
          <div className="krisp-confirm-shimmerCard" />
        </div>
      </div>
    );
  }

  return (
    <div className="krisp-confirm-page">
      <div className="krisp-confirm-container">
        <div className="krisp-confirm-checkCircle">
          <svg
            className="krisp-confirm-checkIcon"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="krisp-confirm-title">Order Placed!</h1>
        <p className="krisp-confirm-subtitle">
          Your order #{orderNumber} has been sent to the kitchen
        </p>

        <div className="krisp-confirm-card">
          <div className="krisp-confirm-row">
            <span className="krisp-confirm-label">Order Number</span>
            <span className="krisp-confirm-value">#{orderNumber}</span>
          </div>
          <div className="krisp-confirm-row">
            <span className="krisp-confirm-label">Total Paid</span>
            <span className="krisp-confirm-value">${total}</span>
          </div>
          <div className="krisp-confirm-row">
            <span className="krisp-confirm-label">Pickup At</span>
            <span className="krisp-confirm-value">{location}</span>
          </div>
          <div className="krisp-confirm-row krisp-confirm-pointsRow">
            <span className="krisp-confirm-label">Points Earned</span>
            <span className="krisp-confirm-pointsValue">+{points} pts</span>
          </div>
        </div>

        <p className="krisp-confirm-notice">
          We'll have your order ready shortly. Check in at the counter when you arrive!
        </p>

        <img
          src="/demo/krisp/krisp-icon.webp"
          alt="KRISP"
          width={48}
          height={48}
          className="krisp-confirm-logo"
        />

        <div className="krisp-confirm-buttons">
          <Link to="/demo/krisp-fresh-living/order" className="krisp-confirm-primaryBtn">
            Order Again
          </Link>
          <Link to="/demo/krisp-fresh-living/rewards" className="krisp-confirm-secondaryBtn">
            View Rewards
          </Link>
        </div>
      </div>
    </div>
  );
}
