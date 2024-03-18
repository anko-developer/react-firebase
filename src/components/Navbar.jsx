import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange(user => {
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to='/'>
        <FiShoppingBag />
        <h1>Shop</h1>
      </Link>
      <nav>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>New</Link>
        {user && <User user={user} />}
        {!user && <button onClick={login}>Login!</button>}
        {user && <button onClick={logout}>Logout!</button>}
      </nav>
    </header>
  );
}

