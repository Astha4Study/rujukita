import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateFasilitas() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        type: "",
        address: "",
        city: "",
        latitude: "",
        longitude: "",
        capacity: "",
        available_beds: "",
        specialization: "",
        image: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/facilities", {
            onSuccess: () => reset(),
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
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Contoh: RS Harapan Sehat"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Jenis */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jenis Fasilitas
                        </label>
                        <select
                            name="type"
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">-- Pilih Jenis --</option>
                            <option value="RSU">Rumah Sakit Umum</option>
                            <option value="Klinik">Klinik</option>
                            <option value="Puskesmas">Puskesmas</option>
                            <option value="RS Rujukan">Rumah Sakit Rujukan</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                        )}
                    </div>

                    {/* Alamat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Jl. Sudirman No. 10"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* Kota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kota
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Yogyakarta"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
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
                                Kapasitas
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={data.capacity}
                                onChange={(e) => setData("capacity", e.target.value)}
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
                                name="available_beds"
                                value={data.available_beds}
                                onChange={(e) => setData("available_beds", e.target.value)}
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
                            name="specialization"
                            value={data.specialization}
                            onChange={(e) => setData("specialization", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Contoh: Bedah Umum, Anak"
                        />
                    </div>

                    {/* Gambar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            URL Gambar
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={data.image}
                            onChange={(e) => setData("image", e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="https://example.com/image.jpg"
                        />
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
