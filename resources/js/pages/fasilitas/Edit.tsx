import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Fasilitas = {
    id: number;
    nama_fasilitas: string;
    jenis_fasilitas: 'Rumah Sakit Umum' | 'Klinik' | 'Puskesmas' | 'Dokter Mandiri';
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string | null;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    spesialisasi: 'Umum' | 'Anak' | 'Kandungan' | 'Bedah' | 'Gigi' | 'Mata' | 'Jantung' | 'Kulit' | 'Saraf' | 'Lainnya';
    deskripsi: string;
    latitude: string;
    longitude: string;
    gambar: string | null;
};

type Props = {
    fasilitas: Fasilitas;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Fasilitas', href: '/fasilitas' },
    { title: 'Edit Fasilitas', href: '' },
];

export default function EditFasilitas({ fasilitas }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_fasilitas: fasilitas.nama_fasilitas || '',
        jenis_fasilitas: fasilitas.jenis_fasilitas || 'Rumah Sakit Umum',
        alamat: fasilitas.alamat || '',
        kota: fasilitas.kota || '',
        provinsi: fasilitas.provinsi || '',
        no_telepon: fasilitas.no_telepon || '',
        email: fasilitas.email || '',
        kapasitas_total: fasilitas.kapasitas_total || 0,
        kapasitas_tersedia: fasilitas.kapasitas_tersedia || 0,
        spesialisasi: fasilitas.spesialisasi || 'Lainnya',
        deskripsi: fasilitas.deskripsi || '',
        latitude: fasilitas.latitude || '',
        longitude: fasilitas.longitude || '',
        gambar: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(
        fasilitas.gambar ? `/storage/${fasilitas.gambar}` : null,
    );

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/fasilitas/${fasilitas.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className='p-6'>
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Edit Fasilitas
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Perbarui informasi data fasilitas
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className='p-6'>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    {/* Nama Fasilitas */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Nama Fasilitas
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_fasilitas}
                                            onChange={(e) =>
                                                setData('nama_fasilitas', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                            placeholder="Masukkan nama fasilitas"
                                        />
                                        {errors.nama_fasilitas && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.nama_fasilitas}
                                            </p>
                                        )}
                                    </div>

                                    {/* Jenis Fasilitas */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Jenis Fasilitas{' '}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.jenis_fasilitas}
                                            onChange={(e) =>
                                                setData('jenis_fasilitas', e.target.value as 'Rumah Sakit Umum' | 'Klinik' | 'Puskesmas' | 'Dokter Mandiri')
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                        >
                                            <option value="Rumah Sakit Umum">
                                                Rumah Sakit Umum
                                            </option>
                                            <option value="Klinik">Klinik</option>
                                            <option value="Puskesmas">Puskesmas</option>
                                            <option value="Dokter Mandiri">
                                                Dokter Mandiri
                                            </option>
                                        </select>
                                        {errors.jenis_fasilitas && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.jenis_fasilitas}
                                            </p>
                                        )}
                                    </div>

                                    {/* Alamat Fasilitas */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Alamat Fasilitas{' '}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={data.alamat}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                            placeholder="Masukan alamat fasilitas"
                                        />
                                        {errors.alamat && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.alamat}
                                            </p>
                                        )}
                                    </div>

                                    {/* Kota & Provinsi */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Kota{' '}
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kota}
                                                onChange={(e) =>
                                                    setData('kota', e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Masukan kota tempat fasilitas"
                                            />
                                            {errors.kota && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.kota}
                                                </p>
                                            )}
                                        </div>

                                        {/* Provinsi */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Provinsi{' '}
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.provinsi}
                                                onChange={(e) => setData('provinsi', e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Masukan provinsi tempat fasilitas"
                                            />
                                            {errors.provinsi && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.provinsi}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Nomor Telepon & Email */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Nomor Telepon{' '}
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.no_telepon}
                                                onChange={(e) =>
                                                    setData('no_telepon', e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Masukan nomor telepon fasilitas"
                                            />
                                            {errors.no_telepon && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.no_telepon}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Masukan email fasilitas"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Spesialisasi{' '}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="spesialisasi"
                                            value={data.spesialisasi}
                                            onChange={(e) =>
                                                setData(
                                                    'spesialisasi',
                                                    e.target.value as 'Umum' | 'Anak' | 'Kandungan' | 'Bedah' | 'Gigi' | 'Mata' | 'Jantung' | 'Kulit' | 'Saraf' | 'Lainnya',
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                        >
                                            <option value="Lainnya">Lainnya</option>
                                            <option value="Umum">Umum</option>
                                            <option value="Anak">Anak</option>
                                            <option value="Kandungan">
                                                Kandungan
                                            </option>
                                            <option value="Bedah">Bedah</option>
                                            <option value="Gigi">Gigi</option>
                                            <option value="Mata">Mata</option>
                                            <option value="Jantung">Jantung</option>
                                            <option value="Kulit">Kulit</option>
                                            <option value="Saraf">Saraf</option>
                                        </select>
                                    </div>

                                    {/* Gambar */}
                                    <div className='md:col-span-2'>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Gambar (jpg, png, webp, max 4MB)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChangeFile}
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                        />
                                        {preview && (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="mt-2 h-24 rounded"
                                            />
                                        )}
                                        {errors.gambar && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.gambar}
                                            </p>
                                        )}
                                    </div>

                                    {/* Latitude & Longitude */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Latitude
                                            </label>
                                            <input
                                                type="text"
                                                value={data.latitude}
                                                onChange={(e) =>
                                                    setData('latitude', e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Contoh: -7.797068"
                                            />
                                            {errors.latitude && (
                                                <p className="text-sm text-red-500">
                                                    {errors.latitude}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Longitude
                                            </label>
                                            <input
                                                type="text"
                                                value={data.longitude}
                                                onChange={(e) =>
                                                    setData('longitude', e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="Contoh: 110.370529"
                                            />
                                            {errors.longitude && (
                                                <p className="text-sm text-red-500">
                                                    {errors.longitude}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Kapasitas & Tempat Tersedia */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Kapasitas Total{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                value={data.kapasitas_total}
                                                onChange={(e) =>
                                                    setData(
                                                        'kapasitas_total',
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="100"
                                            />
                                            {errors.kapasitas_total && (
                                                <p className="text-sm text-red-500">
                                                    {errors.kapasitas_total}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Tempat Tidur Tersedia{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                value={data.kapasitas_tersedia}
                                                onChange={(e) =>
                                                    setData(
                                                        'kapasitas_tersedia',
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                                placeholder="80"
                                            />
                                            {errors.kapasitas_tersedia && (
                                                <p className="text-sm text-red-500">
                                                    {errors.kapasitas_tersedia}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol */}
                            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                                <Link
                                    href="/fasilitas"
                                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 ${processing
                                        ? 'cursor-not-allowed opacity-70'
                                        : ''
                                        }`}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
