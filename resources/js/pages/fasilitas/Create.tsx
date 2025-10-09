import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';

export default function CreateFasilitas() {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama_fasilitas: '',
        jenis_fasilitas: 'Rumah Sakit Umum',
        alamat: '',
        kota: '',
        provinsi: '',
        no_telepon: '',
        email: '',
        kapasitas_total: '',
        kapasitas_tersedia: '',
        spesialisasi: 'Lainnya',
        deskripsi: '',
        latitude: '',
        longitude: '',
        gambar: null as File | null,
    });

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('gambar', e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/fasilitas', {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Fasilitas', href: '/fasilitas' },
        { title: 'Tambah Fasilitas', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Fasilitas" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tambah Data Fasilitas
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi data fasilitas berikut
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama Fasilitas */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Fasilitas{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_fasilitas"
                                        value={data.nama_fasilitas}
                                        onChange={(e) =>
                                            setData(
                                                'nama_fasilitas',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                        placeholder="Masukan nama fasilitas"
                                    />
                                    {errors.nama_fasilitas && (
                                        <p className="mt-1 text-sm text-red-500">
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
                                        name="jenis_fasilitas"
                                        value={data.jenis_fasilitas}
                                        onChange={(e) =>
                                            setData(
                                                'jenis_fasilitas',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    >
                                        <option value="Rumah Sakit Umum">
                                            Rumah Sakit Umum
                                        </option>
                                        <option value="Klinik">Klinik</option>
                                        <option value="Puskesmas">
                                            Puskesmas
                                        </option>
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
                                        type="text"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData('alamat', e.target.value)
                                        }
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
                                            name="kota"
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
                                            name="provinsi"
                                            value={data.provinsi}
                                            onChange={(e) =>
                                                setData('provinsi', e.target.value)
                                            }
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
                                            Nomor Telepon <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="no_telepon"
                                            value={data.no_telepon}
                                            onChange={(e) =>
                                                setData(
                                                    'no_telepon',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                            placeholder="Masukan nomor telepon fasilitas"
                                        />
                                        {errors.no_telepon && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.no_telepon}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                            placeholder="Masukan email fasilitas"
                                        />
                                    </div>
                                </div>

                                {/* Spesialisasi */}
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
                                                e.target.value,
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
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Gambar (jpg, png, webp, max 4MB)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="gambar"
                                            accept="image/*"
                                            onChange={handleChangeFile}
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                        />
                                    </div>
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
                                            name="latitude"
                                            value={data.latitude}
                                            onChange={(e) =>
                                                setData(
                                                    'latitude',
                                                    e.target.value,
                                                )
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
                                            name="longitude"
                                            value={data.longitude}
                                            onChange={(e) =>
                                                setData(
                                                    'longitude',
                                                    e.target.value,
                                                )
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
                                            name="kapasitas_total"
                                            value={data.kapasitas_total}
                                            onChange={(e) =>
                                                setData(
                                                    'kapasitas_total',
                                                    e.target.value,
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
                                            name="kapasitas_tersedia"
                                            value={data.kapasitas_tersedia}
                                            onChange={(e) =>
                                                setData(
                                                    'kapasitas_tersedia',
                                                    e.target.value,
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
