import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, ChangeEvent } from "react";

export default function CreateFasilitas() {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama_fasilitas: "",
        jenis_fasilitas: "",
        alamat: "",
        kota: "",
        latitude: "",
        longitude: "",
        kapasitas_total: "",
        kapasitas_tersedia: "",
        spesialisasi: "",
        gambar: null as File | null,
    });

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("gambar", e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/fasilitas", {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Tambah Fasilitas" />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Tambah Data Fasilitas
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Fasilitas
                        </label>
                        <input
                            type="text"
                            name="nama_fasilitas"
                            value={data.nama_fasilitas}
                            onChange={(e) => setData("nama_fasilitas", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Contoh: RS Harapan Sehat"
                        />
                        {errors.nama_fasilitas && (
                            <p className="text-red-500 text-sm mt-1">{errors.nama_fasilitas}</p>
                        )}
                    </div>

                    {/* Jenis */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jenis Fasilitas
                        </label>
                        <select
                            name="jenis_fasilitas"
                            value={data.jenis_fasilitas}
                            onChange={(e) => setData("jenis_fasilitas", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">-- Pilih Jenis --</option>
                            <option value="Rumah Sakit Umum">Rumah Sakit Umum</option>
                            <option value="Klinik">Klinik</option>
                            <option value="Puskesmas">Puskesmas</option>
                            <option value="Dokter Mandiri">Dokter Mandiri</option>
                        </select>
                        {errors.jenis_fasilitas && (
                            <p className="text-red-500 text-sm mt-1">{errors.jenis_fasilitas}</p>
                        )}
                    </div>

                    {/* Alamat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <input
                            type="text"
                            name="alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Jl. Sudirman No. 10"
                        />
                        {errors.alamat && (
                            <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                        )}
                    </div>

                    {/* Kota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kota
                        </label>
                        <input
                            type="text"
                            name="kota"
                            value={data.kota}
                            onChange={(e) => setData("kota", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Yogyakarta"
                        />
                        {errors.kota && (
                            <p className="text-red-500 text-sm mt-1">{errors.kota}</p>
                        )}
                    </div>

                    {/* Latitude & Longitude */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Latitude
                            </label>
                            <input
                                type="text"
                                name="latitude"
                                value={data.latitude}
                                onChange={(e) => setData("latitude", e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="-7.797068"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Longitude
                            </label>
                            <input
                                type="text"
                                name="longitude"
                                value={data.longitude}
                                onChange={(e) => setData("longitude", e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="110.370529"
                            />
                        </div>
                    </div>

                    {/* Kapasitas dan Tempat Tersedia */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kapasitas Total
                            </label>
                            <input
                                type="number"
                                name="kapasitas_total"
                                value={data.kapasitas_total}
                                onChange={(e) => setData("kapasitas_total", e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tempat Tidur Tersedia
                            </label>
                            <input
                                type="number"
                                name="kapasitas_tersedia"
                                value={data.kapasitas_tersedia}
                                onChange={(e) => setData("kapasitas_tersedia", e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="80"
                            />
                        </div>
                    </div>

                    {/* Spesialisasi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Spesialisasi
                        </label>
                        <input
                            type="text"
                            name="spesialisasi"
                            value={data.spesialisasi}
                            onChange={(e) => setData("spesialisasi", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Contoh: Bedah Umum, Anak"
                        />
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gambar (jpg, png, webp, max 4MB)
                        </label>
                        <input
                            type="file"
                            name="gambar"
                            accept="image/*"
                            onChange={handleChangeFile}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.gambar && (
                            <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>
                        )}
                    </div>

                    {/* Tombol */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
