// js/buku-polis.js
export async function generateAutoNoPolis(supabaseClient, currentYear, existingList) {
  const now = new Date();
  const year = currentYear || now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `K.${year}.${month}.`;

  let nextNum = 1;
  try {
    const { data, error } = await supabaseClient
      .from("buku_polis")
      .select("no_polis")
      .ilike("no_polis", `${prefix}%`)
      .order("no_polis", { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      const lastNoPolis = data[0].no_polis;
      const parts = lastNoPolis.split(".");
      const parsedNum = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(parsedNum)) nextNum = parsedNum + 1;
    }
  } catch (err) {
    if (existingList && existingList.length > 0) {
      const currentMonthEntries = existingList.filter(bp => bp.noPolis && bp.noPolis.startsWith(prefix));
      if (currentMonthEntries.length > 0) {
        const lastNumbers = currentMonthEntries.map(bp => {
          const parts = bp.noPolis.split(".");
          return parseInt(parts[parts.length - 1], 10) || 0;
        });
        nextNum = Math.max(...lastNumbers) + 1;
      }
    }
  }
  return `${prefix}${String(nextNum).padStart(4, "0")}`;
}

export function calculateBPProgress(checklistItems) {
  let checkedCount = 0;
  checklistItems.forEach(item => { if (item.checked) checkedCount++; });
  return Math.round((checkedCount / checklistItems.length) * 100);
}
