import { Link } from 'react-router-dom'
import TextSection from '../components/home/TextSection'

export default function HomePage() {
  return (
    <div className="bg-darkest h-screen min-h-fit text-light px-16">
      <header className="flex justify-between items-center py-12">
        <p className="billo text-5xl">CONVO</p>
        <Link to="login" className="text-xl">
          Login
        </Link>
      </header>
      <main className="flex items-center h-[70%]">
        <TextSection />
        <div className="relative lg:flex justify-center items-center w-1/2 h-full hidden">
          <div className="absolute h-48 w-48 blur-[120px] rounded-full bg-primary -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%]"></div>
          <img src="src/assets/hero.png" alt="hero image" />
        </div>
      </main>
    </div>
  )
}

