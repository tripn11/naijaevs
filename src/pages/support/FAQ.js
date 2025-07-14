import SEO from '../../components/SEO';

const FAQ = () => {
  return (
    <>
      <SEO title="FAQ | Enerplaz EVs" 
        description="Find answers to common questions about our electric vehicles, charging solutions, and more." 
        url={`${process.env.NEXT_PUBLIC_API_URL}/support/FAQ`}
      />
      
      <section className="faq">
        <div className="faq-box">
          <img
            src='../support/sleepingDog.gif'
            alt="Sleeping dog - Billy the bot"
            className="sleeping-dog"
          />
          <div className="faq-text">
            <h2>Oops! Billy is Taking a Nap 😴</h2>
            <p>Meet <strong>Billy</strong>, our Enerplaz Bot who knows 
            everything about EVs — from charging speeds to battery secrets. 
            But after answering thousands of questions, he’s decided to take a little break.
            </p>
            <p>
              While Billy recharges, feel free to contact us or check back soon. He’ll be back — well rested and ready to power through your EV curiosities!
            </p>
          </div>
        </div>
      </section>
    </>
    
  );
};

export default FAQ;