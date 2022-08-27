import './App.css'
import Quiz from './components/Quiz'
import {Route, Router, Routes} from 'react-router-dom';
import PlayQuiz from './components/PlayQuiz';
import {app} from './firebase-config';

function QuizApp()
{
  return(
      <div className='app-main'>
        <Quiz />
      </div>
  )
}

export default QuizApp;