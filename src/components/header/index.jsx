import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LOCATIONS } from "constants/index";

import { routers } from "router/router";
import Loading from "components/loading";

function Header(props) {
  const profile = useSelector((state) => state.profileReducer.profile); // truyền profile từ state.profileReducer
  const isLoading = useSelector((state) => state.profileReducer.isLoading); // truyền isLoading từ state.profileReducer

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("TOKEN")); //state token gán giá trị ban đầu bằng token lấy từ localStorage

  const logoutFunction = useCallback(() => {
    //sự kiện logout
    localStorage.removeItem("TOKEN"); //xóa token từ localStorage
    localStorage.removeItem("REFRESH_TOKEN"); //xóa refreshtoken từ localStorage
    setToken(localStorage.getItem("TOKEN")); //setToken = null

    navigate(LOCATIONS.LOGIN); //chuyển hướng sang trang login
    window.location.reload(); //reload lại trang
  }, [navigate]);

  const isLogin = useCallback(() => {
    //xác định thành phần sẽ render theo biến trạng thái token tương ứng
    if (token) {
      if (isLoading) {
        return (
          <div className="container emp-profile notification">
            <Loading />
          </div>
        );
      }
      return (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              width={50}
              height={50}
              style={{ borderRadius: "100%" }}
              src={profile.avt}
              alt=""
            />{" "}
            {profile.name}
          </Link>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to="Profile">
                My Profile
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" onClick={logoutFunction}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    }
    return (
      <Link className="nav-link active" aria-current="page" to="form">
        Login
      </Link>
    );
  }, [isLoading, logoutFunction, profile.avt, profile.name, token]);

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-0 shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to={LOCATIONS.PRODUCTS}>
          <i className="fa-solid fa-shop me-2" /> <strong>ONLINE SHOP</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto ">
            {routers.map((item) => {
              //map các li theo file router
              if (item.children?.length) {
                return (
                  <li className="nav-item dropdown" key={item.name}>
                    <Link
                      className="nav-link dropdown-toggle"
                      key={item.name}
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                      key={item.path}
                    >
                      {item.children.map((child) => {
                        if (child.name) {
                          if (child.isRoot) {
                            return (
                              <li key={child.name}>
                                <Link className="dropdown-item" to="/">
                                  {child.name}
                                </Link>
                              </li>
                            );
                          }
                          return (
                            <li key={child.name}>
                              <Link className="dropdown-item" to={child.path}>
                                {child.name}
                              </Link>
                            </li>
                          );
                        }

                        return null;
                      })}
                    </ul>
                  </li>
                );
              } else if (item.name) {
                return (
                  <li className="nav-item" key={item.name}>
                    <Link
                      className="nav-link active"
                      key={item.name}
                      aria-current="page"
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>

          <ul className="navbar-nav ms-auto ">{isLogin()}</ul>
        </div>
      </div>
    </nav>
  );
}

export default memo(Header);
