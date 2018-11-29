/*
Imports
*/
    const express = require('express');
    const chatRouter = express.Router({ mergeParams: true });
    const { createChat, createMessage, readMessage, updateMessage, deleteMessage } = require('./chat.controller');

    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

//

/*
Routes definition
*/
    class ChatRouterClass {
        routes(){

            chatRouter.get('/', (req, res) => {

                res.send('Chatting page')
               
            });

            chatRouter.post('/', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['title'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
                
                createChat(req.body)
                .then( messageResponse =>  sendApiSuccessResponse(res, 'Message sent', messageResponse))
                .catch( messageError => sendApiErrorResponse(res, 'Message not sent', messageError))

            });
            
            // Post a message
            chatRouter.post('/message', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['id_room','message', 'user'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                createMessage(req.body)
                .then( messageResponse =>  sendApiSuccessResponse(res, 'Message sent', messageResponse))
                .catch( messageError => sendApiErrorResponse(res, 'Message not sent', messageError))
            });

            // Get a message
            chatRouter.get('/message', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['id_room'], req.body);
                if( !ok ){ sendFieldsError( res, 'No chat room', miss, extra ) }

                // Use controller function
                readMessage(req.body)
                .then( messageResponse =>  sendApiSuccessResponse(res, 'Message sent', messageResponse))
                .catch( messageError => sendApiErrorResponse(res, 'Message not sent', messageError))

            });

            // Update a message
            chatRouter.put('/message', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                //Control field sended
                const { miss, extra, ok } = checkFields(['message', 'user'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                updateMessage(req.body)
                .then( messageResponse =>  sendApiSuccessResponse(res, 'Message sent', messageResponse))
                .catch( messageError => sendApiErrorResponse(res, 'Message not sent', messageError))
            });

            // Delete a message
            chatRouter.delete('/message', (req, res) => {

                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                // Use controller function
                deleteMessage(req.body)
                .then( messageResponse =>  sendApiSuccessResponse(res, 'Message sent', messageResponse))
                .catch( messageError => sendApiErrorResponse(res, 'Message not sent', messageError))
            });
        };

        init(){
            this.routes();
            return chatRouter;
        }
    }
//

/*
Export
*/
    module.exports = ChatRouterClass;
//