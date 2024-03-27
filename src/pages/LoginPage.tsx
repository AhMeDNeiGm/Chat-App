import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik'
import { ax, resetAxiosConfig } from '../utilities/axios.config'

import AuthCover from '../components/auth/AuthCover'
import SubmitBtn from '../components/auth/SubmitBtn'
import LinkMessage from '../components/auth/LinkMessage'
import InputFormik from '../components/auth/InputFormik'
import StatusFormik from '../components/auth/StatusFormik'
import AuthCoverSmall from '../components/auth/AuthCoverSmall'
import ErrorResponse from '../interfaces/DTOs/ErrorResponseDTO'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'

interface FormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required')
})

export default function LoginPage() {
  const navigate = useNavigate()

  const initialValues: FormValues = {
    email: '',
    password: ''
  }

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await ax.post('/auth/login', values)
      localStorage.setItem('username', res.data.message.split(' ')[2])
      localStorage.setItem('token', res.data.token)
      actions.resetForm()
      resetAxiosConfig()
      navigate('/chat')
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          const resErr = axiosError.response.data as ErrorResponse
          if (resErr.message) {
            actions.setStatus(resErr.message)
            return
          }
        } else {
          actions.setStatus('Somthing went wrong, please try again later')
        }
      } else {
        actions.setStatus('Somthing went wrong, please try again later')
      }
    }
  }

  return (
    <div className="flex bg-dark h-screen min-h-fit">
      <AuthCoverSmall />
      <div className="flex justify-center items-center p-10 w-full md:w-1/2 ">
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
                lable="Password"
                name="password"
                icon={faLock}
                type="password"
                placeholder="************"
              />

              <SubmitBtn isSubmitting={isSubmitting} lable="Login" />
              <LinkMessage variant="signup" />
            </Form>
          )}
        </Formik>
      </div>
      <AuthCover />
    </div>
  )
}
