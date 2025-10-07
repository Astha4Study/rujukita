import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';

type Patient = {
    id: number;
    name: string;
    nik: string;
    gender: string;
    age: number;
    address: string;
    phone: string;
};

type Props = {
    patient: Patient;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Pasien',
        href: '/patients',
    },
    {
        title: 'Edit Pasien',
        href: '',
    },
];

export default function EditPasien({ patient }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.name || '',
        nik: patient.nik || '',
        gender: patient.gender || 'L',
        age: patient.age || '',
        address: patient.address || '',
        phone: patient.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/patients/${patient.id}`);
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
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && (
                                        <p className="mt-1.5 text-sm text-red-600">
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
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData('gender', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="mt-1.5 text-sm text-red-600">
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
                                        value={data.age}
                                        onChange={(e) =>
                                            setData(
                                                'age',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan umur"
                                        min="0"
                                        max="150"
                                    />
                                    {errors.age && (
                                        <p className="mt-1.5 text-sm text-red-600">
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
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Contoh: 08123456789"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1.5 text-sm text-red-600">
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
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                    {errors.address && (
                                        <p className="mt-1.5 text-sm text-red-600">
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
