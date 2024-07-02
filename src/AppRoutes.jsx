import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Items from './components/Items';
import ReconfirmPage from './components/ReconfirmPage';
import AddInventory from './components/admin/AddInventory';
import ViewInventory from './components/admin/viewInventory/ViewInventory';
import EditInventory from './components/admin/editInventory/EditInventory';
import MyOrders from './components/admin/orders/MyOrders';
import Login from './components/login/Login';
import Home from './components/HomePage/Home';
import GetItemsByType from './components/GetItemsByType/getItemsByType';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getAllItems" element={<Items />} />
      <Route path="/getItemByType/:itemType" element={<GetItemsByType />} />
      <Route path="/reconfirm" element={<ReconfirmPage />} />
      <Route path="/addinventory" element={<AddInventory />} />
      <Route path="/viewinventory" element={<ViewInventory />} />
      <Route path="/editinventory" element={<EditInventory />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />

    </Routes>
  )
}

export default AppRoutes