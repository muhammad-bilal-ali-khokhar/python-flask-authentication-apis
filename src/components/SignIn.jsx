import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const SignInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values, action) => {
        console.log("values", values);
        axios
          .post("http://127.0.0.1:8000/signin", values)
          .then((response) => {
            if (response?.data?.id) {
              console.log({ response });
              sessionStorage.setItem('client', JSON.stringify(response.data));
              navigate(`/home`);
            }else{
              setErrorMessage('Email or passwor is worng')
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fafafa' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', width:'30%'}}>
        <h1 style={{ textAlign: 'center', color: '#333333', marginBottom: '30px' }}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold' }}>Email</label>
            <input
              type='email'
              name='email'
              autoComplete='off'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box' }}
            />
            {errors.email && touched.email && <div style={{ color: '#ff0000' }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333333', fontWeight: 'bold' }}>Password</label>
            <input
              type='password'
              name='password'
              autoComplete='off'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #e0e0e0', boxSizing: 'border-box' }}
            />
            {errors.password && touched.password && <div style={{ color: '#ff0000' }}>{errors.password}</div>}
          </div>
          {errorMessage && (
          <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMessage}</p>
        )}
          <div style={{ textAlign: 'center' }}>
            <button
              type='submit'
              style={{ backgroundColor: '#833AB4', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' ,margin:'5px'}}>
              Sign In
            </button>
            <button
              // onClick={navigate('/')}
              style={{ backgroundColor: '#833AB4', color: '#ffffff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' ,margin:'5px'}}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
