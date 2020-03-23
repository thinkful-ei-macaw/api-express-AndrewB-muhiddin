const express = require('express');
const app = express();

// Ex 1
app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (!a || !b) {
    return res.status(400).send('Please provide a number ');
  }
  res.status(200).send(`The sum of ${a} and ${b} is ${a + b}`);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

// Ex 2
app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  if (!text) {
    return res.status(400).send('Please enter text');
  }

  if (!shift) {
    return res.status(400).send('Please enter number');
  }

  const numShift = Number(shift);

  if (Number.isNaN(numShift)) {
    return res.status(400).send('Not a number. Please enter valid number');
  }

  const textArr = text.split('');

  let newText = textArr.map(char => {
    if (char === 'Z') {
      return 'A';
    } else if (char === 'z') {
      return 'a';
    }
    return String.fromCharCode(char.charCodeAt(0) + 1);
  });
  console.log(newText);

  res.status(200).send(newText);
});


// Ex3
app.get('/lotto', (req, res) => {
  const { numbers } = req.query;
  

  if (!numbers) {
    return res.status(400).send('Numbers required!');
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send('Numbers must be an array');
  }

  let randomArr = Array(6)
    .fill()
    .map(() => Math.ceil(Math.random() * 20));
  console.log('Random arr', randomArr);
  let count = 0;
  numbers.forEach(number => {
    if (randomArr.includes(Number(number))) {
      count++;
    }
  });
  if(numbers.length !== 6) {
    res.status(400).send('Enter 6 numbers!');
  }
  if (count < 4) {
    res.status(200).send('Sorry, you lose.');
  }

  if (count === 4) {
    res.status(200).send('Congratulations, you win a free ticket');
  }

  if (count === 5) {
    res.status(200).send('Congratulations, you win $100!');
  }

  if (count === 6) {
    res.status(200).send('Wow! Unbelievable! You could have won the mega millions!');
  }
});

