import './App.css'
import blobOne from './assets/blob1.png'
import blobTwo from './assets/blob2.png'


function App() {

  return (
    <main className='main-element'>
      <div className='content-wrapper'>
        <h1 className='title'>
          Quizzy
        </h1>
        <p className='description'>
          Are you expert of Javascript?
        </p>
        <button className='start-button'>
          Start quiz
        </button>
      </div>
      <div className='blob-container one'>
        <img className='blob-image' src={blobOne} alt="decorative image blob color one" />
      </div>
      <div className='blob-container two'>
        <img className='blob-image' src={blobTwo} alt="decorative image blob color two" />
      </div>
    </main>
  )
}

export default App
