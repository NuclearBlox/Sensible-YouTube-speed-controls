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
    button.classList.add("speed-control-custom");
    
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

        button.style.pointerEvents = 'auto';
button.style.zIndex = '9999';
button.style.position = 'relative';

    leftControls.appendChild(button);

    button.addEventListener("mousedown", () => {
        button.style.background = 'rgba(255, 255, 255, 0.2)';
        
        if (Locked) {
            if (document.querySelector('video').playbackRate == Speed) {
                console.log("Speed already set, resetting to normal");
                document.querySelector('video').playbackRate = 1;
            }else{
                document.querySelector('video').playbackRate = Speed;
            
            }


        } else {
            document.querySelector('video').playbackRate = Speed;
        }
    });
    window.addEventListener("mouseup", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
        if (Locked) return;
        document.querySelector('video').playbackRate = 1;
    });
    button.addEventListener("mouseenter", () => {
        button.style.background = 'rgba(49, 49, 49, 0.2)';
    });
    button.addEventListener("mouseleave", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
                if (Locked) {
            if (document.querySelector('video').playbackRate == Speed) {
                button.style.background = 'rgba(255, 255, 255, 0.2)'; 
            }}
    });
}
function lockButton(leftControls) {

        const button = document.createElement('button');

        button.className = "speed-control-custom";

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

    button.style.pointerEvents = 'auto';
button.style.zIndex = '9999';
button.style.position = 'relative';

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

function initButtons() {

chrome.storage.local.get(['speedLocked', 'customSpeeds'], (result) => {

    Locked = result.speedLocked || false;

    const speeds = result.customSpeeds || [0.5, 3, 4, 5];

    const isDefaultSpeeds =
        !result.customSpeeds ||
        JSON.stringify(speeds) === JSON.stringify([0.5, 3, 4, 5]);


    // LONG VIDEOS
    waitForElement(
        '#movie_player .ytp-left-controls',
        (leftControls) => {

            if (leftControls.querySelector('.speed-control-custom'))
                return;

            speeds.forEach(speed =>
                AddButton(leftControls, speed)
            );

            lockButton(leftControls);
            pipButton(leftControls, false);


            if (isDefaultSpeeds) {

                const hint = document.createElement('span');

                hint.style.cssText = `
                    margin-left:8px;
                    font-size:14px;
                    align-self:center;
                `;

                hint.innerHTML =
                    'Customize speeds: <a href="#" id="settings-link">Click here</a>';

                leftControls.appendChild(hint);

                hint.onclick = (e) => {
                    e.preventDefault();
                    createSettingsPanel();
                    hint.remove();
                };

                setTimeout(()=>hint.remove(),15000);

            }

        }
    );


    // SHORTS
    waitForElement(
        '#page-manager ytd-shorts .navigation-container',
        (leftControls) => {

            if (leftControls.querySelector('.speed-control-custom'))
                return;

            speeds.forEach(speed =>
                AddButton(leftControls, speed)
            );

            lockButton(leftControls);
            pipButton(leftControls, true);


            if (isDefaultSpeeds) {

                const hint = document.createElement('span');

                hint.style.cssText = `
                    margin-right:8px;
                    font-size:14px;
                    color:white;
                `;

                hhint.innerHTML = 'Customize speeds: <a href="#" style="color: #3ea6ff; text-decoration: none; cursor: pointer;">Click here</a>';

                leftControls.appendChild(hint);

                hint.onclick = (e)=>{
                    e.preventDefault();
                    createSettingsPanel();
                    hint.remove();
                };

                setTimeout(()=>hint.remove(),15000);

            }

        }
    );


});
}


// settings!
let settingOpen = false;
function createSettingsPanel() {
    if (settingOpen) return;
    settingOpen = true;
    const panel = document.createElement('div');
    panel.id = 'speed-settings-panel';
panel.style.cssText = `
    position: absolute;
    bottom: 60px;
    left: 10px;
    background: #282828;
    padding: 15px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.8);
    font-family: 'YouTube Noto',Roboto,Arial,sans-serif;
    color: white;
    pointer-events: auto;
`;

    
    chrome.storage.local.get(['customSpeeds'], (result) => {
        const speeds = result.customSpeeds || [0.5, 3, 4, 5];
        
        panel.innerHTML = `
            <div style="font-size: 16px; margin-bottom: 10px; font-weight: 500;">Customize Speeds</div>
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                ${speeds.map((speed, i) => `
                    <input type="number" id="inline-speed${i+1}" step="0.1" min="0.1" max="16" value="${speed}"
                           style="width: 60px; padding: 6px; background: #181818; color: white; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
                `).join('')}
            </div>
            <div style="font-size: 12px; color: #ff4a4a; margin-bottom: 10px;">
                Change a speed to stop getting the popup. You can also do this any time in the youtube settings menu!
            </div>
            <div style="display: flex; gap: 8px;">
                <button id="inline-save" style="flex: 1; padding: 8px; background: #cc0000; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">Save</button>
                <button id="inline-cancel" style="padding: 8px 16px; background: #555; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        document.getElementById('inline-save').addEventListener('click', () => {
            const newSpeeds = [1, 2, 3, 4].map(i => 
                parseFloat(document.getElementById(`inline-speed${i}`).value)
            );
            chrome.storage.local.set({ customSpeeds: newSpeeds }, () => {
                panel.remove();
                location.reload();
                    settingOpen = false;
            });
        });
        
        document.getElementById('inline-cancel').addEventListener('click', () => {
            panel.remove();
                settingOpen = false;
        });
    });
}

// Add settings menu item

const settingsMenu = document.querySelector('.ytp-panel-menu');
waitForElement('.ytp-panel-menu', (settingsMenu) => {
const newMenuItem = document.createElement('div');
newMenuItem.className = 'ytp-menuitem';
newMenuItem.setAttribute('role', 'menuitem');
newMenuItem.setAttribute('tabindex', '0');


newMenuItem.innerHTML = `
  <div class="ytp-menuitem-icon">
    <img src="${chrome.runtime.getURL('icon48.png')}" width="24" height="24" />
  </div>
  <div class="ytp-menuitem-label">Custom Speeds</div>
  <div class="ytp-menuitem-content">
    <div><span>Configure custom playback speeds</span></div>
  </div>
`;

newMenuItem.addEventListener('click', () => {
  createSettingsPanel();
});

if (settingsMenu) {
  settingsMenu.prepend(newMenuItem);
}
});




// Also PiP support because why not

function pipButton(leftControls, runningShorts) {
    if (leftControls.querySelector('.pip-toggle-button'))
    return;
        const button = document.createElement('button');
        button.className = 'pip-toggle-button';
        button.classList.add("speed-control-custom");
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
    button.style.zIndex = '9999';
    button.style.pointerEvents = 'auto';
    if (runningShorts == true) {
        button.style.position = 'relative';
        button.style.bottom = '0';
        button.style.left = '0';
        button.style.transform = 'none';
    } else {
    button.style.position = 'absolute';
    button.style.bottom = '120%';
    button.style.left = '16px';
        button.style.transform = 'translateX(-50%)';
    }

    const img = document.createElement('img');

        img.src = chrome.runtime.getURL('pipIcon.png');



    img.style.width = '20px';
    img.style.height = '20px';

    button.appendChild(img);

    leftControls.appendChild(button);

    button.addEventListener("click", () => {
  const video = document.querySelector('video');
  if (!video) return;
  
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    img.src = chrome.runtime.getURL('pipIcon.png');
  } else {
    video.requestPictureInPicture();
        img.src = chrome.runtime.getURL('pipExitIcon.png');
  }
    });

        button.addEventListener("mouseenter", () => {
        button.style.background = 'rgba(49, 49, 49, 0.2)';
    });
    button.addEventListener("mouseleave", () => {
        button.style.background = 'var(--yt-spec-overlay-background-medium-light,rgba(0,0,0,.3))';
    });
}



// Initialize buttons on page load
initButtons();

document.addEventListener(
    'yt-navigate-finish',
    initButtons
);