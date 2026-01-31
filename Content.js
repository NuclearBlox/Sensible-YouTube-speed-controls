


const leftControls = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls');

function AddButton(Speed) {
const button = document.createElement('button');
button.innerText = Speed + 'x';

button.style.position = 'relative';
button.style.height = '40px';
button.style.width = '40px';
button.style.fontSize = '14px';
button.style.display = 'flex';
button.style.alignSelf = 'center';
button.style.alignItems = 'center';
button.style.justifyContent = 'center';
button.style.cursor = 'pointer';
button.style.border = 'none';
button.style.color = 'var(--yt-spec-text-primary-inverse)';
button.style.fontWeight = '500';
button.style.borderRadius = '40px';
button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
button.style.padding = '8px 16px';
button.style.outline = 'none';
button.style.color = 'white';
button.style.fontFamily = '"YouTube Noto",Roboto,Arial,Helvetica,sans-serif'
button.style.fontSize = '14px';
button.style.marginLeft = '4px'; // Adjust '8px' to whatever spacing looks best to you

leftControls.appendChild(button);


// document.querySelector('video').playbackRate = Speed;
button.addEventListener("mousedown", () => {
    document.querySelector('video').playbackRate = Speed;
    button.style.background = 'rgba(255, 255, 255, 0.2)';
});
window.addEventListener("mouseup", () => {
    document.querySelector('video').playbackRate = 1;
    button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
});
button.addEventListener("mouseenter", () => {
    button.style.background = 'rgba(49, 49, 49, 0.2)';
});
button.addEventListener("mouseleave", () => {
    button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
});
}
AddButton('.5');
AddButton('3');
AddButton('4');
AddButton('5');

console.log("Extension loaded");