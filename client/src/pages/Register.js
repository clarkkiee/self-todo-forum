import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as yup from "yup"
import axios from "axios"
import char1 from '../assets/char1.png'
import char2 from '../assets/char2.png'
import char3 from '../assets/char3.png'
import char4 from '../assets/char4.png'
import { AiFillHome } from "react-icons/ai";

function Register () {

    const handleRegister = async (userData) => {
      try {
        const response = await axios.post('//localhost:8000/api/register', userData)
        alert(response.data.message)
      } catch (error) {
        console.error(error.message)
      }
    }

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const signupSchema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required('Required'),
        fullname: yup.string().required('Required'),
        username: yup.string().required('Required'),
        password: yup.string().matches(passwordRules, {message: "Please create a strong password"}).required('Required'),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password not match").required('Required')
    })

  return (
    <>
      <div className="flex flex-col justify-center bg-primary-dark items-center h-[100vh] gap-2">
        <div className="absolute w-full h-full">
            <Link className="absolute top-0 left-0 m-4 text-4xl text-pink" to={"/"}><AiFillHome/></Link>
            <div className="absolute w-[18%] left-[56%]">
              <img className="w-full" src={char1} alt="char1"/>
            </div>
            <div className="absolute w-[18%] left-[57%] top-[60%]">
              <img className="w-full" src={char2} alt="char2"/>
            </div>
            <div className="absolute w-[18%] left-[24%] top-[55%]">
              <img className="w-full" src={char4} alt="char4"/>
            </div>
            <div className="absolute w-[18%] left-[25%] top-[14%] -rotate-12">
              <img className="w-full" src={char3} alt="char3"/>
            </div>
        </div>
        <div className="flex flex-col justify-center p-4 gap-4 px-12 bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-purple">
        <h1 className="text-center font-bold text-2xl text-pink">SIGN UP</h1>
          <Formik
            initialValues={{
              email: "",
              fullname: "",
              username: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={signupSchema}
            onSubmit={async (values, {resetForm}) => {
                handleRegister(values)
                resetForm()
            }}
          >

            {({errors}) => (

                <Form className="flex flex-col gap-1 w-72">
                    
                    <div className="flex flex-col pb-5 relative">
                        <label htmlFor="email" className="font-semibold text-sm text-pink m-1">Email</label>
                          <Field
                              id="email"
                              name="email"
                              placeholder="example@example.com"
                              type="email"
                              className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2"
                              />
                        {errors.email && (<p className="text-[10px] text-pink font-semibold absolute mx-1 bottom-0">{errors.email}</p>)}
                    </div>

                    <div className="flex flex-col pb-5 relative">
                      <label htmlFor="fullname" className="font-semibold text-sm text-pink m-1">Full Name</label>
                      <Field className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2" id="fullname" name="fullname" placeholder="John Doe" />
                      {errors.fullname && (<p className="text-[10px] text-pink  font-semibold absolute mx-1 bottom-0">{errors.fullname}</p>)}
                    </div>

                    <div className="flex flex-col pb-5 relative">
                      <label htmlFor="username" className="font-semibold text-sm m-1 text-pink">Username</label>
                      <Field className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2" id="username" name="username" placeholder="Doe" />
                      {errors.username && (<p className="text-[10px] text-pink absolute mx-1 bottom-0">{errors.username}</p>)}
                    </div>

                    <div className="flex flex-col pb-5 relative">
                      <label htmlFor="password" className="font-semibold text-sm text-pink m-1">Password</label>
                      <Field className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2" id="password" name="password" type="password" />
                      {errors.password && (<p className="text-[10px] text-pink font-semibold absolute mx-1 bottom-0">{errors.password}</p>)}
                    </div>

                    <div className="flex flex-col pb-5 relative">
                      <label htmlFor="confirmPassword" className="font-semibold text-sm text-pink m-1">Confirm Password</label>
                      <Field className="text-sm text-pink placeholder-purple-100 rounded-full py-2 px-4 outline-none bg-clip-text border-purple border-2" id="confirmPassword" name="confirmPassword" type="password" />
                      {errors.confirmPassword && (<p className="text-[10px] text-pink font-semibold absolute mx-1 bottom-0">{errors.confirmPassword}</p>)}
                    </div>

                    <div className="flex mt-2 justify-between py-4">
                      <button className="py-2 px-6 rounded-sm font-semibold text-pink bg-purple" type="submit">Submit</button>
                      <Link
                        className="p-2 rounded-md px-4 underline text-pink"
                        to={"/login"}
                      >
                        Login
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

export default Register;
