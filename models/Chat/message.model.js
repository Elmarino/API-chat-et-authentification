//NOT USED

/*
Imports & configs
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
    const jwt = require('jsonwebtoken');
//


/*
Model definition
*/
    const messageSchema = new Schema({
        username: String,
        content: String,
        date_time: String,
    })
//

/*
Method
*/

//

/*
Export
*/
    const MessageModel = mongoose.model('user', messageSchema);
    module.exports = MessageModel;
//