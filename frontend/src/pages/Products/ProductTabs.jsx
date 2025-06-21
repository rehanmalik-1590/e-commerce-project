import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
  reviews
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "/assets/uploads/";

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="flex mb-4 space-x-4 overflow-x-auto">
        <button
          onClick={() => handleTabClick(1)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 1
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          Write Your Review
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 2
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          All Reviews
        </button>
        {/* <button
          onClick={() => handleTabClick(3)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            activeTab === 3
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
          }`}
        >
          Related Products
        </button> */}
      </div>

      {activeTab === 1 && (
        <div className="w-full p-6 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg">
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label htmlFor="rating" className="block text-xl mb-2 text-blue-700">
                  Rating
                </label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-2 border rounded-lg text-gray-800 bg-gradient-to-r from-gray-100 to-white"
                >
                  <option value="">Select</option>
                  <option value="1">Inferior</option>
                  <option value="2">Decent</option>
                  <option value="3">Great</option>
                  <option value="4">Excellent</option>
                  <option value="5">Exceptional</option>
                </select>
              </div>

              <div>
                <label htmlFor="comment" className="block text-xl mb-2 text-blue-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border rounded-lg text-gray-800 bg-gradient-to-r from-gray-100 to-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800"
              >
                {loadingProductReview ? "Submitting..." : "Submit"}
              </button>
            </form>
          ) : (
            <p className="text-center text-blue-700">
              Please{" "}
              <Link
                to="/login"
                className="text-blue-600 underline hover:bg-pink-400 hover:text-white px-2 py-1 rounded"
              >
                sign in
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className="w-full p-6 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-lg">
          {!reviews || reviews.length === 0 ? (
            <p className="text-center text-gray-800">No Reviews</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-blue-700">Reviewer</th>
                    <th className="p-3 text-left text-blue-700">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3">
                        <strong>{review.name}</strong>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-3">
                        <Ratings value={review.rating} />
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 3 && (
        <div className="w-full">
          {!data ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${imageBaseUrl}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `${imageBaseUrl}default-product.jpg`;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">{product.name}</h3>
                    <p className="text-gray-600 font-bold mb-2">${product.price.toFixed(2)}</p>
                    <Link
                      to={`/product/${product._id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;