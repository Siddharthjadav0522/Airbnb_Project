import './App.css'

function App() {


  return (
    <>
      <header className='p-3 flex justify-between items-center'>
        <a href="" className='logo gap-1 flex text-primary items-center'>
          <i class="fa-brands fa-airbnb text-2xl"></i>
          <span className='font-bold text-xl'>airbnb</span>
        </a>

        <div className='flex gap-3 items-center border border-gray-300 rounded-full py-2 px-3 shadow-md shadow-gray-200'>
          <div className='text-sm'>Anywhere</div>
          <div className="border border-l border-gray-300 h-6"></div>
          <div className='text-sm'>Any week</div>
          <div className="border border-l border-gray-300 h-6"></div>
          <div className='text-gray-500 text-sm'>Add guests</div>
          <button className='bg-primary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center'>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center'>
          <i class="fa-solid fa-bars"></i>
          <div className='bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center'>
            <i class="fa-solid fa-user"></i>
          </div>
        </div>

      </header>
    </>
  )
}

export default App
