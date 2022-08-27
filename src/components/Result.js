import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { database } from '../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Table from './common/Table';
import Divider from '@mui/material/Divider';

export default function Result({route, navigation}) {
  const databaseRef = collection(database, 'Leader Board')
  const [finalResult, setFinalResult] = React.useState(0)
  const [leaderBoardData, setLeaderBoardData] = React.useState([]);
  React.useEffect(() => {
    const {finalResults} = route.params;
    setFinalResult(finalResults)
    getData()
 }, [])

  const getData = async() => {
      const data = await getDocs(databaseRef)
      setLeaderBoardData(
        data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        .sort((a, b) => parseFloat(b.finalScore) - parseFloat(a.finalScore))
        )
  }
  const retryQuiz = () => {
    navigation.navigate("Quiz")
  }

  return (
    <div className='text'>
        <h1>Result</h1>
        {finalResult ? (
          <h2>Final Score is {finalResult}</h2>
        ) : ("")}

        <Button
            onClick={retryQuiz}
            variant="contained"
            style={{marginBottom: 20}}>
            Play Again
        </Button>
        <Divider />
        <h2>Leader Board</h2>
        <div style = {{margin: 20}}>
          <Table leaderBoardData = {leaderBoardData} />
        </div>
    </div>
  )
}
