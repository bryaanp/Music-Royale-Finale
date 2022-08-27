import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from './Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function OutlinedCard({
    questionCounter,
    questionsArray,
    nextQuestion,
    setResult,
    result
}) {
  return (
    <Box sx={{ minWidth: 275 }} style={{margin: 20}}>
        {questionsArray.length > 0 ? (
            <Card variant="outlined">
            <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Question: {parse(questionsArray[questionCounter - 1].question)}
            </Typography>
            
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Category: {parse(questionsArray[questionCounter - 1].category)}
            </Typography>
            {[...questionsArray[questionCounter - 1].incorrect_answers, questionsArray[questionCounter - 1].correct_answer
            ].map((options) => {
                return(
                   <Grid 
                   nextQuestion={nextQuestion}
                   options={parse(options)}
                   setResult={setResult}
                   result={result}
                   correctAnswer={questionsArray[questionCounter - 1].correct_answer} 
                   /> 
                )})}
        </CardContent>
      </Card>
      ): (
          ""
      )}
      
    </Box>
  );
}
