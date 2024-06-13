/* eslint-disable react/prop-types */
import { categories } from "../Categories/CategoriesData";
const UpdateMealForm = ({
  handleSubmit,
  handleImage,
  setMealData,
  mealData,
}) => {
  return (
    <div className="w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border   rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
                value={mealData?.title}
                onChange={(e) =>
                  setMealData({ ...mealData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3   rounded-md"
                name="category"
                value={mealData?.category}
                onChange={(e) =>
                  setMealData({ ...mealData, category: e.target.value })
                }
              >
                {categories.slice(0, 3).map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="ingredients" className="block text-gray-600">
                Ingredients
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border   rounded-md "
                name="ingredients"
                id="ingredients"
                type="text"
                placeholder="ingredients"
                required
                value={mealData?.ingredients}
                onChange={(e) =>
                  setMealData({ ...mealData, ingredients: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload  py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      onChange={(e) => handleImage(e.target.files[0])}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border   rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={mealData?.price}
                  onChange={(e) =>
                    setMealData({ ...mealData, price: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-1 text-sm my-2">
          <label htmlFor="description" className="block text-gray-600">
            Description
          </label>

          <textarea
            id="description"
            className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border   "
            name="description"
            value={mealData?.description}
            onChange={(e) =>
              setMealData({ ...mealData, description: e.target.value })
            }
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMealForm;
