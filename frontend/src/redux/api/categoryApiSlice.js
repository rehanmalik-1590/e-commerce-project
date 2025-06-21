import { apiSlice } from "./apiSlice";
import { dummyProducts } from "../../data/dummyProducts";

// Extract unique categories from dummyProducts
const uniqueCategoryNames = [
  ...new Set(dummyProducts.map((product) => product.category)),
];

// Create mock category objects with _id and name
let dummyCategories = uniqueCategoryNames.map((name, index) => ({
  _id: `cat_${index + 1}`,
  name,
}));

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      queryFn: (newCategory) => {
        const exists = dummyCategories.find((c) => c.name === newCategory.name);
        if (exists) {
          return {
            error: {
              status: 400,
              data: { message: "Category already exists" },
            },
          };
        }

        const newCat = {
          _id: `cat_${dummyCategories.length + 1}`,
          ...newCategory,
        };
        dummyCategories.push(newCat);
        return { data: newCat };
      },
    }),

    updateCategory: builder.mutation({
      queryFn: ({ categoryId, updatedCategory }) => {
        const index = dummyCategories.findIndex((c) => c._id === categoryId);
        if (index !== -1) {
          dummyCategories[index] = {
            ...dummyCategories[index],
            ...updatedCategory,
          };
          return { data: dummyCategories[index] };
        }
        return {
          error: {
            status: 404,
            data: { message: "Category not found" },
          },
        };
      },
    }),

    deleteCategory: builder.mutation({
      queryFn: (categoryId) => {
        const index = dummyCategories.findIndex((c) => c._id === categoryId);
        if (index !== -1) {
          const deleted = dummyCategories.splice(index, 1);
          return { data: deleted[0] };
        }
        return {
          error: {
            status: 404,
            data: { message: "Category not found" },
          },
        };
      },
    }),

    fetchCategories: builder.query({
      queryFn: () => {
        return { data: dummyCategories };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
