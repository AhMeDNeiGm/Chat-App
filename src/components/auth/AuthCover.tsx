export default function AuthCover() {
  return (
    <div className="relative hidden md:flex flex-col justify-center items-center w-1/2  bg-darkest">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-32 h-32 rounded-full bg-primary blur-[130px]"></div>
      <div className="relative w-full flex flex-col justify-center items-center text-center gap-8">
        <p className="billo text-light text-8xl lg:text-9xl font-black">
          CONVO
        </p>
        <p className="text-light text-sm w-[70%] opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          repellendus delectus inventore aperiam vitae repellat eligendi id eum,
          incidunt ipsa voluptatem nostrum tempore quia minima blanditiis
          molestias alias ea. Enim.
        </p>
        <div className="flex gap-6">
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
      </div>
    </div>
  )
}
