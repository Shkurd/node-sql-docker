const EventEmitter = require('events')
const Logger = require('./log')
logger = new Logger()

logger.on('some-event', (args)=>{
    const {id, text} = args;
    console.log(id, text)
})

logger.log('User logged')
