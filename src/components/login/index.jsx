import React, { memo, useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import Earth from "components/login/icons/earth";
import Email from "components/login/icons/email";
import Eye from "components/login/icons/eye";
import { axiosAdmin } from "helper";
import Eyeslash from "./icons/eyeslash";
import { LOCATIONS } from "constants/index";
import Loading from "components/loading";

function Login(props) {
  const navigate = useNavigate(); //khai báo biến navigate sử dụng lib chuyển hướng Navigate

  const [isHaveReponsive, setIsHaveReponsive] = useState(true); //state lưu trạng thái call api có phản hồi hay chưa

  const [isVisiblePwd, setIsVisiblePwd] = useState(false); //lưu trạng thái có ẩn mật khẩu nhập vào hay không

  const token = localStorage.getItem("TOKEN"); //get token từ localStorage

  const toggleVisiblePwd = useCallback(() => {
    setIsVisiblePwd((visible) => !visible); //chuyển đổi trạng thái ẩn và hiện mật khẩu
  }, []);

  useEffect(() => {
    if (token) {
      //nếu tồn tại token
      navigate(LOCATIONS.PRODUCTS); //chuyển hướng về trang products
      window.location.reload(); //reload lại trang để cập nhật trạng thái profile trên navBar
    }
  }, [navigate, token]);

  /* sử dụng Formik và Yup để validate tại FE */
  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .max(16, "Maximum 16 characters")
        .required("Required!"),
    }),

    onSubmit: (values) => {
      //sự kiện khi người dùng ấn Login
      const { email, password } = values; //lấy 2 biến email và password từ values gán vào email và password tương ứng

      const data = {
        //tạo object data gồm email và password ở trên
        email,
        password,
      };

      onSubmitAsync(data); //gọi hàm onSubmitAsync truyền vào param data
      setIsHaveReponsive(false); //set biến isHaveReponsive thành false để gọi màn hình loading
    },
  });

  const onClickButton = useCallback(
    (e) => {
      e.preventDefault(); //ngăn chặn hành vi mặc định của submit form

      validation.handleSubmit(); //gọi hàm handleSubmit trong Formik
    },
    [validation]
  );

  const isErrorInfo = (fieldName) => {
    //check có lỗi nhập liệu hay không theo fieldName truyền vào
    if (validation.errors[fieldName] && validation.touched[fieldName]) {
      return true;
    }
    return false;
  };

  const onSubmitAsync = async (data) => {
    //submit data truyền vào, tiến hành call api theo data
    const url = "/employees/login"; //dường dẫn api, phần tiền tố nằm trong file .env

    try {
      // Promise
      const response = await axiosAdmin.post(url, data); //post data lên api

      localStorage.setItem("TOKEN", response.data.token); //lưu token vào localStorage
      localStorage.setItem("REFRESH_TOKEN", response.data.refreshToken); //lưu refreshtoken vào localStorage

      setIsHaveReponsive(true); //set biến isHaveReponsive thành true để tắt màn hình loading

      navigate(LOCATIONS.PRODUCTS); //chuyển hướng sang trang products

      window.location.reload(); //reload lại trang để cập nhật trạng thái profile trên navBar
    } catch (err) {
      //nếu post lên api có lỗi
      console.error(err);
      console.log("Login thất bại");
      setIsHaveReponsive(true); //set biến isHaveReponsive thành true để tắt màn hình loading
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <>
      {token ? ( //nếu tồn tại token trên localStorage
        <Loading /> //đưa ra màn hình loading để giấu đi màn hình login (nâng cao trải nghiệm user)
      ) : (
        //nếu không tồn tại token trên localStorage thì return màn hình login như bình thường
        <div className={`container ${styles.cover}`}>
          {!isHaveReponsive && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingIcon}></div>
            </div>
          )}

          <div className={styles.coverForm}>
            <div className="row">
              <form className={`col-sm-12 col-md-6 ${styles.form}`}>
                <div className={`row ${styles.navbar}`}>
                  <div className={`col-7 ${styles.logo}`}>
                    <a className={styles.logoLink} href="http://">
                      <Earth /> Anywhere App
                    </a>
                  </div>

                  <div className={`col-2 ${styles.menu}`}>
                    <a className={styles.menuLink} href="http://">
                      Home
                    </a>
                  </div>

                  <div className={`col-3 ${styles.menu}`}>
                    <a className={styles.menuLink} href="http://">
                      Join
                    </a>
                  </div>
                </div>

                <div className={styles.start}>START FOR FREE</div>

                <div className={styles.login}>Log in</div>

                <div className={styles.member}>
                  Not A Member?{" "}
                  <a className={styles.create} href="http://">
                    Sign up
                  </a>
                </div>

                <div className={styles.coverInputGroup}>
                  <div
                    className={`mb-3 mt-3 form-floating ${styles.coverInput}`}
                  >
                    <input
                      type="text"
                      className={`form-control ${styles.Input} ${
                        isErrorInfo("email") && `is-invalid ${styles.invalid}`
                      }`}
                      id="email"
                      placeholder="Email:"
                      name="email"
                      autoComplete="off"
                      value={validation.values.email}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                    />

                    <label htmlFor="email">Email:</label>

                    <span
                      className={`input-group-text ${styles.iconInput} ${
                        isErrorInfo("email") && styles.invalidIcon
                      }`}
                    >
                      <Email />
                    </span>
                  </div>

                  {isErrorInfo("email") && (
                    <div className={styles.errors}>
                      {validation.errors.email}
                    </div>
                  )}

                  <div
                    className={`mb-3 mt-3 form-floating ${styles.coverInput}`}
                  >
                    <input
                      type={isVisiblePwd ? "text" : "password"}
                      className={`form-control ${
                        isErrorInfo("password") &&
                        `is-invalid ${styles.invalid}`
                      } ${styles.Input}`}
                      id="password"
                      placeholder="Password:"
                      name="password"
                      value={validation.values.password}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                    />

                    <label htmlFor="password">Password:</label>

                    <span
                      className={`input-group-text ${styles.isVisiblePwd} ${
                        isErrorInfo("password") && styles.invalidIcon
                      } ${styles.iconInput}`}
                      onClick={toggleVisiblePwd}
                    >
                      {isVisiblePwd ? <Eyeslash /> : <Eye />}
                    </span>
                  </div>

                  {isErrorInfo("password") && (
                    <div className={styles.errors}>
                      {validation.errors.password}
                    </div>
                  )}
                </div>

                <div className={styles.coverButton}>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.button}`}
                    onClick={onClickButton}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Login);
