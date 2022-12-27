const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const port_name = process.env.PORT;
app.use(express.static(path.join(__dirname + '/uploads')));
app.use(cors({ origin: true, credentials: true })); // origin: true cho phép client truy cập.
// const db = require('./app/models/connectDB');
// db();

// config static
// app.use('/', express.static(path.join(__dirname, 'uploads')));
// config non SSL
var http = require('http');
const server = http.createServer(app);

// config SSL
// var https = require('https');
// var fs = require('fs');
// const options = {
//     key: fs.readFileSync(`/www/server/panel/vhost/cert/app.agrios.optechdemo2.com/privkey.pem`),
//     cert: fs.readFileSync(`/www/server/panel/vhost/cert/app.agrios.optechdemo2.com/fullchain.pem`),
//     requestCert: false,
//     rejectUnauthorized: false,
// };
// const server = https.createServer(options, app);

app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const jwtMiddleware = require('./app/middlewares/jwt.middleware');
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*'); //Cấp quyền cho client được truy cập để sử dụng tài nguyên, "*" là tất cả client.
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS, PATCH'); // Các phương thức của client khi gọi api
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Content-Type: application/json định dạng kiểu dữ liệu json
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// };
// app.use(allowCrossDomain); // nhận biến allowCrossDomain ở trên

app.use(bodyParser.json());

// routes list
// require('./app/routes/LoginAdmin.route')(app);
// require('./app/routes/admins.route')(app);
require('./app/routes/user.route')(app);

// app.use(jwtMiddleware.isAuth); // check login

server.listen(port_name);
console.log('server listen port ' + port_name);
