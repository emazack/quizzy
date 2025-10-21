
import { useEffect, useState } from 'react'
import './App.css'
import blobOne from './assets/blob1.png'
import blobTwo from './assets/blob2.png'


function App() {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    async function getQuiz() {
      setLoader(true)
      setError(false)
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setData(data.results)
        setLoader(false)
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoader(false);
      }
    }
    getQuiz()
  }, [])

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  const quizData = data.map((dataElement, index) => {
    const sortedAnswers = [...dataElement.incorrect_answers, dataElement.correct_answer].sort((a, b) => a - b)
    return {
      id: index,
      question: dataElement.question,
      answers: sortedAnswers
    }
  })

  return (
    <main className='main-element'>
      {/* <div className='first-page-wrapper'>
        <h1 className='title'>
          Quizzy
        </h1>
        <p className='description'>
          Are you expert of Javascript?
        </p>
        <button className='main-button'>
          Start quiz
        </button>
      </div> */}
      <div className='second-page-wrapper'>
        <form className='quiz-container'>
          {quizData.map((quiz) => {
            return (
              <fieldset key={quiz.id} className='question-fieldset'>
                <legend className='question'>
                  {decodeHtml(quiz.question)}
                </legend>
                <ul className='answers-container'>
                  {quiz.answers.map((answer, index) => {
                    return (
                      <li key={index} className='answer'>
                        <input
                          type="radio"
                          id={`${answer}-${index}`}
                          name={answer}
                          value={answer}
                        />
                        <label htmlFor={`${answer}-${index}`}>{decodeHtml(answer)}</label>
                      </li>
                    )
                  })}
                </ul>
              </fieldset>
            )
          })}

          <button className='main-button'>
            Check answers
          </button>
          {/* <div className='score-container'>
            <h2 className='score'>
              You scored 3/5 correct answers
            </h2>
            <button className='main-button'>
              Play again
            </button>
          </div> */}
        </form>
      </div>
      <div className='blob-container one'>
        <img className='blob-image' src={blobOne} alt="" />
      </div>
      <div className='blob-container two'>
        <img className='blob-image' src={blobTwo} alt="" />
      </div>
    </main>
  )
}

export default App
