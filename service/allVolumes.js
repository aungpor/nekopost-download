const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const rootDirectory = './change-name'; // Replace with the root directory you want to scan

const folderArray = []

// Read the contents of the root directory
fs.readdir(rootDirectory, (err, files) => {
    if (err) {
        console.error(`Error reading directory ${rootDirectory}: ${err}`);
        return;
    }

    // Filter the list to include only directories (folders)
    const subdirectories = files.filter((file) => {
        const filePath = path.join(rootDirectory, file);
        return fs.statSync(filePath).isDirectory();
    });

    // Print the list of subdirectories
    console.log('Subdirectories one layer deep in the root directory:');
    subdirectories.forEach((subdirectory) => {
        // console.log(path.join(rootDirectory, subdirectory));
        folderArray.push(subdirectory)
    });
    console.log(folderArray);

    folderArray.map((item) => {
        const folderPath = './change-name/' + item;
        const oldName = ""
        const newName = item; // ชื่อที่คุณต้องการให้ไฟล์ PDF ใหม่มี

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

        console.log('เปลี่ยนชื่อไฟล์ jpg เรียบร้อยแล้ว');
    })

    const newFolderName = 'รวมเล่ม'; // เปลี่ยนเป็นชื่อโฟลเดอร์ที่คุณต้องการ
    const newPath = `./change-name/${newFolderName}`;

    // ตรวจสอบว่าโฟลเดอร์นี้มีอยู่หรือไม่ และสร้างในกรณีที่ยังไม่มี
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
        console.log("active");
    }

    folderArray.map((item) => {
        if (item != 'รวมเล่ม') {
            const sourceFilePath = './change-name/' + item; // ระบุเส้นทางไปยังไฟล์ที่คุณต้องการคัดลอก
            const destinationFilePath = './change-name/รวมเล่ม'; // เปลี่ยนเป็นชื่อไฟล์ที่คุณต้องการให้ไฟล์ใหม่

            try {
                fse.copySync(sourceFilePath, destinationFilePath);
                console.log('ไฟล์ถูกคัดลอกไปยังโฟลเดอร์ใหม่แล้ว');
            } catch (err) {
                console.error('เกิดข้อผิดพลาดในการคัดลอกไฟล์:', err);
            }
        }


    })
});

