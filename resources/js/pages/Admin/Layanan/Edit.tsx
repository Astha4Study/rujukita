import FormEditLayananAdmin from '@/components/form-edit-layanan-admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

type Layanan = {
    id: number;
    nama_layanan: string;
    harga: number;
    aktif: boolean;
    detail_layanan: Array<{ keterangan: string }>;
};

type Props = {
    layanan: Layanan;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Layanan', href: '/admin/layanan' },
    { title: 'Edit Layanan', href: '' },
];

export default function LayananEditAdmin({ layanan }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_layanan: layanan.nama_layanan || '',
        harga: layanan.harga || '',
        aktif: layanan.aktif || true,
        keterangan:
            layanan.detail_layanan?.map((d) => d.keterangan).join(', ') || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        router.post(`/admin/layanan/${layanan.id}?_method=PUT`, formData, {
            onSuccess: () => {
                console.log('✅ Data layanan berhasil diperbarui');
            },
            onError: (err) => {
                console.error('❌ Error:', err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Layanan" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Layanan
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi layanan di bawah ini.
                </p>

                <div className="overflow-hidden">
                    <FormEditLayananAdmin
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
