import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { login, logout, onUserStateChange } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/">
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            Carts
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && <Link to="/products/new">New</Link>}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
