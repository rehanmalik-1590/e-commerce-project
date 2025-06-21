import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "/assets/uploads/";

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const getImagePath = (image) => {
    if (!image) return `${imageBaseUrl}default-product.jpg`;
    if (image.startsWith("http") || image.startsWith("/")) return image;
    return `${imageBaseUrl}${image}`;
  };

  return (
    <div className="min-h-screen w-full p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold">Your cart is empty</h2>
            <Link to="/shop" className="text-blue-300 underline hover:text-blue-400">
              Go To Shop
            </Link>
          </div>
        ) : (
          <div className="mx-2 sm:mx-5 md:mx-10 lg:mx-20 w-auto rounded-lg border border-gray-700 p-2 sm:p-4 md:p-6 bg-gray-800">
            {/* Mobile View */}
            <div className="block lg:hidden">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 rounded-lg border border-gray-700 p-3 sm:p-4 bg-gray-700"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                    <img
                      src={getImagePath(item.image)}
                      alt={item.name}
                      className="w-full sm:w-24 h-24 rounded-lg object-cover shadow-md mb-3 sm:mb-0"
                      onError={(e) => {
                        e.target.src = `${imageBaseUrl}default-product.jpg`;
                        e.target.className = 'w-full sm:w-24 h-24 rounded-lg object-contain shadow-md mb-3 sm:mb-0 bg-gray-600';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="flex-1 w-full">
                      <h3 className="text-base sm:text-lg font-medium text-gray-100">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">Brand: {item.brand}</p>
                      <p className="text-sm sm:text-base text-gray-300">
                        Price: {item.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <select
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                          className="rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-white text-sm sm:text-base"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCartHandler(item._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-transparent">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-3 text-left text-gray-100">Product</th>
                      <th className="px-6 py-3 text-left text-gray-100">Name</th>
                      <th className="px-6 py-3 text-left text-gray-100">Price</th>
                      <th className="px-6 py-3 text-left text-gray-100">Brand</th>
                      <th className="px-6 py-3 text-left text-gray-100">Quantity</th>
                      <th className="px-6 py-3 text-left text-gray-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="px-4 py-4">
                          <img
                            src={getImagePath(item.image)}
                            alt={item.name}
                            className="h-24 w-24 rounded-lg object-cover shadow-md"
                            onError={(e) => {
                              e.target.src = `${imageBaseUrl}default-product.jpg`;
                              e.target.className = 'h-24 w-24 rounded-lg object-contain shadow-md bg-gray-600';
                              e.target.onerror = null;
                            }}
                          />
                        </td>
                        <td className="px-4 py-4 text-gray-100">{item.name}</td>
                        <td className="px-4 py-4 text-gray-100">
                          {item.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="px-4 py-4 text-gray-100">{item.brand}</td>
                        <td className="px-4 py-4">
                          <select
                            value={item.qty}
                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                            className="rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-white"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => removeFromCartHandler(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-6 space-y-4 border-t border-gray-700 pt-6 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
              <div className="text-center sm:text-left space-y-2 sm:space-y-1">
                <p className="text-base sm:text-lg font-semibold text-gray-100">
                  Total Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-100">
                  Total Price: {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                </p>
              </div>
              <button
                className={`w-full sm:w-auto py-2 px-4 text-base sm:text-lg font-medium rounded-lg ${
                  cartItems.length === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;