/*
Import
*/
    const ChatModel = require('../../models/Chat/chat.model');
//

/*
Services imports
*/

//

/*
Functions
*/
    const createChat = body => {
        return new Promise( (resolve, reject) => {
            ChatModel.create(body, (error, newChatRoom) => {
                if(error){ // Mongo error
                    return reject(error)
                }
                else{ // User registrated
                    return resolve(newChatRoom);
                };
            });
        })
    }

    // Create message
    const createMessage = body => {
        return new Promise( (resolve, reject) => {
            ChatModel.findOne( { room: body.id_room }, (error, chat) => {
                chat.addMessage(body.message)
                if(error) reject(error)
                else 
                resolve({
                    alert: 'Message added',
                    room: room,
                    message: body.message
                })
            })
        })
    }

    // Read message
    const readMessage = body => {
        return new Promise( (resolve, reject) => {
            
        });
    };

    // Update message
    const updateMessage = body => {
        return new Promise( (resolve, reject) => {
            // ChatModel.findOne( { room: body.id_room, message: req.params.id }, (error, chat) => {
            //     if(error) reject(error)
            //     else if( !chat ) reject('Room not found')
            //     else 
            //     const data = {
            //         title: chat.title,
            //         messages_list: [...chat.messages_list, {}],
            //     }
            //     ChatModel.update({_id: room}, doc, function(err, raw) {
            //         if (err) {
            //             reject(error)
            //         } else
            //         resolve({
            //             alert: 'Message added',
            //             room: room,
            //             message: message
            //         })
            //       });
                
            // })
        })
    }

    // Delete message
    const deleteMessage = body => {
        return new Promise( (resolve, reject) => {

        })
    }

//

/*
Export
*/
    module.exports = {
        createChat,
        createMessage,
        readMessage,
        updateMessage,
        deleteMessage
    }
//