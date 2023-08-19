const express = require('express');
 const app = express();
// const User = require('./models/UserSchema');
const cors = require('cors')
app.use(express.json());
app.use(require('./router/Auth'));
require('./db/Conn')
const dotenv = require('dotenv');

 const corsOptions = {
    credentials: true,
    origin: true // Add your frontend origin here (Don't add '/' at the end)
};
app.use("*", cors(corsOptions));

dotenv.config({path:'./config.env'})
 const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
