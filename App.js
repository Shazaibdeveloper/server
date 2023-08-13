const express = require('express');
const app = express();
// const User = require('./models/UserSchema');
app.use(express.json());
app.use(require('./router/Auth'));
require('./db/Conn')
const dotenv = require('dotenv');


dotenv.config({path:'./config.env'})
 const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
