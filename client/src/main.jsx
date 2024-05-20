import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/protectedRoute.jsx";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/customer/home.jsx";
import Products from "./pages/customer/products.jsx";
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx";
import CustomerProfile from "./pages/customer/profile.jsx";
import AccountDetails from "./components/profile/accountdetails.jsx";
import Address from "./components/profile/address.jsx";
import MyOrders from "./components/profile/myorders.jsx";
import LogOut from "./components/profile/logout.jsx";
import LostPassword from "./components/profile/lostpassword.jsx";
import BillingAddress from "./components/profile/billingaddress.jsx";
import ShippingAddress from "./components/profile/shippingaddress.jsx";
import { Cart } from "./components/cart.jsx";
import { ShoppingCart } from "./components/shoppingcart.jsx";
import { Checkout } from "./components/checkout.jsx";
import OrderSuccess from "./components/ordersuccess.jsx";
import AdminReports from "./pages/admin/adminreports.jsx";
import RawInventory from "./pages/admin/rawInventory.jsx";
import AddRawInventory from "./pages/admin/addRawInventory.jsx";
import ProInventory from "./pages/proinventory.jsx";
import AddProInventory from "./pages/addproinventory.jsx";
import StaffReports from "./pages/staff/staffreports.jsx";
import ProInventoryStaff from "./pages/staff/staffproinventory.jsx";
import AddProInventoryStaff from "./pages/staff/addproinventorystaff.jsx";
import RawStockUsage from "./pages/rawStockUsage.jsx";
import AddRawStockUsage from "./pages/addRawStockUsage.jsx";
import RawStockUsageStaff from "./pages/staff/rawStockUsageStaff.jsx";
import AddRawStockUsageStaff from "./pages/staff/addRawStockUsageStaff.jsx";
import InventoryLogs from "./pages/admin/inventoryLogs.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products />},
  { path: "/bakery/:category", element: <Products /> },
  { path: "/bakery/:category/:subCategory", element: <Products /> },
  { path: "/adminDashboard", element:<ProtectedRoute component={AdminReports} allowedRoles={['Admin']} />},
  { path: "/inventoryLogs", element:<ProtectedRoute component={InventoryLogs} allowedRoles={['Admin']} />},
  { path: "/staffDashboard", element: <ProtectedRoute component={StaffReports} allowedRoles={['Staff', 'Admin']} />},
  { path: "/rawInventory", element: <ProtectedRoute component={RawInventory} allowedRoles={['Admin']} />},
  { path: "/addRawInventory", element: <ProtectedRoute component={AddRawInventory} allowedRoles={['Admin']} />},
  { path: "/editRawInventory/:id", element: <ProtectedRoute component={AddRawInventory} allowedRoles={['Admin']} />},
  { path: "/rawStockUsage", element: <ProtectedRoute component={RawStockUsage} allowedRoles={['Admin']} />},
  { path: "/rawStockUsageStaff", element: <ProtectedRoute component={RawStockUsageStaff} allowedRoles={['Staff', 'Admin']} />},
  { path: "/addRawStockUsage", element: <ProtectedRoute component={AddRawStockUsage} allowedRoles={['Admin']} />},
  { path: "/editRawStockUsage/:id", element: <ProtectedRoute component={AddRawStockUsage} allowedRoles={['Admin']}/>},
  { path: "/addRawStockUsageStaff", element: <ProtectedRoute component={AddRawStockUsageStaff} allowedRoles={['Staff', 'Admin']} />},
  { path: "/editRawStockUsageStaff/:id", element: <ProtectedRoute component={AddRawStockUsageStaff} allowedRoles={['Staff', 'Admin']} />},
  { path: "/proInventory", element: <ProtectedRoute component={ProInventory} allowedRoles={['Admin']}/>},
  { path: "/addProInventory", element: <ProtectedRoute component={AddProInventory} allowedRoles={['Admin']} />},
  { path: "/editProInventory/:id", element: <ProtectedRoute component={AddProInventory} allowedRoles={['Admin']} />},
  { path: "/proInventoryStaff", element: <ProtectedRoute component={ProInventoryStaff} allowedRoles={['Staff', 'Admin']}/>},
  { path: "/addProInventoryStaff", element: <ProtectedRoute component={AddProInventoryStaff} allowedRoles={['Staff', 'Admin']} />},
  { path: "/editProInventoryStaff/:id", element: <ProtectedRoute component={AddProInventoryStaff} allowedRoles={['Staff', 'Admin']} />},
  { path: "/signUp", element: <SignUp /> },
  { path: "/logIn", element: <LogIn /> },
  { path: "/cart", element: <ProtectedRoute component={ Cart} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/shoppingCart", element: <ProtectedRoute component={ShoppingCart} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/checkout", element: <ProtectedRoute component={Checkout} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/orderSuccess", element: <ProtectedRoute component={OrderSuccess} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser", element: <ProtectedRoute component={CustomerProfile} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/AccountDetails", element: <ProtectedRoute component={AccountDetails} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/Addresses", element: <ProtectedRoute component={Address} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/Addresses/BillingAddress", element: <ProtectedRoute component={BillingAddress} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/Addresses/ShippingAddress", element: <ProtectedRoute component={ShippingAddress } allowedRoles={['Admin', 'Staff', 'Customer']}/> },
  { path: "/profileUser/MyOrders", element: <ProtectedRoute component={MyOrders} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/LogOut", element: <ProtectedRoute component={LogOut} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "/profileUser/LostPassword", element: <ProtectedRoute component={LostPassword} allowedRoles={['Admin', 'Staff', 'Customer']} /> },
  { path: "*", element: <h3>Error 404: Page Not Available</h3> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
