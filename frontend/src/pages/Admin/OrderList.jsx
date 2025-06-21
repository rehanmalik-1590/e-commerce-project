import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "/assets/uploads/";

  const getImagePath = (image) => {
    if (!image) return `${imageBaseUrl}default-product.jpg`;
    if (image.startsWith("http")) return image;
    return `${imageBaseUrl}${image}`;
  };

  const generateDummyOrders = () => {
    const productImages = [
      "product-5.jpg",
      "product-7.jpg",
      "product-11.jpg",
      "product-20.jpg",
      "product-26.jpg",
      "product-32.jpg",
      "product-35.jpg",
      "product-38.jpg",
      "product-29.jpg",
      "product-36.jpg"
    ];

    const productNames = [
      "Wireless Headphones Pro",
      "Smart Watch Series 5",
      "Bluetooth Speaker X",
      "Fitness Tracker Elite",
      "Gaming Mouse RGB",
      "Mechanical Keyboard",
      "4K Monitor Stand",
      "USB-C 8-in-1 Hub",
      "1TB External SSD",
      "Noise Cancelling Earbuds"
    ];

    return productImages.map((image, i) => {
      const price = Math.round((50 + Math.random() * 450) * 100) / 100;
      const quantity = Math.floor(Math.random() * 3) + 1;
      const subtotal = price * quantity;
      const tax = (subtotal * 0.1).toFixed(2);
      const shipping = (subtotal > 200 ? 0 : 15).toFixed(2);
      const total = (Number(subtotal) + Number(tax) + Number(shipping)).toFixed(2);

      return {
        _id: `order_${i + 1}`,
        user: {
          _id: `user_${i + 1}`,
          username: `customer${i + 1}`,
          email: `customer${i + 1}@example.com`
        },
        orderItems: [
          {
            _id: `prod_${i + 1}`,
            name: productNames[i],
            image: image,
            price: price,
            quantity: quantity
          }
        ],
        shippingAddress: {
          address: `${i + 100} Main St`,
          city: "New York",
          postalCode: "10001",
          country: "USA"
        },
        paymentMethod: "Credit Card",
        paymentResult: {
          id: `pay_${i + 1}`,
          status: "completed",
          update_time: new Date().toISOString(),
          email_address: `customer${i + 1}@example.com`
        },
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
        isPaid: Math.random() > 0.3,
        paidAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)).toISOString(),
        isDelivered: Math.random() > 0.5,
        deliveredAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 3)).toISOString(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString()
      };
    });
  };

  const orders = generateDummyOrders();
  const isLoading = false;
  const error = null;

  return (
    <div className="container w-[90%] ml-[6rem]">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      <AdminMenu />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-100">Items</th>
                <th className="px-6 py-3 text-left text-gray-100">ID</th>
                <th className="px-12 py-3 text-left text-gray-100">User</th>
                <th className="px-12 py-3 text-left text-gray-100">Date</th>
                <th className="px-12 py-3 text-left text-gray-100">Total</th>
                <th className="px-6 py-3 text-left text-gray-100">Paid</th>
                <th className="px-6 py-3 text-left text-gray-100">Delivered</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody className="border-t border-gray-300">
              {orders.map((order) => {
                const product = order.orderItems[0];

                return (
                  <tr key={order._id}>
                    <td className="px-4 py-4">
                      <img
                        src={getImagePath(product.image)}
                        alt={product.name}
                        className="h-auto w-[10rem] sm:w-[8rem] md:w-[10rem] lg:w-[10rem] rounded-lg object-cover shadow-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${imageBaseUrl}default-product.jpg`;
                        }}
                      />
                    </td>

                    <td className="px-6 py-3">{order._id}</td>
                    <td className="px-6 py-3">{order.user ? order.user.username : "N/A"}</td>
                    <td className="px-6 py-3">
                      {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                    </td>
                    <td className="px-6 py-3">$ {order.totalPrice}</td>

                    <td className="px-6 py-3">
                      {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-3">
                      {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-3">
                      <button className="bg-blue-400 text-black py-2 px-3 rounded">
                        More Options
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
