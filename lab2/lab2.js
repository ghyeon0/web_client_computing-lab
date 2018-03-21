// (lab2-1) 시간(Date객체, getMonth), 문자열처리 메소드(indexOf, substring), if-else문, 함수
console.log("\n==============================================================================\n(lab2-1) 시간(Date객체), 문자열메소드(indexOf, substring), if-else문, 함수\n==============================================================================\n");
date = new Date();
now = date.getMonth() + 1;

myBirth = "1998년 12월 24일";
myBirth2 = "1998년 1월 1일";
myBirth3 = "1998년 7월 10일";
myBirth4 = "1998년 3월 25일";
// myBirth5 = "1997년 2월 20일";
greeting(myBirth);
greeting(myBirth2);
greeting(myBirth3);
greeting(myBirth4);
// greeting(myBirth5);

function greeting(myBirth) {
    let strArray = myBirth.split(" ");
    let month = parseInt(strArray[1]);
    console.log("---");
    console.log("내 생일은", myBirth, "입니다.");
    console.log("내 생월은", month + "월입니다.");
    let buf = month - now;
    if (buf > 0){
        console.log(buf + "개월이 남았군요. 추카추카!!!\n");
    }else if (buf == 0){
        console.log("이번달이 생일이군요. 추카추카!!!\n")
    }else{
        console.log("올해 생일이 %d개월 지났네요.\n", -buf);
    }    
}

// (lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)
console.log("\n==============================================================================\n(lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)\n==============================================================================\n");

var x = 0;
m = "x(=1,2,3,...,10)의 제곱값을 1초 단위로 출력합니다.";
m2 = "타이머를 정지합니다."
m3 = "x(=1,2,3,...,10)의 세제곱값을 1초 단위로 출력합니다.";

function math(msg, msg2, callback, callback2) {
    let id = setInterval(function () {
        callback(msg);
    }, 1000);
    setTimeout(function () {
        callback2(id, msg2);
    }, 10100);
}

function start(msg) {
    if(x==0) {console.log(""); console.log("-----"); console.log(msg);}
    x += 1;
    console.log(x * x);
}

function clear(t, epilog) {
    clearInterval(t);
    console.log(epilog);
}

// x(=1,2,3,...,10)의 제곱값을 1초 단위로 출력
math(m, m2, start, clear);

let start_second = function (msg) {
    if(x==0) {console.log(""); console.log("====="); console.log(msg);}
    x += 1;
    console.log(x * x * x);
}; 

// x(=1,2,3,...,10)의 세제곱값을 1초 단위로 출력
setTimeout(
  function(){
      x = 0;
      math(m3, m2, start_second, clear);

      // (lab2-2) 구현위치
      //   math()를 호출하되 3번인수에 start() 내용을 수정하여
      //   3승을 계산하는 익명함수 형태로 작성, 호출할 것.

  }, 10100);
