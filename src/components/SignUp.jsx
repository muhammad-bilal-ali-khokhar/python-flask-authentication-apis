import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignUpSchema = Yup.object({
  name: Yup.string().min(2).max(10).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        console.log("values", values);
        axios
          .post("http://127.0.0.1:8000/signup", values)
          .then((response) => {
            console.log(response);
            navigate('/login')
          })
          .catch((error) => {
            console.log(error);
          });

        // Reset the form
        // action.resetForm();
      },
    });

  return (
    <div className='flex flex-column justify-content-center align-items-center p-d-flex p-flex-column p-jc-center p-ai-center h-screen formBgImage'>
      <div className='formBg justify-content-center align-items-center p-jc-center p-ai-center w-3 flex flex-column border-round-2xl px-5 py-5 absolute'>
        <h1 style={{ color: "whitesmoke" }}>Sign Up</h1>
        <form className={""} onSubmit={handleSubmit}>
          <label className='text-yellow-50 font-bold'>Full Name </label>
          <br />
          <input
            type='text'
            name='name'
            autoComplete='off'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? <div>{errors.name}</div> : <div></div>}
          <br />
          <label className='text-yellow-50 font-bold'>Email</label>
          <br />
          <input
            type='email'
            name='email'
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : (
            <div></div>
          )}
          <br />
          <label className='text-yellow-50 font-bold'>Password</label>
          <br />
          <input
            type='password'
            name='password'
            autoComplete='off'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : (
            <div></div>
          )}
          <br />
          <label className='text-yellow-50 font-bold'>Confirm Password</label>
          <br />

          <input
            type='password'
            name='confirm_password'
            autoComplete='off'
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_password && touched.confirm_password ? (
            <div>{errors.confirm_password}</div>
          ) : (
            <div></div>
          )}
          <br />
          <div className='flex justify-content-center align-items-center'>
            <button
              className='submitButton'
              type='submit'
              style={{ background: "#e50914", border: "1px solid #e50914" }}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
