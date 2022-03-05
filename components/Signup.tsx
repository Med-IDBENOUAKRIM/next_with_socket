import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from "../API/Auth";
import Link from "next/link";

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
                  .min(4, "must contain at least of 4 characters")
                  .max(50, "must contain a maximum of 50 characters")
                  .required("name is required"),
        username: Yup.string()
                  .min(4, "must contain at least of 4 characters")
                  .max(50, "must contain a maximum of 50 characters")
                  .required("username is required"),
        email: Yup.string()
                  .email('Enter a valid email')
                  .required("Email is required"),
        password: Yup.string()
                        .min(6, "must contain at least of 6 characters")
                        .max(10, "must contain a maximum of 10 characters")
                        .required("Password is required"),
        
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        onSubmit: (values, { resetForm } ) => {
            if(!errorMsg) {
                setLoading(true);
                signUp(values, setLoading, setErrorMsg);
                resetForm();
            } else {
                setErrorMsg(true);
            }
        },
        validationSchema
    })

  return (
        
            
<>
      {
          loading ? (
            <div className="flex flex-col space-y-20 place-content-center mt-52 items-center justify-center w-72 border mx-auto h-72 shadow-lg" >
                 <p>loading...</p>
                <div className="flex items-center justify-center ">
                    <div className="w-24 h-24 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
                </div>
            </div>
          ) : (
            <div className="flex flex-col place-content-center mt-40 border-2 w-2/5 mx-auto" >
                <form onSubmit={formik.handleSubmit} className="space-y-5 py-5 w-4/5 mx-auto" >
                    <div className="text-center my-9">
                        {/* <h1>Register</h1> */}

                        { errorMsg ? <p className="text-red-600 text-2xl" >User already registered!</p> : ( <h1>Register</h1> ) }


                    </div>
                    <div className="flex flex-col space-y-1 ">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="border outline-none p-1"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.username ? (
                            <div className="text-red-600">
                            {formik.errors.name}
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="border outline-none p-1"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.username ? (
                            <div className="text-red-600">
                            {formik.errors.username}
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            className="border outline-none p-1"
                            value={formik.values.email} 
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email ? (
                            <div className="text-red-600">
                            {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="password" 
                            className="border outline-none p-1" 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password ? (
                            <div className="text-red-600">
                            {formik.errors.password}
                            </div>
                        ) : null}
                    </div>
                    <div className="flex place-items-center space-x-14 text-center py-5">
                        <button type="submit" className="flex rounded bg-green-700 text-white px-10 py-3" >
                            Sign Up 
                        </button>
                    
                        <div className="flex" >
                            <p>You have a count&nbsp;</p>
                            <Link href='/login' passHref>
                                <a className="text-blue-600" >login</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
          )
      }

</>
               
  );
}

export default Signup;
