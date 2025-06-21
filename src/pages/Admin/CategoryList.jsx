import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Model from "../../components/Model";
import AdminMenu from "./AdminMenu";
import { dummyProducts } from "../../data/dummyProducts";

const CategoryList = () => {
    // Extract unique categories from dummyProducts
    const uniqueCategories = [
        ...new Set(dummyProducts.map((product) => product.category)),
    ];

    // Convert into category objects (mock format)
    const categories = uniqueCategories.map((name, index) => ({
        _id: `cat_${index + 1}`,
        name,
    }));

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modelVisible, setModelVisible] = useState(false);

    // Mock create handler
    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Category name is required");
            return;
        }
        toast.success(`${name} created (mock only)`);
        setName("");
    };

    // Mock update handler
    const handleUpdateCategory = (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error("Category name is required");
            return;
        }
        toast.success(`${selectedCategory.name} updated to ${updatingName} (mock only)`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModelVisible(false);
    };

    // Mock delete handler
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
                        <button
                            key={category._id}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={() => {
                                setModelVisible(true);
                                setSelectedCategory(category);
                                setUpdatingName(category.name);
                            }}
                        >
                            {category.name}
                        </button>
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
