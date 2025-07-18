import Link from 'next/link';
import SEO from '@/components/SEO';


const supportCards = [
  {
    title: 'Maintenance',
    image: '/support/maintenance.jpg',
    action: 'Learn More',
    link: '/support/maintenance',
    purpose:'request maintenance'
  },
  {
    title: 'Charger Installation',
    image: '/support/charger-installation.avif',
    action: 'Get Started',
    link: '/support/installation',
    purpose: 'install a charger'
  },
  {
    title: 'Frequently Asked Questions',
    image: '/support/FAQ.jpg',
    action: 'View FAQs',
    link:'/support/FAQ',
  },
  {
    title: 'Enquiry',
    image: '/support/enquiries.jpg',
    action: 'Chat with us',
    link: 'https://wa.me/2348037543295',
    isWhatsapp: true,
  },
];

const Support = () => {
  return (
    <>
      <SEO title="Support | EV Charger & Solar Installation Help" 
        description="Find support for EV charger installation, electric vehicle maintenance, solar panel setup for solar charging, and ways to contact our support team." 
        url='https://enerplazevs.com/support'
      />

        <section id="support">
            <h2>How Can We Help You?</h2>
            <div className="support-grid">
                {supportCards.map((card, index) => (
                <div className="support-card" key={index}>
                    <img src={card.image} alt={card.title} />
                    <div className="card-content">
                    <h3>{card.title}</h3>
                    {card.isWhatsapp?
                    <a href={card.link} target="_blank" rel="noopener noreferrer">
                        <ion-icon name="logo-whatsapp"></ion-icon> {card.action}
                    </a>:
                    <Link
                      href={
                        card.purpose
                          ? { pathname: card.link, query: { purpose: card.purpose } }
                          : card.link
                      }
                    >
                      {card.action}
                    </Link>}
                    </div>
                </div>
                ))}
            </div>
        </section>
    </>
    
  );
};

export default Support;