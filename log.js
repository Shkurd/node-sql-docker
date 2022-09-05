const EventEmitter = require('events')

class Logger extends EventEmitter {

    log = (msg) => {
        console.log(msg)
        this.emit('some-event', {id:1, text:'some text for event'})
    }

}

module.exports = Logger