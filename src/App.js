import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './App.css';
import { LOCATIONS } from 'constants/index';
import { routers, unAuthRouter } from 'router/router';
import { actionGetMyProfile } from 'store/profile/action';
import { axiosAdmin } from 'helper'

function App() {
  const dispatch = useDispatch(); //khai báo sử dụng dispatch để đẩy dữ liệu lên store

  const token = localStorage.getItem('TOKEN'); //lấy token từ localStorage

  const navigate = useNavigate(); //khai báo sử dụng hàm chuyển trang

  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null && localStorage.getItem("REFRESH_TOKEN") !== null) {
      //nếu tồn tại token trên localStorage
      dispatch(actionGetMyProfile()); //đẩy action actionGetMyProfile lên store
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) { //nếu tồn tại token trên localStorage
      axiosAdmin.defaults.headers.Authorization = `Bearer ${token}`; //gán trạng thái đã xác nhận login lên header theo quy phạm từ BE
    } else { //nếu không tồn tại token trên localStorage
      navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
    }
  }, [navigate, token]);

  const renderRoutes = useCallback((routers, unAuthRouter) => { //hàm đệ quy map ra các router theo trạng thái đã và chưa đăng nhập tương ứng

    if (!token) { //router khi chưa đăng nhập
      return unAuthRouter.map((route, index) => {
        if (route.children && route.children.length > 0) {
          return (
            <Route path={route.path} element={route.element} key={index}>

              {renderRoutes(route.children)}

            </Route>
          );
        }

        if (route.isRoot) {
          return <Route index element={route.element} key={index} />
        }

        return <Route path={route.path} element={route.element} key={index} />;
      });
    }

    return routers.map((route, index) => { //router khi đã đăng nhập
      if (route.children && route.children.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>

            {renderRoutes(route.children)}

          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />
      }

      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, [token]);

  return (
    //truyền vào 2 router: routers khi đã đăng nhập và unAuthRouter khi chưa đăng nhập
    <Routes>

      {renderRoutes(routers, unAuthRouter)}

    </Routes>
  );
}

export default App;
