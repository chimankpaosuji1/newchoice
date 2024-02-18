import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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
    <div
      className={"w-full bg-white rounded-lg shadow-sm relative cursor-pointer"}
    >
      <div className="flex items-center justify-center mt-20 mb-10">
        {" "}
        <CountDown data={data} />
      </div>
      <div className="flex items-center">
        <div className="mx-3">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <img
              src={`${data.images[0]?.url}`}
              alt=""
              className="w-[250px] h-[250px] p-5 rounded-[50px]"
            />
          </Link>
        </div>
        <div className="mr-5">
          <Link to={`/product/${data._id}?isEvent=true`}>
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
                </h5>
                <h4 className={`${styles.price} text-[25px]`}>$120</h4>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <Link to={`/product/${data._id}?isEvent=true`}>
                <div
                  className={`${styles.button2} mt-6 h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    See Details
                  </span>
                </div>
              </Link>
              <div
                className={`${styles.button2} mt-6 h-11 flex items-center`}
                onClick={() => addToCartHandler(data)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
