const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/webhook?type=payment&id=test_payment_123',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response status:', res.statusCode);
        console.log('Response body:', data);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(JSON.stringify({ id: 'test_payment_123' }));
req.end();
