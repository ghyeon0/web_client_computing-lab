// 1초 후에
setTimeout(function () {
    console.log("1초가 지났습니다.");
}, 1000);
// 1초마다
k = setInterval(function () {
    console.log("1초 마다 호출됩니다.");
}, 1000);

setTimeout(function () {
    console.log("10초가 지났습니다.");
    clearInterval(k);
}, 10100);