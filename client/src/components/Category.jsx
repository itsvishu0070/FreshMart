
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500">
        Categories
      </h2>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-xl gap-2 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 shadow-md"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="max-w-20 transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-base font-semibold text-gray-700 drop-shadow-md">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
