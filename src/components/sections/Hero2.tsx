
function Hero2() {
  return (
    <div className='relative h-screen overflow-hidden flex items-end md:items-center justify-center bg-linear-to-br from-gray-500 via-gray-500 to-gray-800'>
        <img src="/home.png" alt="" className="" />
        {/* <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" /> */}
        <div className="absolute gap-4 top-10 md:top-4 md:bottom-6 w-full flex flex-col md:flex-row p-6 md:items-end justify-between">
            <div className="text-8xl md:text-9xl font-extrabold font-serif space-y-2">
                <h1>RUBY</h1>
                <h1>IZEKOR</h1>
            </div>
            <div className="text-4xl">
                <h1>Software Engineer</h1>
                <h3>CTO Justpostam.com</h3>
            </div>
        </div>
    </div>
  )
}

export default Hero2