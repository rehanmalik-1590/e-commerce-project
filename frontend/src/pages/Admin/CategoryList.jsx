import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Model from "../../components/Model";
import AdminMenu from "./AdminMenu";
import { dummyProducts } from "../../data/dummyProducts";

const CategoryList = () => {
  // Extract unique categories and their first image from dummyProducts
  const categoryMap = {};
  dummyProducts.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = product.image; // take first image found
    }
  });

  const categories = Object.keys(categoryMap).map((name, index) => ({
    _id: `cat_${index + 1}`,
    name,
    image: categoryMap[name], // image filename only
  }));

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modelVisible, setModelVisible] = useState(false);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    toast.success(`${name} created (mock only)`);
    setName("");
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    toast.success(
      `${selectedCategory.name} updated to ${updatingName} (mock only)`
    );
    setSelectedCategory(null);
    setUpdatingName("");
    setModelVisible(false);
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    toast.success(`${selectedCategory.name} deleted (mock only)`);
    setSelectedCategory(null);
    setModelVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Admin Menu */}
      <div className="w-full md:w-3/4 lg:w-1/2 mb-4">
        <AdminMenu />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 lg:w-1/2 p-4 rounded-lg shadow-md">
        <div className="text-lg font-semibold text-center mb-4">
          Manage Categories
        </div>

        {/* Category Form */}
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />

        <hr className="my-4" />

        {/* Categories List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-blue-500 text-white p-3 rounded-lg flex items-center gap-4 hover:bg-blue-600 cursor-pointer transition"
              onClick={() => {
                setModelVisible(true);
                setSelectedCategory(category);
                setUpdatingName(category.name);
              }}
            >
              {/* <img
                // src={`${import.meta.env.VITE_IMAGE_BASE_URL || ''}${category.image || 'default-category.jpg'}`}
                alt={category.name}
                onError={(e) => {
                  // e.target.src = `${import.meta.env.VITE_IMAGE_BASE_URL || ''}default-category.jpg`;
                  e.target.onerror = null;
                }}
                className="w-10 h-10 rounded-full object-cover"
              /> */}
              <span className="text-white font-medium">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Model>
      </div>
    </div>
  );
};

export default CategoryList;
