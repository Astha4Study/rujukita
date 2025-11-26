import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface FormCreateLayananAdminProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
}

const FormCreateLayananAdmin: React.FC<FormCreateLayananAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
}) => {
    const [errors, setErrors] = useState<any>({});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        handleSubmit(e);
    };

    const formatRupiah = (value: string | number) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(value));
    };

    const parseRupiah = (value: string) => {
        return Number(value.replace(/[^0-9]/g, ''));
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nama Layanan */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nama Layanan <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.nama_layanan}
                        onChange={(e) =>
                            setData('nama_layanan', e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Contoh: Pemeriksaan Umum"
                    />
                    {errors.nama_layanan && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.nama_layanan}
                        </p>
                    )}
                </div>

                {/* Harga */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Harga <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formatRupiah(data.harga)}
                        onChange={(e) => {
                            const raw = parseRupiah(e.target.value);
                            setData('harga', raw);
                        }}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Contoh: Rp 50.000"
                    />
                    {errors.harga && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.harga}
                        </p>
                    )}
                </div>
            </div>

            {/* Status Aktif */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status Layanan <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded-lg border px-4 py-2.5">
                    <Checkbox
                        checked={data.aktif}
                        onCheckedChange={(value) => setData('aktif', value)}
                        className="h-4 w-4 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <Label className="text-sm font-medium text-gray-700">
                        Layanan Aktif
                    </Label>
                </div>
            </div>

            {/* Input detail */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Detail Layanan <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={data.keterangan}
                    onChange={(e) => setData('keterangan', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Contoh: Pemeriksaan umum meliputi cek tekanan darah, konsultasi ringan, dsb."
                    rows={4}
                />
                {errors.keterangan && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.keterangan}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <Link
                    href="/admin/layanan"
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

export default FormCreateLayananAdmin;
