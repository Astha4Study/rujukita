import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<{ auth: { user: User } }>();
    const user = props.auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='p-6'>
                <h1 className="text-xl font-semibold mb-2">Selamat Datang, {user.name}</h1>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>
        </AppLayout>
    );
}
