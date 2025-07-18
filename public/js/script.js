//데스크탑 필터 아래로 펼치기
var bDisplay = true;
function doDisplay(){
    var con = document.getElementById("myDIV");
    if(con.style.display ==='none'){
        con.style.display = 'block';
    }else{
        con.style.display = 'none';
    }
}

// 모바일 에서 검색 레이어 보이기
var searchDisplay = true;
function dooDisplay() {
    var con = document.getElementById("searchDIV");
    if(con.style.display ==='none'){
        con.style.display = 'block';
    }else{
        con.style.display = 'none';
    }
}

//아래로 스크롤시 필터버튼 보이기
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("bottom-btn").style.bottom = '16px';
    } else {
        document.getElementById("bottom-btn").style.bottom = '-50px';
    }
}


