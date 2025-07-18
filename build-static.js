const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 출력 디렉토리 생성
const outputDir = './dist';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// public 폴더 복사
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// public 폴더를 dist로 복사
copyRecursiveSync('./public', outputDir);

// EJS 템플릿을 HTML로 변환
const pages = [
  { path: '/', template: 'views/index.ejs', title: 'COOC' },
  { path: '/explore', template: 'views/explore/explore-list.ejs', title: 'Explore Collections' },
  { path: '/explore/collection-items', template: 'views/explore/collection-items.ejs', title: 'Collections - items' },
  { path: '/admin', template: 'views/admin/index.ejs', title: '관리자' },
  { path: '/admin/login', template: 'views/admin/login/index.ejs', title: '관리자 - 로그인' }
];

pages.forEach(page => {
  try {
    if (fs.existsSync(page.template)) {
      const html = ejs.renderFile(page.template, { title: page.title }, (err, str) => {
        if (err) {
          console.log(`Error rendering ${page.template}:`, err.message);
          return;
        }
        
        // 파일 경로 생성
        const filePath = page.path === '/' ? '/index.html' : `${page.path}/index.html`;
        const fullPath = path.join(outputDir, filePath);
        const dir = path.dirname(fullPath);
        
        // 디렉토리 생성
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // HTML 파일 저장
        fs.writeFileSync(fullPath, str);
        console.log(`✅ Generated: ${filePath}`);
      });
    }
  } catch (error) {
    console.log(`❌ Error processing ${page.template}:`, error.message);
  }
});

console.log('🎉 Static build completed! Upload the "dist" folder to Netlify.'); 