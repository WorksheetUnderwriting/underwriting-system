// js/produksi.js
export async function loadProduksiFromSupabase(supabaseClient) {
  try {
    const { data, error } = await supabaseClient.from('tabel_produksi').select('*');
    if (error) throw error;
    
    return (data || []).map(row => ({
      bulan_produksi: row["BULAN PRODUKSI"] || row["bulan_produksi"] || "-",
      kode_produk: row["KODE PRODUK"] || row["kode_produk"] || "-",
      pemegang_polis: row["PEMEGANG POLIS"] || row["pemegang_polis"] || "-",
      keterangan_uw: row["KETERANGAN UW"] || row["keterangan_uw"] || "-",
      produk: row["PRODUK"] || row["produk"] || "-",
      provinsi: row["PROVINSI"] || row["provinsi"] || "-",
      sebaran_peserta: row["SEBARAN PESERTA"] || row["sebaran_peserta"] || "-",
      range_up: row["RANGE UANG PERTANGGUNGAN"] || row["range_up"] || "-",
      range_masa: row["range masa asuransi"] || row["range_masa"] || "-",
      count_id_peserta: Number(row["PESERTA"] || row["count_id_peserta"] || 0),
      sum_of_up: Number(row["UANG PERTANGGUNGAN"] || row["sum_of_up"] || 0),
      sum_of_premi: Number(row["PREMI"] || row["sum_of_premi"] || 0)
    }));
  } catch (err) {
    console.error("Gagal memuat data produksi:", err.message);
    return [];
  }
}
