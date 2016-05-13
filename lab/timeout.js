var timerId;
var counter = 0;

timerId = setInterval(periodic, 1000, cb);

function cb() {
    console.log('I have finished executing');
}

function periodic(cb) {

    console.log('Executing function from');
    counter++;

    // should stop executing
    if (counter === 10) {

        clearTimeout(timerId);
        cb();

    }

}
