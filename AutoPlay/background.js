/*
 * @Author: your name
 * @Date: 2021-08-08 23:43:07
 * @LastEditTime: 2021-08-09 01:46:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chromeExtentionDemo/background.js
 */

// chrome.tabs.onActivated.addListener(activeInfo => {
//     console.log(activeInfo);
// });

// chrome.tabs.getSelected(null, function (tab) {
//     console.log(tab.url);
// });


async function getCurrentTab(tabId) {

    let tab = await chrome.tabs.get(tabId);
    return tab;
}


chrome.tabs.onActivated.addListener(async activeInfo => {

    let tabInfo = await getCurrentTab(activeInfo.tabId)

    let currentPageUrl = tabInfo.url;

    let urlReg = /https:\/\/www.bjjnts.cn\/*/i;

    if (urlReg.test(currentPageUrl)) {
        chrome.action.setBadgeText({ text: 'Hit' });
        chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
});






