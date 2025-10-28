import FormCreateAntrian from '@/components/form-create-antrian';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface Pasien {
    id: number;
    nama_lengkap: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    jenis_kelamin: string;
    umur: number;
}

interface Dokter {
    id: number;
    name: string;
}

interface CreateProps {
    pasien: Pasien;
    dokter: Dokter[];
}

const today = new Date().toISOString().split('T')[0];

export default function Create({ pasien, dokter }: CreateProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        pasien_id: pasien.id,
        dokter_id: '',
        spesialis: '',
        keluhan: '',
        tanggal_kunjungan: today,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/resepsionis/antrian', {
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Pasien', href: '/resepsionis/pasien' },
        { title: 'Buat Antrian Pasien', href: '' },
    ];

    return (
        <AppLayout>
            <Head title="Buat Antrian" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat Antrian Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lengkapi data untuk membuat antrian
                    </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateAntrian
                        pasien={pasien}
                        dokter={dokter}
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
