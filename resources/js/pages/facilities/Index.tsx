import ActionDropdown from '@/components/action-dropdown';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';

type Facilities = {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    latitude: string;
    longitude: string;
    capacity: number;
    available_beds: number;
    specialization: string;
    image: string;
};

type PageProps = {
    facilities: Facilities[];
};

const listTable = [
    'Nama Fasilitas',
    'Jenis Fasilitas',
    'Alamat',
    'Kota',
    'Latitude',
    'Longitude',
    'Total Kamar',
    'Kamar Tersedia',
    'Spesialisasi',
    'Gambar',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Fasilitas', href: '/facilities' },
];

export default function IndexFasilitas() {
    const { facilities } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const deleteFacilities = (id: number) => {
        if (confirm('Yakin ingin menghapus fasilitas ini?')) {
            Inertia.delete(`/facilities/${id}`);
        }
    };

    const filteredFacilities = facilities.filter(
        (facility) =>
            facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.city.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Fasilitas" />
            <div className="p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Fasilitas
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Fasilitas Yang Ada
                    </p>
                </div>
                <div className="my-4 flex items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                    <Link
                        href="/facilities/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Pasien
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {listTable.map((item) => (
                                        <th
                                            key={item}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredFacilities.map((facilities) => (
                                    <tr
                                        key={facilities.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {facilities.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {facilities.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {facilities.address}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {facilities.city}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {facilities.latitude}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {facilities.longitude}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {facilities.capacity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {facilities.available_beds}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {facilities.specialization}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {facilities.image ? (
                                                <img
                                                    src={facilities.image}
                                                    alt={facilities.name}
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <ActionDropdown
                                                facilities={facilities}
                                                deleteFacilities={
                                                    deleteFacilities
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {facilities.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-6 text-center text-gray-500 italic"
                                        >
                                            Belum ada data fasilitas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 1 - {filteredFacilities.length} from{' '}
                        {facilities.length}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
