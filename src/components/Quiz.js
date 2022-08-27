import React, { useState } from 'react'
import Select from './common/Select'
import Input from './common/Input'
import QuizDifficulty from './common/DifficultySelect';
import Button from '@mui/material/Button';
import axios from 'axios';
import PlayQuiz from './PlayQuiz';
import { useNavigation } from '@react-navigation/core';
import { database } from '../firebase-config';
import { TextField } from '@mui/material';


export default function Quiz() {
    const [quizCount, setQuizCount] = React.useState('10');
    const [quizType, setQuizType] = React.useState('');
    const [quizDifficulty, setQuizDifficulty] = React.useState('');
    const [quizArray, setQuizArray] = React.useState([]);
    const [playerName, setPlayerName] = React.useState('');
    const navigation = useNavigation()

    const handleChange = (event) => {
        setQuizType(event.target.value);
    };

    const handleDifficulty = (event) => {
        setQuizDifficulty(event.target.value);
    };

    const getPlayerName = (value) => {
        //const username = firebase.firestore().collection('users').username
        setPlayerName(value)
        localStorage.setItem('Playername', value)
    }

    const getQuiz = () => 
    {
        axios.get(`https://opentdb.com/api.php?amount=${quizCount}&difficulty=${quizDifficulty}&category=${quizType}`)
            .then((response) => {
        navigation.navigate("PlayQuiz", {
            quizData: response.data.results,
            quizCount: quizCount,
            quizType: quizType,
            quizDifficulty: quizDifficulty,
        })
    })
    }

  return (
    <div className='quiz-main'>
    <h1>React Quiz</h1>
    <TextField
        style={{marginBottom: 20}}
        fullWidth
        id="outlined-basic"
        label="Player Nickname"
        variant="outlined"
        onChange={(e) => getPlayerName(e.target.value)}
        value={playerName}
    />
    <Input 
        //Handles Number of Q's in Quiz Selection
        setQuizCount={setQuizCount}
        quizCount={quizCount}
    />
    <Select 
        //Handles Quiz Category Selection
        quizType={quizType} 
        handleChange={handleChange}/>
    <QuizDifficulty
        //Handles Difficulty of Quiz Selection
        quizDifficulty={quizDifficulty}
        handleChange={handleDifficulty}
    />
    <Button
        onClick={getQuiz}
        variant="contained"
        style={{marginTop: 10, marginRight: 5}}>
        GET QUIZ
    </Button>

    <Button
        onClick={() => navigation.navigate('Result', {finalResult : null})}
        variant="contained"
        style={{marginTop: 10, marginLeft: 5}}>
        CHECK LEADERBOARD
    </Button>
    </div>
  )
  
}

