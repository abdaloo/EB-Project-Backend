const exp = require('express');
const app = exp();
const UserRoute = require('./routes/UserRoute');
const PlantRoute = require('./routes/PlantRoute');
const connectDB = require('./config/ConnectDb');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(cors());
app.use(exp.json());
app.get('/',(req,res)=>{
    res.send("hi there")
})
app.use('/uploads', exp.static(path.join(__dirname, 'uploads')));
app.use('/api/v0/user', UserRoute);
app.use('/api/v0/plants', PlantRoute);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running: http://localhost:' + PORT);
});