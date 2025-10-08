import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

type Fasilitas = {
    id: number;
    nama_fasilitas: string;
    jenis_fasilitas: string;
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    spesialisasi: string;
    deskripsi: string;
    latitude: string;
    longitude: string;
    gambar: string;
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
        jenis_fasilitas: fasilitas.jenis_fasilitas || '',
        alamat: fasilitas.alamat || '',
        kota: fasilitas.kota || '',
        latitude: fasilitas.latitude || '',
        longitude: fasilitas.longitude || '',
        kapasitas_total: fasilitas.kapasitas_total || 0,
        kapasitas_tersedia: fasilitas.kapasitas_tersedia || 0,
        spesialisasi: fasilitas.spesialisasi || '',
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
            <div className="mx-auto mt-6 max-w-3xl rounded-lg bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-semibold">
                    Edit Data Fasilitas
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Fasilitas
                        </label>
                        <input
                            type="text"
                            value={data.nama_fasilitas}
                            onChange={(e) =>
                                setData('nama_fasilitas', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border p-2"
                        />
                        {errors.nama_fasilitas && (
                            <p className="text-sm text-red-500">
                                {errors.nama_fasilitas}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jenis Fasilitas
                        </label>
                        <select
                            name="jenis_fasilitas"
                            value={data.jenis_fasilitas}
                            onChange={(e) =>
                                setData('jenis_fasilitas', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border p-2"
                        >
                            <option value="">-- Pilih Jenis --</option>
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
                            <p className="text-sm text-red-500">
                                {errors.jenis_fasilitas}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <textarea
                            name="alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="mt-1 w-full rounded-md border p-2"
                        />
                        {errors.alamat && (
                            <p className="text-sm text-red-500">
                                {errors.alamat}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kota
                            </label>
                            <input
                                type="text"
                                name="kota"
                                value={data.kota}
                                onChange={(e) =>
                                    setData('kota', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                            {errors.kota && (
                                <p className="text-sm text-red-500">
                                    {errors.kota}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Spesialisasi
                            </label>
                            <input
                                type="text"
                                name="spesialisasi"
                                value={data.spesialisasi}
                                onChange={(e) =>
                                    setData('spesialisasi', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Latitude
                            </label>
                            <input
                                type="text"
                                name="latitude"
                                value={data.latitude}
                                onChange={(e) =>
                                    setData('latitude', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                            {errors.latitude && (
                                <p className="text-sm text-red-500">
                                    {errors.latitude}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Longitude
                            </label>
                            <input
                                type="text"
                                name="longitude"
                                value={data.longitude}
                                onChange={(e) =>
                                    setData('longitude', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                            {errors.longitude && (
                                <p className="text-sm text-red-500">
                                    {errors.longitude}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kapasitas Total
                            </label>
                            <input
                                type="number"
                                name="kapasitas_total"
                                value={data.kapasitas_total}
                                onChange={(e) =>
                                    setData(
                                        'kapasitas_total',
                                        Number(e.target.value),
                                    )
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                            {errors.kapasitas_total && (
                                <p className="text-sm text-red-500">
                                    {errors.kapasitas_total}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tempat Tidur Tersedia
                            </label>
                            <input
                                type="number"
                                name="kapasitas_tersedia"
                                value={data.kapasitas_tersedia}
                                onChange={(e) =>
                                    setData(
                                        'kapasitas_tersedia',
                                        Number(e.target.value),
                                    )
                                }
                                className="mt-1 w-full rounded-md border p-2"
                            />
                            {errors.kapasitas_tersedia && (
                                <p className="text-sm text-red-500">
                                    {errors.kapasitas_tersedia}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gambar (jpg, png, webp, max 4MB)
                        </label>
                        <input
                            type="file"
                            name="gambar"
                            accept="image/*"
                            onChange={handleChangeFile}
                            className="mt-1 w-full rounded-md border p-2"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 h-24 rounded"
                            />
                        )}
                        {errors.gambar && (
                            <p className="text-sm text-red-500">
                                {errors.gambar}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${
                                processing
                                    ? 'cursor-not-allowed opacity-70'
                                    : ''
                            }`}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
