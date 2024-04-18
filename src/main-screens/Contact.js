import ContactForm from "../components/Contact-Form";


function Contact() {
    return (
      <><div className="Contact">
          <div class = "w-full bg-gray5 px-16 py-16">
          <h1 class = "text-section-head">Contact Us</h1>
          <p class = "text-body text-body-copy pt-4">Use the form below for any inquiries.</p>
        </div>
        <div class = "w-full px-16 py-16">
            <ContactForm/>

          </div>

      </div></>
  
    );
  }
  
  export default Contact;