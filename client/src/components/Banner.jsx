
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="relative">
      {/* Banner Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="hidden md:block w-full object-cover max-h-[90vh]"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="md:hidden w-full object-cover max-h-[90vh]"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-0 md:pl-16 lg:pl-24">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#7ed957] via-[#00bf63] to-[#168039] text-transparent bg-clip-text text-center md:text-left max-w-96 leading-tight shadow-md">
          Freshness You Can Trust,
          <br className="hidden md:block" />
          Savings You’ll Love!
        </h1>

        <div className="flex items-center mt-8 font-semibold gap-4">
          <Link
            to="/products"
            className="flex group items-center gap-2 px-6 md:px-8 py-3 rounded-full bg-[#00bf63] hover:bg-[#00a654] text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/products"
            className="hidden md:flex group items-center gap-2 px-6 md:px-8 py-3 rounded-full border border-[#00bf63] text-[#00bf63] bg-white hover:bg-[#f0fff5] hover:scale-105 transition-all duration-300"
          >
            Explore Deals
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

