import FormCreateCatatanLayanan from '@/components/form-create-catatan-layanan';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type Props = {
    pasien: {
        id: number;
        nama_lengkap: string;
    };

    antrian: {
        id: number;
        keluhan: string | null;
        tanggal_kunjungan: string;
    };
};

export default function TindakanCreateDokter({ antrian, pasien }: Props) {
    const { data, setData, processing, post, reset, errors } = useForm({
        keluhan_utama: antrian.keluhan || '',
        detail_keluhan: '',
        diagnosa: '',
        tindakan: '',
        catatan_lain: '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(`/dokter/antrian/${antrian.id}/tangani`, {
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/dokter/antrian' },
        { title: 'Buat Tindakan Dokter', href: '' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Tindakan Dokter" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat Tindakan untuk {pasien.nama_lengkap}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Buat tindakan yang akan di lakukan
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateCatatanLayanan
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
