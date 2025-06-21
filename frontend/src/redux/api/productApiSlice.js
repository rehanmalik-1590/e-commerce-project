import { PRODUCT_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';
import { dummyProducts, generateProductId, generateReviewId } from '../../data/dummyProducts';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: () => ({ data: { products: dummyProducts } }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),

    getProductById: builder.query({
      queryFn: (productId) => ({ 
        data: dummyProducts.find(p => p._id === productId) || dummyProducts[0] 
      }),
      providesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
      ],
    }),

    allProducts: builder.query({
      queryFn: () => ({ data: dummyProducts }),
    }),

    getProductDetails: builder.query({
      queryFn: (productId) => ({
        data: dummyProducts.find(p => p._id === productId) || dummyProducts[0]
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      queryFn: (productData) => {
        const newProduct = {
          ...productData,
          _id: generateProductId(),
          rating: 0,
          numReviews: 0,
          createdAt: new Date().toISOString()
        };
        dummyProducts.push(newProduct);
        return { data: newProduct };
      },
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      queryFn: ({ productId, formData }) => {
        const index = dummyProducts.findIndex(p => p._id === productId);
        if (index >= 0) {
          dummyProducts[index] = { ...dummyProducts[index], ...formData };
          return { data: dummyProducts[index] };
        }
        return { error: { status: 404, data: { message: 'Product not found' } } };
      },
    }),

    uploadProductImage: builder.mutation({
      queryFn: (file) => {
        return { 
          data: { 
            image: `product_${generateProductId()}.jpg`,
            message: 'Image uploaded successfully' 
          } 
        };
      },
    }),

    deleteProduct: builder.mutation({
      queryFn: (productId) => {
        const index = dummyProducts.findIndex(p => p._id === productId);
        if (index >= 0) {
          dummyProducts.splice(index, 1);
          return { data: { message: 'Product deleted' } };
        }
        return { error: { status: 404, data: { message: 'Product not found' } } };
      },
      invalidatesTags: ['Product'],
    }),

    createReview: builder.mutation({
      queryFn: ({ productId, rating, comment }) => {
        const product = dummyProducts.find(p => p._id === productId);
        if (product) {
          const review = {
            _id: generateReviewId(),
            name: 'Demo User',
            rating: Number(rating),
            comment,
            user: 'user_123',
            createdAt: new Date().toISOString()
          };
          
          product.reviews = product.reviews || [];
          product.reviews.push(review);
          
          product.numReviews = product.reviews.length;
          product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
          
          return { data: review };
        }
        return { error: { status: 404, data: { message: 'Product not found' } } };
      },
    }),

    getTopProducts: builder.query({
      queryFn: () => ({ 
        data: [...dummyProducts]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5) 
      }),
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      queryFn: () => ({ 
        data: [...dummyProducts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5) 
      }),
      keepUnusedDataFor: 5,
    }),

    getFilteredProducts: builder.query({
      queryFn: ({ checked, radio }) => {
        let filtered = [...dummyProducts];
        
        if (checked.length > 0) {
          filtered = filtered.filter(p => checked.includes(p.category));
        }
        
        if (radio.length > 0) {
          filtered = filtered.filter(p => p.brand === radio[0]);
        }
        
        return { data: filtered };
      },
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery
} = productApiSlice;