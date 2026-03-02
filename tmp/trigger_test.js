
async function triggerTest() {
    const payload = {
        type: 'payment',
        data: { id: 'test_payment_123' }
    };

    try {
        const response = await fetch('http://localhost:3000/webhook?type=payment&id=test_payment_123', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log('Response:', text);
    } catch (error) {
        console.error('Error triggering webhook:', error);
    }
}

triggerTest();
