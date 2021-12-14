const promiseFunction = new Promise((resolve, reject) =>{
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('hello world')
        }else{
            reject(new Error('hello Error'))
        }
    }, 2000);
});

const asyncAwait = async() =>{
    try {
        const msg = await promiseFunction();
        console.log('message', msg);
    } catch (err) {
        console.log('error', err);
    }
}

asyncAwait();