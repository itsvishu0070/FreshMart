
const Footer = () => {
  return (
    <div className="bg-white text-gray-600 pt-1 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-10">
        {/* Logo & About */}
        <div className="max-w-xs">
          <h1 className="text-3xl font-bold text-gray-900">FreshMart</h1>
          <p className="text-sm mt-3 leading-relaxed">
            Shop smarter with FreshMart — fresh groceries, everyday essentials,
            and exclusive deals delivered to your door in no time.
          </p>
          <div className="flex items-center gap-4 mt-5 text-gray-500">
            {[
              /* paths */
            ].map((d, i) => (
              <svg
                key={i}
                className="w-6 h-6 hover:text-indigo-600 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
                dangerouslySetInnerHTML={{ __html: d }}
              />
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-3">COMPANY</p>
          <ul className="flex flex-col gap-2 text-sm">
            {["About", "Careers", "Press", "Blog", "Partners"].map(
              (item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-indigo-500 transition">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-3">SUPPORT</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              "Help Center",
              "Safety Information",
              "Cancellation Options",
              "Contact Us",
              "Accessibility",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-indigo-500 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-xs">
          <p className="text-lg font-semibold text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white border border-gray-300 rounded-l-md px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full max-w-[220px]"
            />
            <button className="bg-indigo-600 h-10 w-10 flex items-center justify-center rounded-r-md hover:bg-indigo-700 transition">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-10" />

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-4 text-sm">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Grocery App. All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          {["Privacy", "Terms", "Sitemap"].map((item, i) => (
            <li key={i}>
              <a href="#" className="hover:text-indigo-500 transition">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
