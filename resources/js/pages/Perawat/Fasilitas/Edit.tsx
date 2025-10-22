import FormEditFasilitas from '@/components/form-edit-fasilitas';
import PreviewEditFasilitas from '@/components/preview-edit-fasilitas';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Fasilitas = {
    id: number;
    nama_fasilitas: string;
    jenis_fasilitas: string;
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string | null;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    spesialisasi: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    gambar: string | null;
};

type Props = {
    fasilitas: Fasilitas;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Fasilitas Kamu', href: '/perawat/fasilitas' },
    { title: 'Edit Fasilitas Kamu', href: '' },
];

export default function Edit({ fasilitas }: Props) {
    const { data, setData, processing, errors } = useForm({
        nama_fasilitas: fasilitas.nama_fasilitas ?? '',
        jenis_fasilitas: fasilitas.jenis_fasilitas ?? '',
        alamat: fasilitas.alamat ?? '',
        kota: fasilitas.kota ?? '',
        provinsi: fasilitas.provinsi ?? '',
        no_telepon: fasilitas.no_telepon ?? '',
        email: fasilitas.email ?? '',
        kapasitas_total: fasilitas.kapasitas_total ?? 0,
        kapasitas_tersedia: fasilitas.kapasitas_tersedia ?? 0,
        spesialisasi: fasilitas.spesialisasi ?? '',
        deskripsi: fasilitas.deskripsi ?? '',
        latitude: fasilitas.latitude ?? '',
        longitude: fasilitas.longitude ?? '',
        gambar: undefined as File | undefined,
    });

    const [preview, setPreview] = useState<string | null>(
        fasilitas.gambar ? `/storage/${fasilitas.gambar}` : null,
    );

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        router.post(
            `/perawat/fasilitas/${fasilitas.id}?_method=PUT`,
            formData,
            {
                onSuccess: () => {
                    console.log('✅ Data fasilitas berhasil diperbarui');
                },
                onError: (err) => {
                    console.error('❌ Error:', err);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Fasilitas Kamu" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Fasilitas
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi fasilitas di bawah ini.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form sebelah kiri */}
                    <div className="lg:col-span-2">
                        <FormEditFasilitas
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                            errors={errors}
                        />
                    </div>

                    {/* Preview sebelah kanan */}
                    <div className='self-start'>
                        <PreviewEditFasilitas data={{ ...data, preview }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
