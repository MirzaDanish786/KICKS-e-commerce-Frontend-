import React from "react";
import Logo from "../../assets/images/FooterLogo.png";
import FooterLargeLogo from "../../assets/images/FooterLargeLogo.png";
import plusIcon from "../../assets/icons/plusIcon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as TiktokIcon } from "../../assets/icons/tiktok.svg";

import Button from "../reuseable/Button";
import InstagramLogo from "../../assets/icons/InstagramLogo";

const Footer = () => {
  return (
    <div>
      <div
        className="w-[92%] rounded-[48px]  mx-auto bg-[#4A69E2] 
      max-md:rounded-3xl"
      >
        {/* Upper div */}
        <div
          className="px-18 py-16 flex justify-between items-center
        max-lg:px-10 max-lg:py-12
        max-md:flex-col max-md:gap-8 max-md:p-4 max-md:items-start"
        >
          <div
            className="w-[50%] flex flex-col gap-4
          max-lg:w-[70%]
          max-md:w-full"
          >
            <div
              className="font-semibold text-5xl w-full text-white uppercase
            max-xl:text-4xl
            max-lg:text-3xl"
            >
              Join our KicksPlus Club & get 15% off
            </div>
            <div
              className="text-[#E7E7E3] font-semibold text-[20px]
            max-xl:text-lg"
            >
              Sign up for free! Join the community.
            </div>
            <div className="flex gap-1">
              <div className="w-[65%] max-md:w-full">
                <input
                  className="px-4 text-white py-3.5 border border-[#FFFFFF] outline-none rounded-lg w-full placeholder-gray-300
                  max-md:py-[8px]"
                  type="text"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Button className="h-full" text={"SUBMIT"} color="#232321" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className=" flex flex-col justify-end  p-4
           "
            >
              <div className="absolute right-0 top-0">
                <img src={plusIcon} alt="" />
              </div>
              <img
                className="w-[350px] object-contain  max-xl:w-[300px]
            max-lg:w-[250px] max-md:w-[191px]"
                src={Logo}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Lower div */}
        <div
          className="w-full bg-[#232321] p-10 rounded-[48px] pb-0 overflow-hidden
        max-md:rounded-3xl max-md:p-1"
        >
          <ul
            className="flex justify-between gap-3 flex-wrap
          max-md:mx-2 max-md:my-6
          max-sm:flex-col"
          >
            <li
              className="w-[30%] 
            max-md:w-[50%]
           "
            >
              <div
                className="text-[#FFA52F] font-semibold text-4xl
               max-sm:text-3xl"
              >
                About us
              </div>
              <p className="text-[#E7E7E3]">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </li>
            <li>
              <div
                className="text-[#FFA52F] mb-4 font-semibold text-2xl 
              max-sm:text-xl"
              >
                Categories
              </div>
              <ul className="text-[#E7E7E3] flex flex-col gap-2">
                <a href="#">
                  <li>Runners</li>
                </a>
                <a href="#">
                  <li>Sneakers</li>
                </a>
                <a href="#">
                  <li>Basketball</li>
                </a>
                <a href="#">
                  <li>Outdoor</li>
                </a>
                <a href="#">
                  <li>Golf</li>
                </a>
                <a href="#">
                  <li>Hiking</li>
                </a>
              </ul>
            </li>
            <li>
              <div
                className="text-[#FFA52F] mb-4 font-semibold text-2xl 
              max-sm:text-xl"
              >
                Company
              </div>
              <ul className="text-[#E7E7E3] flex flex-col gap-2">
                <a href="#">
                  <li>About</li>
                </a>
                <a href="#">
                  <li>Contact</li>
                </a>
                <a href="#">
                  <li>Blogs</li>
                </a>
              </ul>
            </li>
            <li>
              <div
                className="text-[#FFA52F] mb-4 font-semibold text-2xl 
              max-sm:text-xl"
              >
                Follow us
              </div>
              <ul className="text-[#E7E7E3] flex gap-6 ">
                <a href="https://www.facebook.com" target="_blank">
                  <li>
                    <FacebookIcon className=" text-white hover:text-[#1877F2] transition-colors duration-300" />
                  </li>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-hover"
                >
                  <li>
                    <InstagramLogo  />
                  </li>
                </a>
                <a href="https://www.twitter.com" target="_blank">
                  <li>
                    <TwitterIcon />
                  </li>
                </a>
                <a href="https://www.tiktok.com" target="_blank">
                  <li>
                    <TiktokIcon />
                  </li>
                </a>
              </ul>
            </li>
          </ul>

          {/* Lower logo image */}
          <div className="mt-[97px] mb-[-4px]">
            <img className="w-full" src={FooterLargeLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
