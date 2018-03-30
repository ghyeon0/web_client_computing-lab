function checkID(id) {
    if (id[7] * 1 >= 5){
        alert("Error: 주민등록번호의 형식이 올바르지 않습니다.");
    }else{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        let year = id[0] + id[1];
        if (year * 1 < 18){
            year = '20' + year;
        }else{
            year = '19' + year;
        }
        year *= 1;
        let month = id[2] + id[3]; month *= 1;
        let day = id[4] + id[5]; day *= 1;
        let age = yyyy - year;
        if (mm - month < 0){
            age -= 1;
        }
        else if(mm - month == 0){
            if (dd - day < 0){
                age -= 1;
            }
        }
        // 주민등록번호 기반 성별 결정
        let gender = (id[7] * 1 % 2 == 1 ? "남성" : "여성");

        // 체크박스 기반 성별 결정
        // let check = document.getElementsByName("chk_info")[0].checked ? "m" : "f";
        // let gender = (check == "m" ? "남성" : "여성");
        alert("만 " + age + "살 " + gender);
    }
}
