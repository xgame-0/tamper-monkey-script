// ==UserScript==
// @name         images predownload
// @license      MIT
// @namespace    https://github.com/xgame-0/tamper-monkey-script
// @version      2024-11-19
// @description  predownload the images in web
// @author       xgame-0
// @match        *://aman5.com/*
// @match        *://aman5.org/*
// @match        *://aman7.com/*
// @match        *://aman7.org/*
// @match        *://hmjidi.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

'use strict';

let CONFIGS = [{
    host: ['aman5.com', 'aman5.org', 'aman7.com', 'aman7.org'],
    attr: 'data-original',
}, {
    host: ['hmjidi.com'],
    attr: 'data-src',
}]

function checkConfigHost(cfgHost) {
    if (Array.isArray(cfgHost)) {
        for (let i in cfgHost) {
            if (checkConfigHost(cfgHost[i])) {
                return true;
            }
        }
        return false
    }

    let host = window.location.host;
    return cfgHost && host.indexOf(cfgHost) >= 0
}

function getConfig() {
    'use strict';

    let res = [];
    for (let i in CONFIGS) {
        let cfg = CONFIGS[i];
        if (checkConfigHost(cfg.host)) {
            res.push(cfg)
        }
    }
    return res;
}

function predownloadImage(attrName) {
    'use strict';

    let l = document.querySelectorAll('img');
    // console.log('images:', l);
    l = l || [];
    l.forEach((e) => {
        // console.log('image:', e);
        let attrValue = e.getAttribute(attrName);
        // console.log('attr:', attrValue);
        if (!attrValue) {
            return;
        }
        window.setTimeout(function () {
            let img = new Image();
            img.src = attrValue;
        });
    })
}

function main(ev) {
    console.log('event:', ev);
    let cfgs = getConfig() || [];
    console.log('host:', window.location.host, ', cfgs:', cfgs)

    cfgs.every(cfg => {
        console.log('cfg:', cfg);
        predownloadImage(cfg.attr);
    })
};

// console.log('state:', document.readyState);
if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) >= 0) {
    // console.log('state:', document.readyState);
    main();
}
else {
    window.addEventListener('DOMContentLoaded', main);
    window.addEventListener('load', main);
}
// setTimeout(main, 0);
