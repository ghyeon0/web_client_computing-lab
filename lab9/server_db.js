// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
var _ = require('underscore');
var mysql = require('mysql');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    user: 'root',
    password: 'Wjdwlgus!#123',
    database: 'myinfo'
});

// 변수를 선언합니다.
var schedules;

// 웹 서버를 생성합니다.
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// 라우트합니다.
app.get('/schedule', function (request, response) {
    // 데이터베이스 요청을 수행합니다.
    client.query('SELECT * FROM schedule', function (error, data) {
        response.send(data);
    });
});

app.all('/schedule/get', function (request, response) {
    // 변수를 선언합니다.
    var output = null;

    client.query('SELECT * FROM schedule', function (error, data) {
    //   console.log(data);
      data = JSON.parse(JSON.stringify(data));
        schedules = data;
        // console.log(schedules);
        // console.log(schedules.length);

    // 요청 매개 변수 sidx를 처리합니다.
    var sidx = request.param('sidx');
    console.log(sidx)
    if (sidx == '') { sidx = 'id'; } else { sidx = sidx.replace('grid_', ''); }

    // 요청 매개 변수 sord를 처리합니다.
    var sord = request.param('sord');
    output = _.sortBy(schedules, function (item) {
        return item[sidx];
    });
    if (sord == 'desc') { output = output.reverse(); }

    // 요청 매개 변수 _search를 처리합니다.
    var _search = request.param('_search');
    console.log(request.param());
    if (_search == 'true') {
        var searchField = request.param('searchField');
        var searchOper = request.param('searchOper');
        var searchString = request.param('searchString');
        console.log(searchField, searchOper, searchString);
        output = _.filter(output, function (item) {
            // if (searchField == 'id') {
            //     return item.id == Number(searchString);
            // } else {
            //     return item[searchField].indexOf(searchString) != -1;
            // }
            if (searchOper == 'cn'){
                return item[searchField].indexOf(searchString) != -1;
            }
            else if (searchOper == 'bw'){
                return item[searchField].indexOf(searchString) == 0;
            }
            else if (searchOper == 'eq'){
                return item[searchField] == searchString;
            }
            else if (searchOper == 'ne'){
                return item[searchField] != searchString;
            }
            else if (searchOper == 'lt'){
                return item[searchField] < searchString;
            }
            else if (searchOper == 'gt'){
                return item[searchField] > searchString;
            }
            else{
                return item[searchField].indexOf(searchString) == item[searchField].length - searchString.length;
            }
        });
    }

    // 요청 매개 변수 page와 rows를 처리합니다.
    var page = Number(request.param('page'));
    var rows = Number(request.param('rows'));
    var totalRecords = schedules.length;
    var totalPages = Math.ceil(totalRecords / rows);
    var start = rows * page - rows;

    // 응답합니다.
    output = output.slice(start, start + rows)
    response.send({
        page: page,
        total: totalPages,
        records: totalRecords,
        rows: _.map(output, function (item) {
            return {
                id: item.id,
                cell: _.toArray(item)
            };
        })
    });
  });
});

app.post('/schedule/edit', function (request, response) {
    // 요청 매개 변수 oper를 처리합니다.
    console.log('oper' + request.body.oper);
      switch (request.body.oper) {
        case 'add':
            console.log("add");
            // 데이터베이스 요청을 수행합니다.
            client.query('INSERT INTO schedule (value, date, hour, location, phone) VALUES(?,?,?,?,?)', [
                request.body.value, request.body.date, request.body.hour, request.body.location, request.body.phone
            ], function (error, data) {
//                response.send(data);
            });
            break;
        case 'del':
            var id = Number(request.body.id);
            console.log('del: ' + id);
            client.query('DELETE FROM schedule WHERE id=?', [
                id
            ], function (error, data) {
              console.log(error);
//                response.send(data);
            });
            break;
        case 'edit':
            var id = Number(request.body.id);
            var query = 'UPDATE schedule SET '
            // 쿼리를 생성합니다.
            if (request.body.value) query += "value='" + request.body.value + "', ";
            if (request.body.date) query += "date='" + request.body.date + "', ";
            if (request.body.hour) query += "hour='" + request.body.hour + "', ";
            if (request.body.location) query += "location='" + request.body.location + "', ";
            if (request.body.phone) query += "phone='" + request.body.phone + "' ";
            query += "WHERE id = '" + id + "'";
console.log(query);
            // 데이터베이스 요청을 수행합니다.
            client.query(query, function (error, data) {
              console.log(error);
//                response.send(data);
            });

            break;
    }

    // 응답합니다.
    response.send();
});

// 웹 서버를 실행합니다.
http.createServer(app).listen(52275, function () {
    console.log('Server Running at http://127.0.0.1:52275');
});
