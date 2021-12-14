const EventEmitter = require('events');

class Logger extends EventEmitter{
    excute(cb){
        console.log('before');
        this.emit('start')
        cb()
        this.emit('finish');
        console.log('after');
    }
}

const logger = new Logger();

logger.on('start',() => {
    console.log('starting');  
  } )

logger.on('finish',() => {
  console.log('Finishing');  
})


logger.on('finish',() => {
    console.log('It\'s Done');  
  })


//logger.excute(() => console.log('hello world'))

logger.excute(() => setTimeout(() => {
    console.log('hello world'), 500
}))