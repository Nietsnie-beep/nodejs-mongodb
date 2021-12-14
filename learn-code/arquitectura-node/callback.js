const promise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('hello world')
        }else{
            reject(new Error('hello Error'))
        }
    }, 2000);
});

// asyncCallback((err, msg) => {
//     if (err) {
//         console.log('error', err);
//     }else{
//         console.log('message', msg);
//     }
// });

promise.then(msg => msg.toUpperCase())
.then(msg => console.log("message", msg))
.catch(err => console.log("error".err));