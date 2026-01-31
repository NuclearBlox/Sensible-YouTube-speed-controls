const leftControls = document.querySelector('.ytp-left-controls');

function AddButton(Speed) {
    if (!leftControls) return;

    const button = document.createElement('button');
    button.innerText = Speed + 'x';
    

    button.style.height = '40px';
    button.style.width = '40px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.borderRadius = '40px';
    button.style.background = 'rgba(0,0,0,.3)';
    button.style.color = 'white';
    button.style.marginLeft = '4px';
    button.style.fontFamily = 'Roboto, Arial, sans-serif';

    leftControls.appendChild(button);

    const video = document.querySelector('video');


    const resetSpeed = () => {
        if (video) video.playbackRate = 1;
        button.style.background = 'rgba(0,0,0,.3)';
        window.removeEventListener("mouseup", resetSpeed);
    };

    button.addEventListener("mousedown", () => {
        if (video) video.playbackRate = Speed;
        button.style.background = 'rgba(255, 255, 255, 0.2)';
        window.addEventListener("mouseup", resetSpeed);
    });

    button.addEventListener("mouseenter", () => {
        button.style.background = 'rgba(49, 49, 49, 0.2)';
    });

    button.addEventListener("mouseleave", () => {
        if (!video || video.playbackRate === 1) {
            button.style.background = 'rgba(0,0,0,.3)';
        }
    });
}

// Initialize
['.5', '3', '4', '5'].forEach(speed => AddButton(speed));