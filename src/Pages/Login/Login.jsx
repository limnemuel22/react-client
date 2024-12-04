import React, { useContext } from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../Api/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.css"; // Import custom CSS for modern styling

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values); // Call the login API
        const { accessToken, user } = response.data;

        // Save the token to local storage or context
        localStorage.setItem("accessToken", accessToken);

        // Update the AuthContext
        setAuth({ user, isAuthenticated: true });

        // Redirect to the home page
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid username or password");
      }
    },
  });
  return (
    <div className="container-fluid background-container">
      <div className="container col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3">
        <div className="card">
          <div className="card-body">
            <form>
              <div class="mb-3">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="username"
                  touched={formik.touched.username}
                  errors={formik.errors.username}
                />
              </div>
              <div class="mb-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  touched={formik.touched.password}
                  errors={formik.errors.password}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
              <div className="login-footer text-center">
                <a href="/forgot-password" className="login-link">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // to be deleted
    // <div className="container background-container">
    //   <div className="login-container">
    //     <div className="login-card">
    //       <h1 className="login-title">Tasks</h1>
    //       <form onSubmit={formik.handleSubmit}>
    //         <Input
    //           label="Username"
    //           type="text"
    //           placeholder="Enter your username"
    //           value={formik.values.username}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           name="username"
    //           touched={formik.touched.username}
    //           errors={formik.errors.username}
    //         />

    //         <Input
    //           label="Password"
    //           type="password"
    //           placeholder="Enter your password"
    //           value={formik.values.password}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           name="password"
    //           touched={formik.touched.password}
    //           errors={formik.errors.password}
    //         />

    //         {/* Submit Button */}
    //         <Button variant="primary" type="submit">
    //           Login
    //         </Button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
