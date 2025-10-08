import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

type Pasien = {
    id: number;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir?: string | null;
    umur?: number | null;
    tempat_lahir?: string | null;
    alamat: string;
    no_hp?: string | null;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type Props = {
    pasien: Pasien;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Pasien', href: '/pasien' },
    { title: 'Edit Pasien', href: '' },
];

export default function EditPasien({ pasien }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: pasien.nama_lengkap || '',
        nik: pasien.nik || '',
        jenis_kelamin: pasien.jenis_kelamin || 'L',
        tanggal_lahir: pasien.tanggal_lahir || '',
        tempat_lahir: pasien.tempat_lahir || '',
        alamat: pasien.alamat || '',
        no_hp: pasien.no_hp || '',
        golongan_darah: pasien.golongan_darah || '',
        riwayat_penyakit: pasien.riwayat_penyakit || '',
        alergi: pasien.alergi || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pasien/${pasien.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Edit Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Perbarui informasi data pasien
                    </p>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nama_lengkap}
                                        onChange={(e) =>
                                            setData('nama_lengkap', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.nama_lengkap && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.nama_lengkap}
                                        </p>
                                    )}
                                </div>

                                {/* NIK */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        NIK
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData('nik', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan NIK"
                                        maxLength={16}
                                    />
                                    {errors.nik && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.nik}
                                        </p>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Kelamin
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.jenis_kelamin}
                                        onChange={(e) =>
                                            setData('jenis_kelamin', e.target.value as 'L' | 'P')
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.jenis_kelamin}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tanggal Lahir
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.tanggal_lahir}
                                        onChange={(e) =>
                                            setData(
                                                'tanggal_lahir',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan umur"
                                        min="0"
                                        max="150"
                                    />
                                    {errors.tanggal_lahir && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.tanggal_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Golongan Darah */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Golongan Darah
                                    </label>
                                    <input type="text" value={data.golongan_darah} onChange={(e) => setData('golongan_darah', e.target.value)}
                                        placeholder="Contoh: A, B, AB, O"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.golongan_darah && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.golongan_darah}
                                        </p>
                                    )}
                                </div>

                                {/* Nomor HP */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nomor Telepon
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.no_hp}
                                        onChange={(e) =>
                                            setData('no_hp', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Contoh: 08123456789"
                                    />
                                    {errors.no_hp && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.no_hp}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alamat
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData('alamat', e.target.value)
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                    {errors.alamat && (
                                        <p className="mt-1.5 text-sm text-red-600">
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>

                                {/* Riwayat Penyakit */}
                                <div className='md:col-span-2'>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Riwayat Penyakit
                                    </label>
                                    <textarea value={data.riwayat_penyakit} onChange={(e) => setData('riwayat_penyakit', e.target.value)}
                                        rows={2} placeholder="Masukkan riwayat penyakit (jika ada)"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                </div>

                                {/* Alergi */}
                                <div className='md:col-span-2'>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alergi
                                    </label>
                                    <textarea value={data.alergi} onChange={(e) => setData('alergi', e.target.value)}
                                        rows={2} placeholder="Masukkan Alergi (jika ada)"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href="/pasien"
                                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
