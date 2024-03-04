import { Formik, Field, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import char1 from '../assets/char1.png'
import char2 from '../assets/char2.png'
import char3 from '../assets/char3.png'
import char4 from '../assets/char4.png'
import { AiFillHome } from "react-icons/ai";
const Swal = require('sweetalert2')

function Login() {

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogin = async (userDataLogin) => {
    try {
      await axios.post("http://localhost:8000/api/login", userDataLogin).then((response) => {
          document.cookie = `access_token=${response.data.token}; SameSite=None; Secure`
      })
      navigate('/dashboard')
    } catch (error) { 
      Swal.fire({
        title: 'Login Failed!',
        text: error.response.data,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh] gap-2 bg-primary-dark">
        <div className="absolute w-full h-full">
              <Link className="absolute top-0 left-0 m-4 text-4xl text-pink" to={"/"}><AiFillHome/></Link>
              <div className="absolute w-[14%] left-[55%] top-[8%]">
                <img className="w-full" src={char1} alt="char1"/>
              </div>
              <div className="absolute w-[14%] left-[57%] top-[55%]">
                <img className="w-full" src={char2} alt="char2"/>
              </div>
              <div className="absolute w-[14%] left-[28%] top-[55%]">
                <img className="w-full" src={char4} alt="char4"/>
              </div>
              <div className="absolute w-[16%] left-[27%] top-[10%] -rotate-12">
                <img className="w-full" src={char3} alt="char3"/>
              </div>
          </div>

        <div className="flex flex-col justify-center p-4 gap-4 py-8 px-12 bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-purple">

          <h1 className="text-center font-bold text-2xl text-pink">LOGIN</h1>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            {({ errors }) => (
              <Form className="flex flex-col gap-1 w-72">
                <div className="flex flex-col pb-5 relative">
                  <label
                    htmlFor="username"
                    className="font-semibold text-sm m-1 text-pink"
                  >
                    Username
                  </label>
                  <Field
                    className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2"
                    id="username"
                    name="username"
                  />
                  {errors.username && (
                    <p className="text-[10px] text-pink absolute mx-1 bottom-0">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="flex flex-col pb-5 relative">
                  <label
                    htmlFor="password"
                    className="font-semibold text-sm text-pink m-1"
                  >
                    Password
                  </label>
                  <Field
                    className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2"
                    id="password"
                    name="password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-[10px] text-pink font-semibold absolute mx-1 bottom-0">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex mt-2 justify-between py-4">
                  <button
                    className="py-2 px-6 rounded-sm font-semibold text-pink bg-purple"
                    type="submit"
                  >
                    Login
                  </button>
                  <Link
                    className="p-2 rounded-md px-4 underline text-pink"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
                 
    </>
  );
}

export default Login;
