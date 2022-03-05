import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login } from '../API/Auth'

function Login() {
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'must contain at least of 6 characters')
            .max(10, 'must contain a maximum of 10 characters')
            .required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values, { resetForm }) => {
            setLoading(true)
            login(values, setLoading)
            resetForm()
        },
        validationSchema,
    })

    return (
        <>
            <div className="mx-auto mt-40 flex w-2/5 place-content-center border-2">
                <form
                    onSubmit={formik.handleSubmit}
                    className="mx-auto w-4/5 space-y-5 py-5"
                >
                    <div className="my-9 text-center">
                        <h1>Login</h1>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="border p-1 outline-none"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email ? (
                            <div className="text-red-600">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="border p-1 outline-none"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password ? (
                            <div className="text-red-600">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="py-5 text-center">
                        <button
                            type="submit"
                            className="flex rounded bg-green-700 px-12 py-3 text-white"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner-border border-dotted animate-spin inline-block w-6 h-6 border-4 rounded-full" role="status">
                                    </div>
                                </div>

                            ) : (
                                'Log In'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
