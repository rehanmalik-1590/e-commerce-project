import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        setIsLoading(true);
        setOrderSuccess(false);
        
        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Clear cart
            dispatch(clearCartItems());
            
            // Show success message
            setOrderSuccess(true);
            toast.success("Order placed successfully!");
            
        } catch {
            // Silent error handling - no console errors
            toast.error("Order processing failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ProgressSteps step1 step2 step3 />
            <div className="container w-[80%] ml-[10rem] mt-8">
                {orderSuccess ? (
                    <Message variant="success">
                        Your order has been placed successfully! You can continue shopping.
                    </Message>
                ) : cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-transparent">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-gray-100">Image</th>
                                        <th className="px-6 py-3 text-left text-gray-100">Product</th>
                                        <th className="px-6 py-3 text-left text-gray-100">Quantity</th>
                                        <th className="px-6 py-3 text-left text-gray-100">Price</th>
                                        <th className="px-6 py-3 text-left text-gray-100">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="border-t border-gray-300">
                                    {cart.cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-auto w-[10rem] rounded-lg object-cover shadow-md"
                                                />
                                            </td>
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/product/${item.product}`}
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4 text-sm sm:text-base">{item.qty}</td>
                                            <td className="px-4 py-4 text-sm sm:text-base">$ {item.price.toFixed(2)}</td>
                                            <td className="px-4 py-4 text-sm sm:text-base">
                                                $ {(item.qty * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-5">Order Details</h2>
                            <div className="flex flex-col md:flex-row justify-between flex-wrap p-8 bg-gray-600 gap-4">
                                <ul className="text-sm sm:text-lg w-full md:w-auto">
                                    <li>
                                        <span className="font-semibold mb-4">Items:</span> ${" "}
                                        {cart.itemsPrice}
                                    </li>
                                    <li>
                                        <span className="font-semibold mb-4">Shipping:</span> ${" "}
                                        {cart.shippingPrice}
                                    </li>
                                    <li>
                                        <span className="font-semibold mb-4">Tax:</span> ${" "}
                                        {cart.taxPrice}
                                    </li>
                                    <li>
                                        <span className="font-semibold mb-4">Total:</span> ${" "}
                                        {cart.totalPrice}
                                    </li>
                                </ul>

                                <div className="w-full md:w-auto">
                                    <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                                    <p>
                                        <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                                        {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                                        {cart.shippingAddress.country}
                                    </p>
                                </div>

                                <div className="w-full md:w-auto">
                                    <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                                disabled={cart.cartItems.length === 0 || isLoading}
                                onClick={placeOrderHandler}
                            >
                                {isLoading ? 'Processing...' : 'Place Order'}
                            </button>

                            {isLoading && <Loader />}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default PlaceOrder;