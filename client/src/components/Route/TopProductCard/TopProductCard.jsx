import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import Ratings from "../../Products/Ratings.jsx";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const TopProductCard = ({ data, isEvent }) => {
   const { wishlist } = useSelector((state) => state.wishlist);
   const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      if (wishlist && wishlist.find((i) => i._id === data._id)) {
        setClick(true);
      } else {
        setClick(false);
      }
    }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm relative cursor-pointer">
        <div className="flex items-center">
          <div className="w-[500px]">
            <Link
              to={`${
                isEvent === true
                  ? `/product/${data._id}?isEvent=true`
                  : `/product/${data._id}`
              }`}
            >
              <img
                src={`${data.images && data.images[0]?.url}`}
                alt=""
                className="w-[300px] h-[300px] p-5 rounded-[50px]"
              />
            </Link>
          </div>
          <div className="mr-16">
            <div className="flex text-[25px] mb-1">
              <Ratings rating={data?.ratings} className="" />
            </div>
            <Link
              to={`${
                isEvent === true
                  ? `/product/${data._id}?isEvent=true`
                  : `/product/${data._id}`
              }`}
            >
              <h4 className="pb-3 font-[500] text-[25px]">
                {data.name.length > 40
                  ? data.name.slice(0, 40) + "..."
                  : data.name}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <h5 className={`${styles.productDiscountPrice} text-[25px]`}>
                    {data.originalPrice === 0
                      ? data.originalPrice
                      : data.discountPrice}
                    $
                  </h5>
                  <h4 className={`${styles.price} text-[25px]`}>
                    {data.originalPrice ? data.originalPrice + " $" : null}
                  </h4>
                </div>
              </div>
              <div
                className={`${styles.button2} mt-6 h-11 flex items-center`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* side options */}
        <div className="absolute right-4 top-10">
          <div className="p-1 bg-[#e9eeea]">
            {click ? (
              <AiFillHeart
                size={30}
                className="cursor-pointer"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#000"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={30}
                className="cursor-pointer"
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#000"}
                title="Add to wishlist"
              />
            )}
          </div>
          <div className="mt-5 p-1 bg-[#e9eeea]">
            <AiOutlineEye
              size={30}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
              color="#000"
              title="Quick view"
            />
          </div>

          <div className="mt-5 p-1 bg-[#e9eeea]">
            <AiOutlineShoppingCart
              size={30}
              className="cursor-pointer "
              onClick={() => addToCartHandler(data._id)}
              color="#000"
              title="Add to cart"
            />
          </div>

          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default TopProductCard;
