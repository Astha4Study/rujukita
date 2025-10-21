import { Link } from '@inertiajs/react';
import { Building2, MapPin, Phone, Mail, BedDouble, } from 'lucide-react';
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
            className="col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
        >
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Nama Fasilitas
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.nama_fasilitas}
                    onChange={(e) => setData('nama_fasilitas', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                    placeholder="Masukkan Nama fasilitas"
                />
                {errors.nama_fasilitas && (
                    <p className="text-xs text-red-500 mt-1">{errors.nama_fasilitas}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Fasilitas</label>
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

            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Alamat
                </label>
                <input
                    type="text"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    placeholder="Alamat lengkap"
                />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 text-emerald-600" /> No Telepon
                    </label>
                    <input
                        type="text"
                        value={data.no_telepon}
                        onChange={(e) => setData('no_telepon', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 text-emerald-600" /> Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <BedDouble className="w-4 h-4 text-emerald-600" /> Kapasitas Total
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_total}
                        onChange={(e) => setData('kapasitas_total', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        Tempat Tersedia
                    </label>
                    <input
                        type="number"
                        value={data.kapasitas_tersedia}
                        onChange={(e) => setData('kapasitas_tersedia', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Gambar (opsional)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeFile}
                    className="block w-full rounded-lg border border-gray-200 text-sm text-gray-500 file:bg-emerald-50 file:text-emerald-700 file:px-4 file:py-2 file:rounded-lg"
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
                    className={`rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 ${processing ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
};

export default FormEditFasilitas;
