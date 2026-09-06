// js/underwriting.js
export const produkIndividu = [
  "Asuransi HEKSA Rencana", "Asuransi HEKSA Rencana Prima", "Asuransi HEKSA Abadi", 
  "Asuransi HEKSA Anuitas Prima", "Asuransi HEKSA Anuitas Prioritas", "Asuransi Mikro Perisai Diri Extra", 
  "Asuransi HEKSA Proteksi Plus", "Asuransi HEKSA Aktif Plus", "Asuransi Jiwa HEKSA Rencana Aman"
];

export const produkKumpulan = [
  "Asuransi HEKSA Jiwa Kredit", "AJK Cicilan Bulanan", "Asuransi HEKSA Ekawarsa Plus", "Asuransi Kecelakaan Diri (Personal Accident)"
];

export function formatNumberInput(val) {
  if (val === undefined || val === null || val === "") return "";
  let cleanStr = String(val).replace(/[^0-9]/g, "");
  if (!cleanStr) return "";
  return parseInt(cleanStr, 10).toLocaleString("id-ID");
}

export function getUnformattedNumber(val) {
  if (!val) return 0;
  let cleanStr = String(val).replace(/[^0-9]/g, "");
  return parseInt(cleanStr, 10) || 0;
}

export function calculateAgeFromDOB(dobVal) {
  if (!dobVal) return 0;
  const dob = new Date(dobVal);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age > 0 ? age : 0;
}
