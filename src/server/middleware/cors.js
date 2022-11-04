//CORS middleware
const allowCrossDomain = (req, res, next) =>  {
    res.header('Access-Control-Allow-Origin', 'http://18.212.191.208/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

module.exports = {allowCrossDomain};