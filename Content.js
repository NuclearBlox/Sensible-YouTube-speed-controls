let Locked = false;


function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
        return;
    }
    
    // If element doesn't exist, watch for it
    const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function AddButton(leftControls, Speed) {
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
    button.style.fontFamily = '"YouTube Noto",Roboto,Arial,Helvetica,sans-serif';
    button.style.fontSize = '14px';
    button.style.marginLeft = '4px';

    leftControls.appendChild(button);

    button.addEventListener("mousedown", () => {
        document.querySelector('video').playbackRate = Speed;
        button.style.background = 'rgba(255, 255, 255, 0.2)';

    });
    window.addEventListener("mouseup", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
        if (Locked) {
if (document.querySelector('video').playbackRate == Speed) {
    document.querySelector('video').playbackRate = 1;
    } else {
    document.querySelector('video').playbackRate = Speed;
    }
} else {
    document.querySelector('video').playbackRate = 1;
        }
        
    });
    button.addEventListener("mouseenter", () => {
        button.style.background = 'rgba(49, 49, 49, 0.2)';
    });
    button.addEventListener("mouseleave", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
    });
}
function lockButton(leftControls) {
        const button = document.createElement('button');

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
    button.style.padding = '8px 16px';
    button.style.outline = 'none';
    button.style.color = 'white';
    button.style.fontFamily = '"YouTube Noto",Roboto,Arial,Helvetica,sans-serif';
    button.style.fontSize = '14px';
    button.style.marginLeft = '4px';
    button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';


    const img = document.createElement('img');

    if (Locked) {
        img.src = chrome.runtime.getURL('lockFilled.png');
    } else {
        img.src = chrome.runtime.getURL('LockIcon.png');
    }



    img.style.width = '20px';
    img.style.height = '20px';

    button.appendChild(img);

    leftControls.appendChild(button);

    button.addEventListener("click", () => {
        Locked = !Locked;
        chrome.storage.local.set({speedLocked: Locked});
        if (Locked) {
                img.src = chrome.runtime.getURL('lockFilled.png');
        } else {
            document.querySelector('video').playbackRate = 1;
                img.src = chrome.runtime.getURL('LockIcon.png');
        }
    });

        button.addEventListener("mouseenter", () => {
        button.style.background = 'rgba(49, 49, 49, 0.2)';
    });
    button.addEventListener("mouseleave", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
    });
}

chrome.storage.local.get(['speedLocked', 'customSpeeds'], (result) => {
    Locked = result.speedLocked || false;
    const speeds = result.customSpeeds || [0.5, 3, 4, 5]; // defaults

    waitForElement('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls', (leftControls) => {
        if (leftControls.querySelector('.speed-control-custom')) return;
        
        speeds.forEach(speed => AddButton(leftControls, speed));
        
        console.log("Speed buttons loaded");
        lockButton(leftControls);
        console.log("Extension loaded");
    });
});