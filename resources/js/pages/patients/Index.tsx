import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

type Patient = {
    id: number;
    name: string;
    nik: string;
    gender: string;
    age: number;
};

type PageProps = {
    patients: Patient[];
};

const listTable = ['Nama pasien', 'NIK', 'Gender', 'Umur'];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Pasien', href: '/patients' },
];

export default function IndexPasien() {
    const { patients } = usePage<PageProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === patients.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(patients.map((p) => p.id));
        }
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} pasien?`)) {
            selectedIds.forEach((id) => {
                Inertia.delete(`/patients/${id}`);
            });
            setSelectedIds([]);
        }
    };

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.nik.includes(searchQuery),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pasien" />
            <div className="p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola data pasien Anda
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
                        href="/patients/create"
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
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    patients.length &&
                                                patients.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
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
                                {filteredPatients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(
                                                    patient.id,
                                                )}
                                                onChange={() =>
                                                    toggleSelect(patient.id)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {patient.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {patient.nik}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {patient.gender === 'L'
                                                    ? 'Laki-laki'
                                                    : 'Perempuan'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {patient.age} tahun
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                href={`/patients/${patient.id}/edit`}
                                                className="block px-4 py-2 text-sm text-yellow-500 hover:text-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 1 - {filteredPatients.length} from{' '}
                        {patients.length}
                    </div>
                </div>

                {/* Selection Actions Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} pasien dipilih
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={deleteSelected}
                                className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => setSelectedIds([])}
                                className="ml-2 text-gray-400 transition hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
