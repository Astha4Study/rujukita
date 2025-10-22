import FormCreateFasilitas from '@/components/form-create-fasilitas';
import PreviewCreateFasilitas from '@/components/preview-create-fasilitas';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';

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
        post('/resepsionis/fasilitas', {
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
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data Fasilitas
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data fasilitas di bawah untuk menambahkan ke
                    daftar.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* form */}
                    <div className="lg:col-span-2">
                        <FormCreateFasilitas
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleChangeFile={handleChangeFile}
                            processing={processing}
                        />
                    </div>

                    {/* preview */}
                    <div className='self-start'>
                        <PreviewCreateFasilitas data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
