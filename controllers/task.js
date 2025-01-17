const models = require('../models')
const auth = require('./auth')

const createTask = async (request, response) => {

    const creator = await auth.validUser(request)

    if (creator) {
        const text = request.body.text;
        const taskID = await models.createTask(creator.username, text);
 
        if (taskID) {
            response.json({status: "success", id: taskID})
        } else {
            response.json({status: "error"})
        }
    } else {
        response.sendStatus(401)
    }
}

const getTasks = async (request, response) => {
    const user = await auth.validUser(request)

    if (user) {
        const tasks = await models.getTasks(user.username, 10); 
        response.json({tasks});
    } else {
        response.sendStatus(401);
    }
}

const getTask = async (request, response) => {
    const user = await auth.validUser(request)

    if (user) {
        const result = await models.getTask(user, request.params.id);
        if (result) {
            response.json(result)
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(401)
    }
}


const updateTask = async (request, response) => {

    const user = await auth.validUser(request)
    const status = request.body.status;

    const result = await models.updateTask(user.username, request.params.id, status);
    if (result !== null) {
        response.json({status: 'success', id: result})
    } else {
        response.sendStatus(401)
    }
}

module.exports = {
    createTask, 
    getTasks,
    updateTask,
    getTask
}