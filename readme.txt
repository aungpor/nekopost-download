node ./service/downloadImage.js
node ./service/downloadImage-v2.js
node ./service/testUrl.js
node ./service/changeFileName.js
node ./service/changeImageName.js
node ./service/allVolumes.js

การใช้งานคือการเอา object จาก api แบบ JSON มาใส่ไว้ใน nekopost-test.json
จากนั้นเลื่อนหน้าเว็บลงมาล่างสุดให้โหลดภาพทั้งหมดค่อย run คำสั่ง node ./service/downloadImage.js ไม่งั้นจะ error

ctrl+shift+i

npm install fs-extra
