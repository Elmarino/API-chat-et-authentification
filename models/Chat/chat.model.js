/*
Imports & configs
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
    const jwt = require('jsonwebtoken');

    //const MessageModel = require('message.model');
//


/*
Model definition
*/
    const chatSchema = new Schema({
        title: String,
        messages_list: Array,
    })
//

/*
Method
*/    
    chatSchema.methods.addMessage = function addMessage(message){
        const datetime = new Date();
        this.messages_list = [...this.messages_list, {id: this._id, msg: message, date: datetime}]
    };
//

/*
Export
*/
    const ChatModel = mongoose.model('chat', chatSchema);
    module.exports = ChatModel;
//