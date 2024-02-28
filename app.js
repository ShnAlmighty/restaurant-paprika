const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get((req, res) => {
  res.send("Welcome to Restaurant APIs!")
})

const restaurantRouter = require('./app/routes/restaurant');
app.use('/restaurants', restaurantRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
