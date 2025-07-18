var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COOC' });
});
router.get('/explore', function(req, res, next) {
  res.render('explore/explore-list', { title: 'Explore Collections' });
});
router.get('/explore/collection-items', function(req, res, next) {
  res.render('explore/collection-items', { title: 'Collections - items' });
});
router.get('/explore/collection-activity', function(req, res, next) {
  res.render('explore/collection-activity', { title: 'Collections - activity ' });
});

/* ADMIN. */
router.get('/admin/login', function(req, res, next) {
  res.render('admin/login/index', { title: '관리자 - 로그인' });
});
router.get('/admin', function(req, res, next) {
  res.render('admin/index', { title: '관리자' });
});
router.get('/admin/order', function(req, res, next) {
  res.render('admin/order/index', { title: '관리자 - 주문배송' });
});
router.get('/admin/goods', function(req, res, next) {
  res.render('admin/goods/index', { title: '관리자 - 상품관리 ' });
});
router.get('/admin/goods/write', function(req, res, next) {
  res.render('admin/goods/write', { title: '관리자 - 상품등록 ' });
});
router.get('/admin/member', function(req, res, next) {
  res.render('admin/member/index', { title: '관리자 - 고객 및 문의관리 ' });
});
router.get('/admin/design', function(req, res, next) {
  res.render('admin/design/index', { title: '관리자 - 디자인 및 팝업관리' });
});
router.get('/admin/board', function(req, res, next) {
  res.render('admin/board/index', { title: '관리자 - 게시판 ' });
});
router.get('/admin/basic', function(req, res, next) {
  res.render('admin/basic/index', { title: '관리자 - 환경설정 ' });
});
router.get('/admin/style', function(req, res, next) {
  res.render('admin/style/index', { title: '관리자 - 스타일가이드 ' });
});

module.exports = router;
