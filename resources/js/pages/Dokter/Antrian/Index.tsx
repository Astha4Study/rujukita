import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Antrian', href: '/dokter/antrian' },
];

export default function AntrianIndexDokter() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Antrian" />
            <div></div>
        </AppLayout>
    );
}
