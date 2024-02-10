import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const SignUpSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        console.log("values", values);
        axios
          .post("http://127.0.0.1:8000/signin", values)
          .then((response) => {
            if(response){
              console.log({response})
              navigate(`/home/${response?.data?.id}`)
            }
            
          })
          .catch((error) => {
            console.log(error);
          });

        // Reset the form
        action.resetForm();
      },
    });

  return (
    <div className='flex flex-column justify-content-center align-items-center p-d-flex p-flex-column p-jc-center p-ai-center h-screen formBgImage'>
      <div className='formBg justify-content-center align-items-center p-jc-center p-ai-center w-3 flex flex-column border-round-2xl px-5 py-5 absolute'>
        <h1 style={{ color: "whitesmoke" }}>Sign In</h1>
        <form className={""} onSubmit={handleSubmit}>
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
          <div className='flex justify-content-center align-items-center'>
            <button
              className='submitButton'
              type='submit'
              style={{ background: "#e50914", border: "1px solid #e50914" }}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
