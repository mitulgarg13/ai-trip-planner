import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative bg-[#7dd3fc] text-[#0f172a] overflow-hidden py-28 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Plan Your Perfect Trip <br />
            with <span className="text-[#0e7490]">AI Insights</span>
          </h1>

          <p className="text-[#0f172a] mt-6 text-lg md:text-xl max-w-2xl">
            Your AI-powered travel planner — discover new adventures with
            personalized itineraries designed just for you.
          </p>

          <Link to="/create-trip">
            <Button className="mt-8 px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-full text-lg transition shadow-lg hover:shadow-xl">
              Start Your AI Journey
            </Button>
          </Link>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1618245318763-a15156d6b23c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9saWRheSUyMHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"  // ✅ Use your actual image
         // src='../assets/hero.png'
           alt="AI Travel Assistant"
            className="w-full max-w-[500px] mx-auto drop-shadow-[0_0_40px_rgba(14,165,233,0.3)]"
          />
        </div>
      </div>

      {/* Optional subtle glow blobs */}
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[#38bdf8] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#0ea5e9] opacity-30 rounded-full blur-3xl"></div>
    </section>
  )
}

export default Hero
