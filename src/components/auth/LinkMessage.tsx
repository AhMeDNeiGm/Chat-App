import { Link } from 'react-router-dom'

export default function LinkMessage({
  variant
}: {
  variant: 'login' | 'signup'
}) {
  return (
    <div className="text-center text-sm text-white p-6 mt-3">
      {`You ${variant == 'login' ? ' already ' : "don't"} have an account?`}
      <Link
        to={`/${variant}`}
        className=" ml-2 cursor-pointer duration-300 text-secondary hover:text-secondary-dimmer"
      >
        {variant == 'login' ? 'Login ' : 'Sign up'}
      </Link>
    </div>
  )
}
