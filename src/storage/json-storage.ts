// Old JSON storage layer (replaced by Prisma + SQLite)

// import fs from 'fs';
// import path from 'path';
//
// const DATA_DIR = path.join(__dirname, '../../data');
//
// export function loadJson<T>(filename: string): T[] {
//   const filePath = path.join(DATA_DIR, filename);
//   if (!fs.existsSync(filePath)) return [];
//   const content = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(content);
// }
//
// export function saveJson<T>(filename: string, data: T[]): void {
//   fs.mkdirSync(DATA_DIR, { recursive: true });
//   const filePath = path.join(DATA_DIR, filename);
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
// }
