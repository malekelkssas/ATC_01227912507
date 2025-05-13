import fs from 'fs';
import path from 'path';



export const ensureUploadDir = (uploadPath: string): void => {
    const fullPath = path.join(process.cwd(), uploadPath);
    
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created upload directory: ${fullPath}`);
    }
};