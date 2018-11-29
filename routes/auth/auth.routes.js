/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');

    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['email', 'password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                register(req.body)
                .then( apiResponse =>  sendApiSuccessResponse(res, 'User registred', apiResponse))
                .catch( apiError => sendApiErrorResponse(res, 'Error by registring', apiError))
            });

            // Login
            authRouter.post('/login', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['email', 'password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                login(req.body)
                .then( apiResponse =>  sendApiSuccessResponse(res, 'User logged in', apiResponse))
                .catch( apiError => sendApiErrorResponse(res, 'User not logged in', apiError))
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//