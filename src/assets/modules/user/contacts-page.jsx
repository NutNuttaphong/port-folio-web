import githubIcon from "../../images/icon/github-black.png";
import phoneIcon from "../../images/icon/phone.png";
import mailIcon from "../../images/icon/mails.png";

function ContactsPage() {
  const urlGit = "https://github.com/NutNuttaphong";

  const handleCardClick = () => {
    const targetUrl = urlGit;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="root">
      <div className="mb-8 flex flex-col items-cemter gap-2">
        <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
          Contact Us
        </div>
        <p>
          Ready to start planning your next event? Get in touch with our team
        </p>
      </div>

      <div className="grid grid-cols-1  gap-8">
        <div className="flex flex-col items-start gap-4">
          <div className="text-2xl font-bold">Get in Touch</div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
             <img className="w-8 h-8" src={githubIcon} alt="" />
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              
              <p className="font-bold">My git</p>
              <p className="cursor-pointer" onClick={() => handleCardClick()}>github.com/NutNuttaphong</p>
            </div>
          </div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
             <img className="w-8 h-8" src={phoneIcon} alt="" />
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              <p className="font-bold">Phone</p>
              <p>061-267-9518</p>
            </div>
          </div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
              <img className="w-8 h-8" src={mailIcon} alt="" />
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              <p className="font-bold">Email</p>
              <p>nuttphong.sp@gmail.com</p>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-start gap-4 border-2 w-full border-gray-300 rounded-xl p-4  ">
          <div className="text-2xl font-bold">Send us a Message</div>
          <div className="flex flex-col justify-between gap-4 w-full h-full">
            <form className="flex flex-col gap-4 w-full">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Your First Name"
                  className="border border-gray-300 w-full rounded-xl p-2"
                />
                <input
                  type="text"
                  placeholder="Your Last Name"
                  className="border border-gray-300 w-full rounded-xl p-2"
                />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-xl p-2"
              />
              <input
                type="Phone"
                placeholder="Your Phone"
                className="border border-gray-300 rounded-xl p-2"
              />
              <input
                type="Event Type"
                placeholder="Your Event Type"
                className="border border-gray-300 rounded-xl p-2"
              />
              <textarea
                placeholder="Your Message"
                className="border border-gray-300 rounded-xl p-2"
              />
            </form>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ContactsPage;
