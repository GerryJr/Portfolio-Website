import { LOCATIONS } from '../lib/menu-data';

export default function KrispContact() {
  return (
    <>
      <div className="krisp-contact-pageHeader">
        <h1 className="krisp-contact-pageTitle">Contact Us</h1>
        <p className="krisp-contact-pageSubtitle">We'd love to hear from you</p>
      </div>

      <section style={{ padding: '48px 24px' }}>
        <div className="krisp-contact-contactGrid">
          {/* Contact Form */}
          <div className="krisp-contact-formSection">
            <h2>Send a Message</h2>
            <form className="krisp-contact-form">
              <div className="krisp-contact-formGroup">
                <label className="krisp-contact-formLabel">Name</label>
                <input type="text" className="krisp-contact-formInput" placeholder="Your name" />
              </div>
              <div className="krisp-contact-formGroup">
                <label className="krisp-contact-formLabel">Email</label>
                <input type="email" className="krisp-contact-formInput" placeholder="your@email.com" />
              </div>
              <div className="krisp-contact-formGroup">
                <label className="krisp-contact-formLabel">Phone</label>
                <input type="tel" className="krisp-contact-formInput" placeholder="(949) 555-0123" />
              </div>
              <div className="krisp-contact-formGroup">
                <label className="krisp-contact-formLabel">Message</label>
                <textarea className="krisp-contact-formTextarea" placeholder="How can we help?" />
              </div>
              <button type="submit" className="krisp-btn krisp-btn-primary">Send Message</button>
            </form>
          </div>

          {/* Locations */}
          <div className="krisp-contact-locationsInfo">
            <h2>Visit Us</h2>
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="krisp-contact-locationCard">
                <h3 className="krisp-contact-locationName">{loc.name}</h3>
                <p className="krisp-contact-locationDetail">{loc.address}</p>
                <p className="krisp-contact-locationDetail">{loc.city}</p>
                <p className="krisp-contact-locationDetail">{loc.phone}</p>
                <div className="krisp-contact-locationHours">
                  {Object.entries(loc.hours).map(([day, time]) => (
                    <p key={day}>{day}: {time}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
