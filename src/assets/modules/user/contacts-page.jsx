function ContactsPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start gap-4">
          <div className="text-2xl font-bold">Get in Touch</div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              <p className="font-bold">Address</p>
              <p>123 Event Plaza</p>
              <p>Moscow, Russia 101000</p>
            </div>
          </div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              <p className="font-bold">Email</p>
              <p>nuttphong.sp@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4 border-2 w-full border-gray-300 rounded-xl p-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* <a href="https://www.linkedin.com/company/eventco">
                LinkedIn: EventCo
              </a> */}
              <p className="font-bold">Working Hours</p>
              <p>Mon-Fri: 9:00 - 18:00</p>
              <p>Sat: 10:00 - 16:00</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 border-2 w-full border-gray-300 rounded-xl p-4  ">
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
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
