/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import LoginPage from "pages/LoginPage.jsx";
import RegisterPage from "pages/RegisterPage.jsx";

var authRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    mini: "L",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    mini: "R",
    component: RegisterPage,
    layout: "/auth"
  }
];
export default authRoutes;
