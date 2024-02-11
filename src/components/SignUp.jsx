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
  name: Yup.string().min(2).max(27).required("Please enter your name"),
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
      },
    });

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fafafa'}}>
      <div style={{backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', width:'30%'}}>
        <h1 style={{textAlign: 'center', color: '#333333', marginBottom: '30px'}}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold'}}>Full Name</label>
            <input
              type='text'
              name='name'
              autoComplete='off'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box'}}
            />
            {errors.name && touched.name && <div style={{color: '#ff0000'}}>{errors.name}</div>}
          </div>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold'}}>Email</label>
            <input
              type='email'
              name='email'
              autoComplete='off'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box'}}
            />
            {errors.email && touched.email && <div style={{color: '#ff0000'}}>{errors.email}</div>}
          </div>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold'}}>Password</label>
            <input
              type='password'
              name='password'
              autoComplete='off'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box'}}
            />
            {errors.password && touched.password && <div style={{color: '#ff0000'}}>{errors.password}</div>}
          </div>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold'}}>Confirm Password</label>
            <input
              type='password'
              name='confirm_password'
              autoComplete='off'
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box'}}
            />
            {errors.confirm_password && touched.confirm_password && <div style={{color: '#ff0000'}}>{errors.confirm_password}</div>}
          </div>
          <div style={{textAlign: 'center'}}>
            <button
              type='submit'
              style={{backgroundColor: '#833AB4', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer',margin:'5px'}}>
              Sign Up
            </button>
            <button
              // onClick={navigate('/login')}
              style={{ backgroundColor: '#833AB4', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' , margin:'5px'}}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
