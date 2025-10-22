import { Link } from '@inertiajs/react';
import {
    BedDouble,
    Building2,
    Globe2,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';
import React from 'react';

interface FormEditFasilitasProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    processing: boolean;
    errors?: Record<string, string>;
}

const FormEditFasilitas: React.FC<FormEditFasilitasProps> = ({
    data,
    setData,
    handleSubmit,
    handleChangeFile,
    processing,
    errors = {},
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="col-span-2 space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    Nama Fasilitas
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.nama_fasilitas}
                    onChange={(e) => setData('nama_fasilitas', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Masukkan Nama fasilitas"
                />
                {errors.nama_fasilitas && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.nama_fasilitas}
                    </p>
                )}
            </div>

            {/* Jenis Fasilitas */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Fasilitas <span className="text-red-500">*</span>
                </label>
                <select
                    value={data.jenis_fasilitas}
                    onChange={(e) => setData('jenis_fasilitas', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
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
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="h-4 w-4 text-emerald-600" /> Alamat{' '}
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    placeholder="Alamat lengkap"
                />
            </div>

            {/* Kota & Provinsi */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    value={data.kota}
                    onChange={(e) => setData('kota', e.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    placeholder="Kota"
                />
                <input
                    type="text"
                    value={data.provinsi}
                    onChange={(e) => setData('provinsi', e.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    placeholder="Provinsi"
                />
            </div>

            {/* Telepon & Email */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.no_telepon}
                        onChange={(e) => setData('no_telepon', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Mail className="h-4 w-4 text-emerald-600" /> Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
            </div>

            {/* Spesialisasi */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Spesialisasi <span className="text-red-500">*</span>
                </label>
                <select
                    value={data.spesialisasi}
                    onChange={(e) => setData('spesialisasi', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <BedDouble className="h-4 w-4 text-emerald-600" />{' '}
                        Kapasitas Total <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_total}
                        onChange={(e) =>
                            setData('kapasitas_total', Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                        Tempat Tersedia <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_tersedia}
                        onChange={(e) =>
                            setData(
                                'kapasitas_tersedia',
                                Number(e.target.value) || 0,
                            )
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
            </div>

            {/* Koordinat */}
            <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Globe2 className="h-4 w-4 text-emerald-600" />
                    Koordinat Lokasi <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={data.latitude}
                        onChange={(e) => setData('latitude', e.target.value)}
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={data.longitude}
                        onChange={(e) => setData('longitude', e.target.value)}
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
            </div>

            {/* Deskripsi */}
            <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                    rows={4}
                    placeholder="Tuliskan deskripsi singkat tentang fasilitas..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            {/* Gambar */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gambar
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeFile}
                    className="block w-full rounded-lg border border-gray-200 text-sm text-gray-500 file:rounded-lg file:bg-emerald-50 file:px-4 file:py-2 file:text-emerald-700"
                />
            </div>

            <div className="mt-4 flex justify-end gap-3">
                <Link
                    href="/resepsionis/fasilitas"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className={`rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 ${
                        processing ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
};

export default FormEditFasilitas;
