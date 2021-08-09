/*
 * @Author: your name
 * @Date: 2021-08-08 16:59:37
 * @LastEditTime: 2021-08-09 00:08:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chromeExtentionDemo/content-script.js
 */


'use strict';


console.log("AutoPlay script runing");

let preHref = location.href;

videoSetInterValStart();

function videoEndCallback() {

    setTimeout(() => {
    
        console.log('触发新旧url对比');
        const curHref = location.href;
    
        if (preHref != curHref) {
            preHref = curHref;

            console.log('重新开始获取标签进行播放');
            videoSetInterValStart();
        }
    }, 3000);
}


function videoSetInterValStart() {
    let needInterval = setInterval(() => {

        let videoEl = document.getElementsByTagName('video')[0];
        
        if (!videoEl) {
            console.log('未获取到video标签');
            return;
        }
        console.log('已获取到video标签,准备播放视频');

        // 视频播放
        videoEl.play();
        console.log('视频开始播放');

        // 监听下一集按钮或者继续按钮的展示
        watchNextShow()


        clearInterval(needInterval)
    }, 1000);
}

function watchNextShow() {
    let nextBtnInterVal = setInterval(() => {
        
        let nextBtn = document.getElementsByClassName('next_button___YGZWZ')[0];
        let continueBtn = document.getElementsByClassName('ant-btn-primary')[0];
        
        
        if (continueBtn) {
            console.log('继续按钮 Show', continueBtn);

            continueBtn.click()
        }
        
        if (nextBtn) {
            console.log('下一集按钮 Show', nextBtn);
            
            nextBtn.click();
            console.log('触发next click');
            
            videoEndCallback();

            clearInterval(nextBtnInterVal);
        }
    }, 5000);
}
