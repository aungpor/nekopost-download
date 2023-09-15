const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL ของไฟล์ JPG ที่คุณต้องการดาวน์โหลด
// const imageUrl = 'https://www.osemocphoto.com/collectManga/13023/138495/138495_20230710005002_1.jpg';

const jsonFilePath = path.join(__dirname, 'nekopost-test.json');

fs.readFile(jsonFilePath, 'utf8', (error, data) => {
  if (error) {
    console.error('เกิดข้อผิดพลาดในการอ่านไฟล์ JSON:', error);
    return;
  }

  // แปลงข้อมูล JSON เป็นอ็อบเจ็กต์ JavaScript
  const jsonData = JSON.parse(data);

  // เรียกดูข้อมูล JSON
  console.log('projectId:', jsonData.projectId);
  console.log('chapterId:', jsonData.chapterId);
  console.log('pageCount:', jsonData.pageItem.length);

  const projectId = jsonData.projectId
  const chapterId = jsonData.chapterId
  const pageCount = jsonData.pageItem

  for (const pageCountObj of pageCount) {
    const imageUrl = `https://www.osemocphoto.com/collectManga/${projectId}/${chapterId}/${pageCountObj.fileName}`

    // ระบุชื่อไฟล์ที่คุณต้องการบันทึก
    const fileName = `${pageCountObj.pageNo}.jpg`

    // ระบุโฟลเดอร์ที่คุณต้องการบันทึกไฟล์
    const downloadFolder = 'download-Images';

    if (!fs.existsSync(downloadFolder)) {
      fs.mkdirSync(downloadFolder);
    }

    const filePath = path.join(downloadFolder, fileName);

    axios.get(imageUrl, { responseType: 'stream' })
      .then(response => {
        const fileStream = fs.createWriteStream(filePath);

        response.data.pipe(fileStream);

        fileStream.on('finish', () => {
          console.log(`ไฟล์ถูกดาวน์โหลดและบันทึกที่ ${filePath}`);
        });
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์', error);
      });
  }
});