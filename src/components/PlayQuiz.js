import React from 'react'
import { useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Card  from './common/Card';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { database } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';


export default function PlayQuiz({route, navigation}){
    const [questionCounter, setQuesCounter] = useState(1);
    const [totalQuiz, setTotalQuiz] = useState(10);
    const [questionsArray, setQuesArray] = useState([]);
    const [quizType, setQuizType] = useState('');
    const [quizDifficulty, setQuizDifficulty] = useState('');
    const [result, setResult] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const databaseRef = collection(database, 'Leader Board')

    React.useEffect(() => {
        const { quizData, quizCount, quizType, quizDifficulty } = route.params;
        setQuesArray(quizData)
        setTotalQuiz(quizCount)
        setQuizDifficulty(quizDifficulty)
        setQuizType(quizType)
        setPlayerName(localStorage.getItem('Playername'))
     }, []) 
    
     const prevQuestion = () => {
         if(questionCounter > 1)
         {
            setQuesCounter(questionCounter - 1)
         }
     }

     const nextQuestion = () => {
         if(questionCounter < totalQuiz)
         {
            setQuesCounter(questionCounter + 1) 
         }
    }

    const submitQuiz = () => {
        addDoc(databaseRef, {playerName: playerName, Difficulty: quizDifficulty, Category: questionsArray[0].category, finalScore: result}).then(() => {navigation.navigate("Result", {finalResults: result})})
        //navigation.navigate("Result")
    }

    return (
        <div className='text'>
            <h1>Music Royale</h1>
                <h2>Question Number: {questionCounter}</h2>
                <h3>Difficulty: {quizDifficulty}</h3>
                
                <Card 
                questionsArray={questionsArray} 
                questionCounter={questionCounter}
                nextQuestion={nextQuestion}
                setResult={setResult}
                result={result}
                />
                {questionCounter == Number(totalQuiz) ? (<Button
                    onClick={submitQuiz}
                    variant="contained"   
                    style={{marginLeft: 10}}>
                    Submit
                </Button>) : ("")}
        </div>
    )
}