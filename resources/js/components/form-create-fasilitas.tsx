import { Link } from '@inertiajs/react';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    BedDouble,
    Globe2,
    Image as ImageIcon,
} from 'lucide-react';
import React, { useState } from 'react';

interface FormCreateFasilitasProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    processing: boolean;
}

const FormCreateFasilitas: React.FC<FormCreateFasilitasProps> = ({
    data,
    setData,
    handleSubmit,
    handleChangeFile,
    processing,
}) => {
    const [errors, setErrors] = useState<{ no_telepon?: string }>({});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!data.no_telepon.trim()) {
            setErrors({ no_telepon: 'Nomor telepon wajib diisi.' });
            return;
        }
        setErrors({});
        handleSubmit(e);
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
        >
            {/* Nama Fasilitas */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Nama Fasilitas <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.nama_fasilitas}
                    onChange={(e) => setData('nama_fasilitas', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    placeholder="Contoh: RSUD Amarta"
                />
            </div>

            {/* Jenis Fasilitas */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Jenis Fasilitas
                </label>
                <select
                    value={data.jenis_fasilitas}
                    onChange={(e) => setData('jenis_fasilitas', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                >
                    <option value="">Pilih Jenis Fasilitas</option>
                    <option value="Rumah Sakit Umum">Rumah Sakit Umum</option>
                    <option value="Klinik">Klinik</option>
                    <option value="Puskesmas">Puskesmas</option>
                    <option value="Dokter Mandiri">Dokter Mandiri</option>
                </select>
            </div>

            {/* Alamat */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Alamat <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    placeholder="Masukkan alamat lengkap"
                />
            </div>

            {/* Kota & Provinsi */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Kota"
                    value={data.kota}
                    onChange={(e) => setData('kota', e.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                />
                <input
                    type="text"
                    placeholder="Provinsi"
                    value={data.provinsi}
                    onChange={(e) => setData('provinsi', e.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                />
            </div>

            {/* Telepon & Email */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-emerald-600" /> Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.no_telepon}
                        onChange={(e) => setData('no_telepon', e.target.value)}
                        className={`w-full rounded-lg border ${errors.no_telepon ? 'border-red-400' : 'border-gray-200'
                            } px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition`}
                        placeholder="+62..."
                    />
                    {errors.no_telepon && (
                        <p className="text-xs text-red-500 mt-1">{errors.no_telepon}</p>
                    )}
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-emerald-600" /> Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                        placeholder="example@mail.com"
                    />
                </div>
            </div>

            {/* Spesialisasi */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Spesialisasi
                </label>
                <select
                    value={data.spesialisasi}
                    onChange={(e) => setData('spesialisasi', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                >
                    <option value="">Pilih Spesialisasi</option>
                    <option value="Umum">Umum</option>
                    <option value="Anak">Anak</option>
                    <option value="Kandungan">Kandungan</option>
                    <option value="Bedah">Bedah</option>
                    <option value="Gigi">Gigi</option>
                    <option value="Mata">Mata</option>
                    <option value="Jantung">Jantung</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>

            {/* Kapasitas */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-emerald-600" />
                        Kapasitas Total
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_total}
                        onChange={(e) =>
                            setData('kapasitas_total', Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                        placeholder="100"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Tempat Tersedia
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_tersedia}
                        onChange={(e) =>
                            setData('kapasitas_tersedia', Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                        placeholder="80"
                    />
                </div>
            </div>

            {/* Koordinat */}
            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-600" />
                    Koordinat Lokasi
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={data.latitude}
                        onChange={(e) => setData('latitude', e.target.value)}
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={data.longitude}
                        onChange={(e) => setData('longitude', e.target.value)}
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                </div>
            </div>

            {/* Deskripsi */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                </label>
                <textarea
                    value={data.deskripsi}
                    onChange={(e) => setData("deskripsi", e.target.value)}
                    rows={4}
                    placeholder="Tuliskan deskripsi singkat tentang fasilitas..."
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm w-full focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                ></textarea>
            </div>

            {/* Gambar */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 text-emerald-600" /> Gambar
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeFile}
                    className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                />
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <Link
                    href="/perawat/fasilitas"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateFasilitas;
