import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({options, correctAnswer, nextQuestion, setResult, result}) {
    const handleOptions = (option) => {
        if(correctAnswer == option)
        {
            setResult(result + 1)
            toast.success("Right Answer", {
                position: toast.POSITION.BOTTOM_CENTER
              });
        }
        else
        {
            setResult(result - 1)
            toast.error("Wrong Answer", {
                position: toast.POSITION.BOTTOM_CENTER
              }); 
        }
        nextQuestion()
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} style={{margin: 5}}> 
          <Item className='options-grid' onClick={() => handleOptions(options)}> {options} </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
