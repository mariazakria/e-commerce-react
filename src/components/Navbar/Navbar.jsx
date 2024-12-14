import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { userContextProvider } from '../../Context/UserContextProvider';
import { cartUserProvuder } from '../../Context/CartProvider';
export default function Navbar() {
  const { token, settoken } = useContext(userContextProvider);
  const [navIsOpen, setNavIsOpen] = useState(false); // for control, the navbar is open or not
  const [profileOpen, setProfileOpen] = useState(false); // for control, the Profile is open or not
  // show cart empty or not 
  const { numOfCartItems, displayAllCart } = useContext(cartUserProvuder);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('token');
    settoken(null);
    navigate('/Login');
  }
  // for making sure the cart always displays with the updated number when I go to any page
  useEffect(() => {
    displayAllCart();
  }, []); // Ensure this effect is triggered when displayAllCart changes
  return (
    <>
      <div className="bg-textColor w-full overflow-hidden py-1 text-center text-white" > <swiper-container slides-per-view="1"
        speed="500"
        loop="true"
        autoplay="true"
        autoplay-delay="3000" // الوقت بين التبديلات)
        autoplay-disable-on-interaction="false" // stop action when I hover on slider 
        events-prefix="swiper-"
        scrollbar="true">
        <swiper-slide> <div className="flex justify-center items-center space-x-2 w-full" >  <i className="fa-solid fa-gift" />
          <p className="cursor-pointer" > DOWNLOAD APP - %10 OFF YOUR FIRST ORDER | CODE: HEY10 </p> </div>
        </swiper-slide> <swiper-slide> <div className="flex justify-center items-center space-x-2 w-full" >
          <i className="fa-solid fa-gift" /> <p className="cursor-pointer" > DOWNLOAD APP - %10 OFF YOUR FIRST ORDER | CODE: HEY10 </p>
        </div> </swiper-slide> </swiper-container> </div>
      <nav className="bg-gray-200 shadow-lg w-full sticky top-0 z-50" > <div className={`container mx-auto flex items-center py-4 ${token ? "justify-between" : "justify-center"}          `
      }>
        <div className={`flex items-center space-x-4 w-[79%] ${token ? "" : "justify-center"} `}>
          <div className="text-secondColor  font-bold group text-lg cursor-pointer flex items-center lg:me-10 md:me-0" >
            <svg width={50} height={31} viewBox="7 0 1 31" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M8.12346 24.8618C9.5969 24.8618 10.7914 23.6674 10.7914 22.194C10.7914 20.7205 9.5969 19.526 8.12346 19.526C6.65002 19.526 5.45557 20.7205 5.45557 22.194C5.45557 23.6674 6.65002 24.8618 8.12346 24.8618Z" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10}
              strokeLinecap="round" /> <path d="M6.97607 9.18945H23.1146" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10}
                strokeLinecap="round" /> <path d="M8.38892 12.4171H22.4092" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M7.66113 19.525H18.1138C19.2586 19.525 20.2784 18.7977 20.6505 17.7144L24.9585 5.1809C25.3307 4.09761 26.3495 3.37036 27.4953 3.37036H30.6292" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M8.12359 22.5791C8.33639 22.5791 8.5089 22.4066 8.5089 22.1939C8.5089 21.981 8.33639 21.8086 8.12359 21.8086C7.91079 21.8086 7.73828 21.981 7.73828 22.1939C7.73828 22.4066 7.91079 22.5791 8.12359 22.5791Z" stroke="#FF6B6C" strokeWidth="1.06897" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M17.8222 24.8618C19.2956 24.8618 20.49 23.6674 20.49 22.194C20.49 20.7205 19.2956 19.526 17.8222 19.526C16.3487 19.526 15.1543 20.7205 15.1543 22.194C15.1543 23.6674 16.3487 24.8618 17.8222 24.8618Z" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M17.8223 22.5791C18.035 22.5791 18.2076 22.4066 18.2076 22.1938C18.2076 21.981 18.035 21.8085 17.8223 21.8085C17.6095 21.8085 17.437 21.981 17.437 22.1938C17.437 22.4066 17.6095 22.5791 17.8223 22.5791Z" stroke="#FF6B6C" strokeWidth="1.06897" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M21.1874 16.152H7.14791C6.67788 16.152 6.26535 15.8261 6.13624 15.3519L3.75481 6.62879C3.63578 6.19381 3.94745 5.75989 4.37916 5.75989H22.3776" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10} strokeLinecap="round" /> <path d="M1 26.527C1 26.527 11.26 23.0552 25.1058 26.527" stroke="#FF6B6C" strokeWidth="1.28276" strokeMiterlimit={10} strokeLinecap="round" />
            </svg> <Link to={"/"}>Shopcart</Link >
          </div>
          {token && (<ul className="hidden md:flex space-x-4 text-textColor font-bold" > <li> <NavLink to="" className='hover:text-secondColor duration-100 transition-colors' >Home</NavLink> </li> <li> <NavLink to="Brands" className='hover:text-secondColor duration-100 transition-colors' >Brands</NavLink> </li> <li> <NavLink to="AllProducts" className="hover:text-secondColor duration-100 transition-colors" > Products </NavLink> </li> </ul>)
          }
        </div> <div className="flex items-center space-x-4" > {
          token ? (<> <div className="relative group" onMouseOver={() => setProfileOpen(true)}
            // 
            onMouseLeave={() => setProfileOpen(false)}
          // hover display when I leave my mouse
          > <i className="fa-solid fa-user self-center cursor-pointer" onClick={
            () => setProfileOpen(!profileOpen)}
          // display when I put mouse on button
          >
            </i>
            {profileOpen && (
              <ul className="absolute right-1/4 top-[60%] bg-white shadow-lg border rounded-lg mt-2 w-48 text-textColor">
                <li className="px-4 py-2 border-b-secondColor border text-center hover:bg-gray-100 cursor-pointer hover:text-secondColor duration-100 transition-colors" onClick={() => {
                  setProfileOpen(false)
                  handleLogout()
                }
                } > <i className="fa-solid fa-right-from-bracket" ></i> Logout </li>
                <li className=" hover:bg-gray-100 cursor-pointer py-2 hover:text-secondColor duration-100 transition-colors" >
                  <Link to="/Allorders" className='px-12 w-full py-2'> <i className="fa-solid me-2  cursor-pointer fa-bag-shopping" ></i>All Orders</Link>
                </li>
              </ul>)
            }

          </div>
            <Link to={"/wishlist"} className="md:flex space-x-3 cursor-pointer text-textColor" > <i className="fa-regular fa-heart self-center text-secondColor " ></i> </Link>
            <Link to={"/Cart"} className="md:flex  text-textColor cursor-pointer hover:text-secondColor duration-100 transition-color relative" > <i className="fa-solid fa-cart-shopping cursor-pointer self-center" ></i> <p className='hidden md:block' >My Cart</p> <span className='bg-red-500 text-white size-4 flex justify-center items-center text-[14px] absolute rounded-full text-center bottom-[90%]  start-0' > {
              numOfCartItems === 0 ? <i className="fa-solid fa-spinner fa-spin text-sm " ></i> : numOfCartItems
            }

            </span> </Link> </>) : (""
          )
        }

          {
            token ? (<Button onClick={
              () => setNavIsOpen(!navIsOpen)
            }

              className="text-textColor text-3xl md:hidden"

            > <i className={
              navIsOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
            }

            ></i> </Button>) : ""
          }

        </div> </div> {
          navIsOpen && (<div className="md:hidden bg-gray-100" > <ul className="flex flex-col items-center space-y-3 py-4 text-textColor font-bold" > {
            token ? (<> <li> <Link to={
              "/"
            }

              className='hover:text-secondColor duration-100 transition-colors ' onClick={
                () => setNavIsOpen(false)
              }

            > Home </Link> </li> <li> <Link to={
              "/Cart"
            }

              className='hover:text-secondColor duration-100 transition-colors ' onClick={
                () => setNavIsOpen(false)
              }

            > Cart </Link> </li> <li> <Link to={
              "/AllProducts"
            }

              className='hover:text-secondColor duration-100 transition-colors ' onClick={
                () => setNavIsOpen(false)
              }

            > Products </Link> </li> <li> <Link to={
              "/Brands"
            }

              className='hover:text-secondColor duration-100 transition-colors ' onClick={
                () => setNavIsOpen(false)
              }

            > Brands </Link> </li> </>) : (""
            )
          }

          </ul> </div>)
        }

      </nav> </>);
}