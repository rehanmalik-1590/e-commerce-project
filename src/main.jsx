import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Logout from './components/Logout.jsx';
import Profile from './pages/User/Profile.jsx';
import UserOrder from './pages/User/UserOrder.jsx';

// Admin Pages
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

// Products
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';

// Cart & Shop
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';

// Orders
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';

// Auth Route
import PrivateRoute from './components/PrivateRoute.jsx';

// PayPal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="logout" element={<Logout />} />
      <Route path="favorite" element={<Favorites />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop" element={<Shop />} />
      <Route path="user-orders" element={<UserOrder />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist/:pageNumber?" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
