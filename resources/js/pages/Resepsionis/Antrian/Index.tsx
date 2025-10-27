import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function IndexResepsionisAntrian() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Pasien', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <h1>Antrian</h1>
            </div>
        </AppLayout>
    );
}
