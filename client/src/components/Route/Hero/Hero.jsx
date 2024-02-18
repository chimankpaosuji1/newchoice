import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import banner1 from "../../../Assests/img/samsungbanner.png";
import banner2 from "../../../Assests/img/applebanner.png";
import banner3 from "../../../Assests/img/xboxbanner.png";

const Hero = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = productData && productData.sort;
  }, []);
  return (
    <div className={`${styles.section} m-10`}>
      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-3 xl:gap-[35px]">
        <div
          className={`relative min-h-[20vh] 800px:min-h-[20vh] bg-cover w-full bg-no-repeat col-span-2  ${styles.noramlFlex} row-span-2 cursor-pointer`}
        >
          <img src={banner1} alt="" className="w-full h-[90%]" />
        </div>

        <div
          className={`relative min-h-[20vh] 800px:min-h-[20vh] bg-cover w-full bg-no-repeat ${styles.noramlFlex} cursor-pointer`}
        >
          <img src={banner2} alt="" className="w-full h-[80%]" />
        </div>
        <div
          className={`relative min-h-[20vh] 800px:min-h-[20vh] bg-cover w-full bg-no-repeat ${styles.noramlFlex} cursor-pointer`}
          style={{
            backgroundImage:
              "url(https://shopo.quomodothemes.website/assets/images/banner-3.png)",
          }}
        >
          <img src={banner3} alt="" className="w-full h-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
