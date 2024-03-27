import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { ax } from '../utilities/axios.config'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik'

import AuthCover from '../components/auth/AuthCover'
import SubmitBtn from '../components/auth/SubmitBtn'
import LinkMessage from '../components/auth/LinkMessage'
import InputFormik from '../components/auth/InputFormik'
import StatusFormik from '../components/auth/StatusFormik'
import AuthCoverSmall from '../components/auth/AuthCoverSmall'
import ErrorResponse from '../interfaces/DTOs/ErrorResponseDTO'
import {
  faAt,
  faLock,
  faUser,
  faMobile
} from '@fortawesome/free-solid-svg-icons'

interface FormValues {
  email: string
  username: string
  phonenumber: string
  password: string
  confirmPassword: string
}
const phoneRegex = /^01[0125][0-9]{8}$/
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  phonenumber: Yup.string()
    .required('Required')
    .matches(phoneRegex, { message: 'Valid Egyptiant mobile numbers only' })
})

export default function SignupPage() {
  const navigate = useNavigate()

  const initialValues: FormValues = {
    email: '',
    username: '',
    phonenumber: '',
    password: '',
    confirmPassword: ''
  }

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = { ...values, gender: 'male' }
      await ax.post('/auth/signup', data)
      actions.resetForm()
      navigate('/login')
    } catch (err: unknown) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          const resErr = axiosError.response.data as ErrorResponse
          if (resErr.message) {
            actions.setStatus(resErr.message)
            return
          }
          actions.setStatus(resErr.errors[0].msg)
          console.log(axiosError.response.status)
        } else {
          actions.setStatus('Network Error')
          console.log(axiosError.message)
        }
      } else {
        actions.setStatus('An error occurred')
        console.error(err)
      }
    }
  }

  return (
    <div className="flex bg-dark h-screen min-h-fit">
      <AuthCoverSmall />
      <div className="flex justify-center items-center p-10 w-full md:w-1/2 md:pt-10 pt-32">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="w-full lg:w-[70%] md:w-[90%]">
              <StatusFormik status={status} />
              <InputFormik
                lable="Email"
                name="email"
                icon={faAt}
                type="email"
                placeholder="Enter your Email"
              />
              <InputFormik
                lable="Username"
                name="username"
                icon={faUser}
                type="text"
                placeholder="Enter Username"
              />
              <InputFormik
                lable="Phone Number"
                name="phonenumber"
                icon={faMobile}
                type="text"
                placeholder="Enter a valid Egyptian number"
              />
              <InputFormik
                lable="Password"
                name="password"
                icon={faLock}
                type="password"
                placeholder="************"
              />
              <InputFormik
                lable="Confirm Password"
                name="confirmPassword"
                icon={faLock}
                type="password"
                placeholder="************"
              />
              <SubmitBtn isSubmitting={isSubmitting} lable="Sign up" />
              <LinkMessage variant="login" />
            </Form>
          )}
        </Formik>
      </div>
      <AuthCover />
    </div>
  )
}
