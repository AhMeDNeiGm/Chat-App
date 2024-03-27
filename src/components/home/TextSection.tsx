import { Link } from 'react-router-dom'

export default function TextSection() {
  return (
    <div className="w-full lg:w-1/2 text-center lg:text-start ">
      <div className="absolute block lg:hidden h-48 w-48 blur-[120px] rounded-full bg-primary -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]"></div>

      <div className="flex justify-center gap-6 lg:hidden mb-8">
        <div className="text-4xl p-2 rounded-full from-primary to-praimry-dimmer bg-gradient-to-tl">
          🤩
        </div>
        <div className="text-4xl p-2 rounded-full from-primary to-praimry-dimmer bg-gradient-to-tl">
          🥰
        </div>
        <div className="text-4xl p-2 rounded-full from-primary to-praimry-dimmer bg-gradient-to-tl">
          🥳
        </div>
      </div>
      <h1 className="text-4xl lg:text-[64px] font-semibold leading-tight lg:leading-tight mb-4">
        Where Every Message Finds Its Perfect Moment
      </h1>
      <p className="text-lg leading-normal mb-6 lg:w-[100%]">
        Welcome to our vibrant chat platform, where every keystroke carries the
        potential to forge meaningful connections. Whether you're reaching out
        to friends or family, our intuitive interface and seamless experience
        make it effortless to express yourself and engage with others.
      </p>
      <Link
        to="/signup"
        className="cursor-pointer bg-primary py-2 px-16 rounded-lg font-medium text-xl duration-300 hover:bg-primary-dimmer"
      >
        Join Now
      </Link>
    </div>
  )
}
