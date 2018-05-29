const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', function (req, res) {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData: authData
            });
        }
    });
});

app.post('/api/login', function (req, res) {
    // Mock user
    const user = {
        id: 1,
        username: 'tasfin',
        email: 'tareque20@gmail.com'
    }

    jwt.sign({user: user}, 'secretkey', function (err, token) {
        res.json({
            token: token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(3000, function () {
    console.log('Server started on port 3000')
});