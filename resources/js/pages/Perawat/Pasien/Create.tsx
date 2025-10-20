import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreatePasien() {
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        nik: '',
        jenis_kelamin: 'L',
        tanggal_lahir: '',
        tempat_lahir: '',
        alamat: '',
        no_hp: '',
        golongan_darah: '',
        riwayat_penyakit: '',
        alergi: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) setData('nik', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pasien');
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Pasien', href: '/pasien' },
        { title: 'Tambah Pasien', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pasien" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi data pasien berikut
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama Lengkap */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_lengkap"
                                        value={data.nama_lengkap}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                        placeholder="Masukkan nama lengkap pasien"
                                    />
                                    {errors.nama_lengkap && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nama_lengkap}
                                        </p>
                                    )}
                                </div>

                                {/* NIK */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        NIK{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nik"
                                        value={data.nik}
                                        onChange={handleNikChange}
                                        maxLength={16}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                        placeholder="16 digit NIK"
                                    />
                                    {errors.nik && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nik}
                                        </p>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Kelamin{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.jenis_kelamin}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.tanggal_lahir && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tanggal_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Tempat Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                        placeholder="Masukkan tempat lahir"
                                    />
                                    {errors.tempat_lahir && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tempat_lahir}
                                        </p>
                                    )}
                                </div>

                                {/* Golongan Darah */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Golongan Darah
                                    </label>
                                    <input
                                        type="text"
                                        name="golongan_darah"
                                        value={data.golongan_darah}
                                        onChange={handleChange}
                                        placeholder="Contoh: A, B, AB, O"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.golongan_darah && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.golongan_darah}
                                        </p>
                                    )}
                                </div>

                                {/* Nomor HP */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nomor HP
                                    </label>
                                    <input
                                        type="text"
                                        name="no_hp"
                                        value={data.no_hp}
                                        onChange={handleChange}
                                        placeholder="08123456789"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.no_hp && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.no_hp}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alamat{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Masukkan alamat lengkap"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.alamat && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>

                                {/* Riwayat Penyakit */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Riwayat Penyakit
                                    </label>
                                    <textarea
                                        name="riwayat_penyakit"
                                        value={data.riwayat_penyakit}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Masukkan riwayat penyakit (jika ada)"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                </div>

                                {/* Alergi */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alergi
                                    </label>
                                    <textarea
                                        name="alergi"
                                        value={data.alergi}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Masukkan alergi pasien (jika ada)"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tombol */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <Link
                                href="/pasien"
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
                </div>
            </div>
        </AppLayout>
    );
}
