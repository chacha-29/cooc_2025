const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('../../routes/index');
const usersRouter = require('../../routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
//20220520 추가 - html변환
app.engine("html", require("ejs").renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 정적 파일 경로 설정 (Netlify에서는 public 폴더가 루트에서 서빙됨)
app.use(express.static(path.join(__dirname, '../../public')));

// 기존 라우터들을 그대로 사용
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  // Netlify Functions에서는 views 디렉토리에 접근할 수 없으므로 JSON 응답 반환
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  } else {
    // 간단한 HTML 응답 반환
    res.send(`
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>${err.message}</h1>
          <h2>${err.status || 500}</h2>
          ${req.app.get('env') === 'development' ? `<pre>${err.stack}</pre>` : ''}
        </body>
      </html>
    `);
  }
});

module.exports.handler = serverless(app); 