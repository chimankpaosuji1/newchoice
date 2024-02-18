import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SellerCard = ({ data }) => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div>
      <div className="w-[200px] h-[200px] bg-white flex justify-center items-center rounded-[50%] shadow-sm cursor-pointer">
        <Link to={`/shop/preview/${data.shop._id}`}>
          <img src={`${data?.shop?.avatar?.url}`} alt="" className="w-[150px] h-[150px] rounded-[50%]" />
        </Link>
      </div>
      <div className="text-center mt-3 text-[22px] font-[500]">
        <span>{data.shop.name}</span>
      </div>
    </div>
  );
};

export default SellerCard;
