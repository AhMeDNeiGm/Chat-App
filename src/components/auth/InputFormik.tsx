import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'

interface Props {
  lable: string
  name: string
  icon: IconProp
  type: string
  placeholder: string
}

export default function InputFormik(props: Props) {
  const { lable, name, icon, type, placeholder } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="flex items-center gap-3 font-semibold pb-4 text-light text-sm"
      >
        <FontAwesomeIcon icon={icon} />
        <p>{lable}</p>
      </label>
      <div className="relative">
        <Field
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full text-sm px-4 py-2 mb-2 border-b-2 border-lightgray bg-gray text-light focus:outline-none focus:border-primary"
        />
        {type == 'password' && (
          <span
            className="cursor-pointer absolute top-2 right-4 text-lightgray duration-300 hover:text-light"
            onClick={() => setShowPassword((s) => !s)}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        )}
      </div>
      <div className="h-4">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  )
}
