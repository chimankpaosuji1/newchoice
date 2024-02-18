import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
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
      <div className="w-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
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
            className="w-full h-[300px] p-10 rounded-[50px]"
          />
        </Link>
        <div className="px-5">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className={`${styles.shop_name} text-[20px]`}>
              {data.shop.name}
            </h5>
          </Link>
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <h4 className="pb-3 font-[500] text-[20px]">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>

            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice} text-[20px]`}>
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                  $
                </h5>
                <h4 className={`${styles.price} text-[20px]`}>
                  {data.originalPrice ? data.originalPrice + " $" : null}
                </h4>
              </div>
              <span className="font-[600]  text-[20px] text-[#68d284]">
                {data?.sold_out} sold
              </span>
            </div>
          </Link>
        </div>

        {/* side options */}
        <div className="absolute right-2 top-10">
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

export default ProductCard;

// w-[190px] h-[170px] @apply shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border rounded-2xl border-solid border-[rgba(255,255,255,0.3)] background: rgba(255, 255, 255, 0.2)  -webkit-backdrop-filter: blur(5px)
