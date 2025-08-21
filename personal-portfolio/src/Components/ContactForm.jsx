import React from 'react';


const ContactForm = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form">
        
        <div className="form-row">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <div className="form-row">
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
        </div>

        <textarea placeholder="Your Message" rows="5"></textarea>

       

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;