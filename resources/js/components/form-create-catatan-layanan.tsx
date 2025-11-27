import { Link } from '@inertiajs/react';
import React from 'react';

interface FormCreateCatatanLayananProps {
    data: {
        keluhan_utama: string;
        detail_keluhan: string;
        diagnosa: string;
        tindakan: string;
        catatan_lain: string;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
}

const FormCreateCatatanLayanan: React.FC<FormCreateCatatanLayananProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Keluhan Utama (readonly) */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Keluhan Utama
                        </label>
                        <textarea
                            name="keluhan_utama"
                            value={data.keluhan_utama}
                            readOnly
                            rows={3}
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
                            placeholder="Keluhan utama pasien (otomatis dari antrian)"
                        />
                    </div>

                    {/* Detail Keluhan */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Detail Keluhan{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="detail_keluhan"
                            value={data.detail_keluhan}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Jelaskan lebih detail keluhan pasien"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.detail_keluhan && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.detail_keluhan}
                            </p>
                        )}
                    </div>

                    {/* Diagnosa */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Diagnosa <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="diagnosa"
                            value={data.diagnosa}
                            onChange={handleChange}
                            placeholder="Contoh: Gastritis, ISPA, dll"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.diagnosa && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.diagnosa}
                            </p>
                        )}
                    </div>

                    {/* Tindakan */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tindakan <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="tindakan"
                            value={data.tindakan}
                            onChange={handleChange}
                            placeholder="Contoh: Resep obat, Rujuk, Observasi"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.tindakan && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.tindakan}
                            </p>
                        )}
                    </div>

                    {/* Catatan Lain */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Catatan Lain
                        </label>
                        <textarea
                            name="catatan_lain"
                            value={data.catatan_lain}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Catatan tambahan (opsional)"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.catatan_lain && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.catatan_lain}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tombol – persis sama dengan FormCreatePasien */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Link
                    href="/dokter/antrian"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateCatatanLayanan;
