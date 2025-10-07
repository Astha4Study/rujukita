import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

export default function CreatePasien() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nik: '',
        gender: 'L',
        age: '',
        address: '',
        phone: '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData(
            e.target.name as
                | 'name'
                | 'nik'
                | 'gender'
                | 'age'
                | 'address'
                | 'phone',
            e.target.value,
        );
    };

    const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) {
            setData('nik', value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/patients', {});
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Daftar Pasien',
            href: '/patients',
        },
        {
            title: 'Tambah Pasien',
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Masukkan informasi data pasien baru
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        {/* Name */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan Nama Lengkap Pasien"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
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
                                        name="nik"
                                        value={data.nik}
                                        // 💡 Use the new dedicated NIK change handler
                                        onChange={handleNikChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan NIK Pasien"
                                        maxLength={16}
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
                                        Jenis Kelamin
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={data.gender}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>

                                {/* Umur */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Umur
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={data.age}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan Umur Pasien"
                                        min="0"
                                        max="150"
                                    />
                                    {errors.age && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.age}
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
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Contoh: 08123456789"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone}
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
                                        name="address"
                                        placeholder="Masukan Alamat Lengkap Pasien"
                                        value={data.address}
                                        rows={3}
                                        onChange={
                                            handleChange as (
                                                e: React.ChangeEvent<HTMLTextAreaElement>,
                                            ) => void
                                        } // Type cast for textarea
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href="/patients"
                                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
