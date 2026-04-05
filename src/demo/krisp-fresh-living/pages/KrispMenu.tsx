import { Link } from 'react-router-dom';
import { getAllGroups, formatPrice } from '../lib/menu-data';

export default function KrispMenu() {
  const groups = getAllGroups('michelson');

  return (
    <>
      <div className="krisp-menu-pageHeader">
        <h1 className="krisp-menu-pageTitle">Our Menu</h1>
        <p className="krisp-menu-pageSubtitle">
          Prices for Michelson location &middot; Tap any item to order
        </p>
      </div>

      <nav className="krisp-menu-categoryNav">
        <ul className="krisp-menu-categoryList">
          {groups.map(g => (
            <li key={g.guid}>
              <a href={`#${g.guid}`} className="krisp-menu-categoryPill">{g.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="krisp-menu-menuContent">
        {groups.map(group => (
          <section key={group.guid} id={group.guid} className="krisp-menu-menuSection">
            <h2 className="krisp-menu-sectionTitle">{group.name}</h2>
            <div className="krisp-menu-menuGrid">
              {group.items.filter(i => !i.outOfStock).map(item => (
                <Link to="/demo/krisp-fresh-living/order" key={item.guid} className="krisp-menu-menuCard">
                  {item.imageUrl && (
                    <div className="krisp-menu-cardImageWrap">
                      <img src={item.imageUrl} alt={item.name} className="krisp-menu-cardImage" loading="lazy" />
                    </div>
                  )}
                  <div className="krisp-menu-cardBody">
                    <h3 className="krisp-menu-cardName">{item.name}</h3>
                    {item.description && (
                      <p className="krisp-menu-cardDesc">{item.description}</p>
                    )}
                    <p className="krisp-menu-cardPrice">{formatPrice(item.prices)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
