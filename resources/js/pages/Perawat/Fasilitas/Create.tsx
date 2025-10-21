import AppLayout from '@/layouts/app-layout';
import PreviewCreateFasilitas from '@/components/preview-create-fasilitas';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';
import FormCreateFasilitas from '@/components/form-create-fasilitas';

export default function CreateFasilitas() {
    const { data, setData, post, processing, reset } = useForm({
        nama_fasilitas: '',
        jenis_fasilitas: '',
        alamat: '',
        kota: '',
        provinsi: '',
        no_telepon: '',
        email: '',
        kapasitas_total: 0,
        kapasitas_tersedia: 0,
        spesialisasi: '',
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
        post('/perawat/fasilitas', {
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Tambah Data Fasilitas
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Lengkapi data fasilitas di bawah untuk menambahkan ke daftar.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* form */}
                    <FormCreateFasilitas
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        handleChangeFile={handleChangeFile}
                        processing={processing}
                    />

                    {/* preview */}
                    <PreviewCreateFasilitas data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
