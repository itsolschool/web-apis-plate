$(function () {
    const cursor = $('#accelerometer_cursor')

    try {
        const accelerometer = new Accelerometer({referenceFrame: 'device'});
        accelerometer.addEventListener('error', event => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
                // Branch to code for requesting permission.
            } else if (event.error.name === 'NotReadableError') {
                console.log('Cannot connect to the sensor.');
            }
        });
        accelerometer.addEventListener('reading', function () {
            cursor.css('transform', `translate(${accelerometer.x}, ${accelerometer.y})`)
        });
        accelerometer.start();
    } catch (error) {
        // Handle construction errors.
        if (error.name === 'SecurityError') {
            // See the note above about feature policy.
            alert('Sensor construction was blocked by a feature policy.');
        } else if (error.name === 'ReferenceError') {
            alert('Sensor is not supported by the User Agent.');
        } else {
            throw error;
        }
    }
})