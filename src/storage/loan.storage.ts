// Old JSON storage layer (replaced by Prisma + SQLite) ---

// import { Loan } from '../types/loan.type';
// import { loadJson, saveJson } from './json-storage';
//
// function parseLoans(raw: any[]): Loan[] {
//   return raw.map((loan) => ({
//     ...loan,
//     loanDate: new Date(loan.loanDate),
//     returnDate: loan.returnDate ? new Date(loan.returnDate) : null,
//   }));
// }
//
// export const LOANS: Loan[] = parseLoans(loadJson('loans.json'));
//
// export function saveLoans(): void {
//   saveJson('loans.json', LOANS);
// }
