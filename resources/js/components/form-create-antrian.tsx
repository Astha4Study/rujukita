import { Link } from '@inertiajs/react';
import React from 'react';

interface Pasien {
    id: number;
    nama_lengkap: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    jenis_kelamin: string;
    umur: number;
}

interface Dokter {
    id: number;
    name: string;
}

interface FormCreateAntrianProps {
    pasien: Pasien;
    dokter: Dokter[];
    data: {
        pasien_id: number;
        dokter_id: string;
        spesialis: string;
        keluhan: string;
        tanggal_kunjungan: string;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
}

const FormCreateAntrian: React.FC<FormCreateAntrianProps> = ({
    pasien,
    dokter,
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}) => {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Info Pasien */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Pasien
                        </label>
                        <input
                            type="text"
                            value={pasien.nama_lengkap}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Golongan Darah
                        </label>
                        <input
                            type="text"
                            value={pasien.golongan_darah}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Riwayat Penyakit
                        </label>
                        <input
                            type="text"
                            value={pasien.riwayat_penyakit}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Alergi
                        </label>
                        <input
                            type="text"
                            value={pasien.alergi}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jenis Kelamin
                        </label>
                        <input
                            type="text"
                            value={
                                pasien.jenis_kelamin === 'L'
                                    ? 'Laki-laki'
                                    : 'Perempuan'
                            }
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Umur Pasien
                        </label>
                        <input
                            type="text"
                            value={pasien.umur + ' Tahun'}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                        />
                    </div>

                    {/* Pilih Dokter */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pilih Dokter <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="dokter_id"
                            value={data.dokter_id}
                            onChange={(e) =>
                                setData('dokter_id', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="">-- Pilih Dokter --</option>
                            {dokter.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                        {errors.dokter_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.dokter_id}
                            </p>
                        )}
                    </div>

                    {/* Spesialis */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Spesialis <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="spesialis"
                            value={data.spesialis}
                            onChange={(e) =>
                                setData('spesialis', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="">-- Pilih Spesialis --</option>
                            {[
                                'Umum',
                                'Anak',
                                'Kandungan',
                                'Bedah',
                                'Gigi',
                                'Mata',
                                'Jantung',
                                'Kulit',
                                'Saraf',
                                'Lainnya',
                            ].map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {errors.spesialis && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.spesialis}
                            </p>
                        )}
                    </div>

                    {/* Tanggal Kunjungan */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tanggal Kunjungan{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="tanggal_kunjungan"
                            value={data.tanggal_kunjungan}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm"
                        />
                        {errors.tanggal_kunjungan && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.tanggal_kunjungan}
                            </p>
                        )}
                    </div>

                    {/* Keluhan */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Keluhan
                        </label>
                        <textarea
                            name="keluhan"
                            value={data.keluhan}
                            onChange={(e) => setData('keluhan', e.target.value)}
                            rows={3}
                            placeholder="Tuliskan keluhan pasien..."
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.keluhan && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.keluhan}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Link
                    href="/resepsionis/antrian"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Antrian'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateAntrian;
