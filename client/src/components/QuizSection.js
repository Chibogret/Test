import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, TextField, IconButton, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const API_IP = process.env.REACT_APP_API_IP;
const API_PORT = process.env.REACT_APP_API_PORT;

const QuizSection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setRandomQuestion(questions[Math.floor(Math.random() * questions.length)]);
    }
  }, [questions]);

  const fetchQuestions = () => {
    axios.get(`http://${API_IP}:${API_PORT}/questions`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  };

  const handleChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setSubmitted(true);
  };

  const handleAddQuestion = () => {
    const newQuestionData = {
      questionText: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    };

    axios.post(`http://${API_IP}:${API_PORT}/questions`, newQuestionData)
      .then(() => {
        fetchQuestions();
        setNewQuestion('');
        setNewOptions(['', '', '', '']);
        setNewCorrectAnswer('');
      })
      .catch(error => {
        console.error('There was an error adding the question!', error);
      });
  };

  const handleOptionChange = (index, value) => {
    const options = [...newOptions];
    options[index] = value;
    setNewOptions(options);
  };

  const getCardBackgroundColor = (question) => {
    if (!submitted) {
      return '#f9fbe7';
    }

    const isCorrect = selectedAnswers[question._id] === question.correctAnswer;
    return isCorrect ? '#a5d6a7' : '#ef9a9a';
  };

  const getTextColor = (question) => {
    if (!submitted) {
      return 'black';
    }

    const isCorrect = selectedAnswers[question._id] === question.correctAnswer;
    return isCorrect || !submitted ? 'white' : 'white';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Box sx={{ width: '80%', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ExpandMoreIcon />}
          onClick={() => setAddQuestionOpen(!addQuestionOpen)}
          sx={{ mb: 2, width: '100%' }}
        >
          Add a New Question
        </Button>
        <Collapse in={addQuestionOpen}>
          <Card sx={{ mb: 2, backgroundColor: '#f0f4c3', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Add a New Question</Typography>
              <TextField
                label="Question Text"
                variant="outlined"
                fullWidth
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                sx={{ mb: 2 }}
              />
              {newOptions.map((option, index) => (
                <TextField
                  key={index}
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  sx={{ mb: 2 }}
                />
              ))}
              <TextField
                label="Correct Answer"
                variant="outlined"
                fullWidth
                value={newCorrectAnswer}
                onChange={(e) => setNewCorrectAnswer(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
            </CardContent>
          </Card>
        </Collapse>
      </Box>
      {randomQuestion && (
        <Card
          key={randomQuestion._id}
          sx={{
            mb: 2,
            width: '80%',
            backgroundColor: getCardBackgroundColor(randomQuestion),
            color: getTextColor(randomQuestion),
          }}
        >
          <CardContent>
            <Typography variant="h6">{randomQuestion.questionText}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name={`question-${randomQuestion._id}`}
                value={selectedAnswers[randomQuestion._id] || ''}
                onChange={(e) => handleChange(randomQuestion._id, e.target.value)}
              >
                {randomQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{ color: getTextColor(randomQuestion) }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default QuizSection;
