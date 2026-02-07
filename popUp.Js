// Load saved speeds when popup opens
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['customSpeeds'], (result) => {
        if (result.customSpeeds) {
            document.getElementById('speed1').value = result.customSpeeds[0];
            document.getElementById('speed2').value = result.customSpeeds[1];
            document.getElementById('speed3').value = result.customSpeeds[2];
            document.getElementById('speed4').value = result.customSpeeds[3];
        }
    });
});

// Save speeds when button is clicked
document.getElementById('save').addEventListener('click', () => {
    const speeds = [
        parseFloat(document.getElementById('speed1').value),
        parseFloat(document.getElementById('speed2').value),
        parseFloat(document.getElementById('speed3').value),
        parseFloat(document.getElementById('speed4').value)
    ];
    
    chrome.storage.local.set({ customSpeeds: speeds }, () => {
        const message = document.getElementById('saved-message');
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    });
});