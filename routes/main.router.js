/*
Imports
*/
    // NodeJS
    const { Router } = require('express');

    // Inner
    const AuthRouterClass = require('./auth/auth.routes');
    const ChatRouterClass = require('./chat/chat.routes');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router({ mergeParams: true });
    const apiAuthRouter = Router({ mergeParams: true });
    const apiChatRouter = Router({ mergeParams: true });

    // Child
    const authRouter = new AuthRouterClass();
    const chatRouter = new ChatRouterClass();
//

/*
Define routes
*/
    mainRouter.use('/auth', apiAuthRouter);
    apiAuthRouter.use('/', authRouter.init());
    mainRouter.use('/chat', apiChatRouter);
    apiChatRouter.use('/', chatRouter.init());


//

/*
Export
*/
    module.exports = { mainRouter };
//