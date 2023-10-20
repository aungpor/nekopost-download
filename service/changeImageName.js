const fs = require('fs');
const path = require('path');

const folderPath = './change-name';
const oldName = "ch1 ch"
const newName = 'ch1'; // ชื่อที่คุณต้องการให้ไฟล์ PDF ใหม่มี

// หากคุณต้องการแนะนำไฟล์ PDF ใหม่ด้วยเลข 1, 2, 3, ...
let fileCounter = 1;

fs.readdirSync(folderPath).forEach((file) => {
    if (path.extname(file).toLowerCase() === '.jpg') {
        const fileChapter = file.replace(oldName, '');

      const oldFilePath = path.join(folderPath, file);
      const newFileName = `${newName} ${fileChapter}`;
      const newFilePath = path.join(folderPath, newFileName);
  
      // เปลี่ยนชื่อไฟล์
      fs.renameSync(oldFilePath, newFilePath);
  
      fileCounter++;
    }
  });

  console.log('เปลี่ยนชื่อไฟล์ PDF เรียบร้อยแล้ว');
