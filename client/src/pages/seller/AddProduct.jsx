
import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-10 flex flex-col items-center bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl md:p-10 p-5 space-y-6 w-full max-w-2xl"
      >
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Upload Product Images
          </p>
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden hover:border-indigo-400 transition">
                    <img
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : assets.upload_area
                      }
                      alt="uploadArea"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type product name..."
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="product-description"
            className="text-base font-medium"
          >
            Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
            className="px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-base font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.path}>
                {category.path}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex-1 min-w-[120px] flex flex-col gap-2">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹0"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              required
            />
          </div>
          <div className="flex-1 min-w-[120px] flex flex-col gap-2">
            <label htmlFor="offer-price" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="₹0"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-300"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
