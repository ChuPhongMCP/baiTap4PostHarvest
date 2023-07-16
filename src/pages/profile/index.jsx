import React, { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./profile.css";
import Loading from "components/loading";

function MyProfile(props) {
  const profile = useSelector((state) => state.profileReducer.profile); //lấy profile từ state.profileReducer đã thực hiện call api bằng Saga
  const isLoading = useSelector((state) => state.profileReducer.isLoading); //lấy trạng thái isLoading từ state.profileReducer

  const [token] = useState(localStorage.getItem("TOKEN")); //lấy token từ localStorage

  const isLogin = useCallback(() => { //render theo trạng thái token
    if (token) { //nếu có token trong localStorage
      if (isLoading) { //nếu chưa có phản hồi từ api
        return (
          <div className="container emp-profile notification">
            <Loading />
          </div>
        );
      }
      return ( //nếu đã có data từ api
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={profile.avt} alt="" />
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{profile.name}</h5>
                  <h6>{profile.website}</h6>
                  <p className="proile-rating">
                    RANKINGS : <span>8/10</span>
                  </p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Timeline
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  <Link to="/">Website Link</Link>
                  <br />
                  <Link to="/">Bootsnipp Profile</Link>
                  <br />
                  <Link to="/">Bootply Profile</Link>
                  <p>SKILLS</p>
                  <Link to="/">Web Designer</Link>
                  <br />
                  <Link to="/">Web Developer</Link>
                  <br />
                  <Link to="/">WordPress</Link>
                  <br />
                  <Link to="/">WooCommerce</Link>
                  <br />
                  <Link to="/">PHP, .Net</Link>
                  <br />
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>{profile.website}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
    return ( //nếu không có token trong localStorage
      <div className="container emp-profile notification">
        <h1>Please login to view your profile</h1>
      </div>
    );
  }, [isLoading, profile.avt, profile.email, profile.id, profile.name, profile.phone, profile.website, token]);

  return isLogin(); //gọi hàm isLogin() render theo trạng thái token
}

export default memo(MyProfile);
