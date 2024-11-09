import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

function Nav({ setSearch, addToCart }) {
  const [show, setshow] = useState(false);
  return (
    <div>
      <div className="nav">
        <div className="left-nav">
          <Link to="/">
            <h1>Bloom</h1>
          </Link>
          <ul>
            <Link to="/">
              <li> Home </li>
            </Link>
            <Link to="/products">
              <li> Products </li>
            </Link>
            <Link to="/about">
              <li> About us </li>
            </Link>
          </ul>
        </div>
        <div className="right-nav">
          <i
            class="fa-solid fa-magnifying-glass"
            onClick={() => setshow(!show)}
          ></i>
          {show ? (
            <Search setshow={setshow} show={show} setSearch={setSearch} />
          ) : null}
          <Link to="/cart">
            <i class="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
