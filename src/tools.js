import fa_comment from "@fortawesome/fontawesome-free/svgs/solid/comment.svg";
import fa_paper_plane from "@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg";
import fa_user_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-user.svg";
import fa_street_view from "@fortawesome/fontawesome-free/svgs/solid/street-view.svg";
import fa_camera_retro from "@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg";
import fa_info_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-info.svg";
import fa_xmark from "@fortawesome/fontawesome-free/svgs/solid/xmark.svg";

import showMessage from "./message.js";



let isShowingMessage = false; // 變數更改 控制消息是否已經顯示中 等待延遲顯示 顯示會轉true 顯示過後才會轉換回false

function showHitokoto() {

    // 如果消息正在显示中為true，则不會馬上执行下一個fetch的代碼 false才下跑
    if (isShowingMessage) {
        return;
    }

    // 增加 hitokoto.cn 的 API
    fetch("http://localhost:3000/talks")
        .then(response => response.json())
        .then(result => {

            const randomIndex = Math.floor(Math.random() * result.length); // 随机选择一个索引
            const randomObject = result[randomIndex]; // 选择随机索引对应的对象



            const text = `這句是 <span>${randomObject.from_who}</span>，來自 <span>「${randomObject.from}」</span> 在 HolaCamp露營網 的留言。`;
            showMessage(randomObject.hitokoto, 5000, 9); // 這段文字展示5秒 字體大小9

            isShowingMessage = true; // 标记消息 正在显示中

            setTimeout(() => {
                showMessage(text, 4000, 9);
            }, 5000);
            // 接續上面的展示5秒  5秒後展示這段誰說的  展示4秒  字體大小9

            setTimeout(() => {
                isShowingMessage = false; // 标记消息已经显示完毕  10秒才轉換為可再次使用點擊 進行上面顯示的10秒延遲
            }, 9000);

        });
}

const tools = {
    "hitokoto": {
        icon: fa_comment,
        callback: showHitokoto
    },
    "asteroids": {
        icon: fa_paper_plane,
        callback: () => {
            if (window.Asteroids) {
                if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
                window.ASTEROIDSPLAYERS.push(new Asteroids());
            } else {
                const script = document.createElement("script");
                script.src = "https://fastly.jsdelivr.net/gh/ggg520xx/asteroids/asteroids.js";
                document.head.appendChild(script);
            }
        }
    },
    "switch-model": {
        icon: fa_user_circle,
        callback: () => {}
    },
    "switch-texture": {
        icon: fa_street_view,
        callback: () => {}
    },
    "photo": {
        icon: fa_camera_retro,
        callback: () => {
            showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
            Live2D.captureName = "photo.png";
            Live2D.captureFrame = true;
        }
    },
    "info": {
        icon: fa_info_circle,
        callback: () => {
            open("https://github.com/ggg520xx/live2d-widget");
        }
    },
    "quit": {
        icon: fa_xmark,
        callback: () => {
            localStorage.setItem("waifu-display", Date.now());
            showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
            document.getElementById("waifu").style.bottom = "-500px";
            setTimeout(() => {
                document.getElementById("waifu").style.display = "none";
                document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
            }, 3000);
        }
    }
};

export default tools;
