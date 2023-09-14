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
        const imageUrl = `https://www.osemocphoto.com/collectManga/${projectId}/${chapterId}/${pageCountObj.pageName}`
        console.log(pageCountObj.pageNo);
        console.log(imageUrl);
    }
});