// import { useState } from 'react'
import useToggle from '../../utilities/useToggle'

export function ImageMessage({ message }: { message: string }) {
  const [isToggled, setIsToggled, elementRef] = useToggle()

  const handelToggle = () => {
    setIsToggled(true)
  }

  return (
    <>
      <div className="mb-2 cursor-pointer rounded-xl overflow-hidden">
        <img src={message.split(' ')[1]} alt="image" onClick={handelToggle} />
      </div>
      {isToggled && (
        <div className="absolute w-full h-full top-0 left-0 bg-darkest/40 z-[100] flex justify-center items-center p-8">
          <div ref={elementRef} className="bg-gray p-4 rounded-2xl">
            <div className="rounded-2xl overflow-hidden mb-2">
              <img src={message.split(' ')[1]} alt="image" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
