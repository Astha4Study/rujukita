import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Stethoscope, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

type Pasien = {
    id: number;
    nama_lengkap: string;
    nik: string;
    rekam_medis_count: number;
};

type PageProps = {
    pasien: Pasien[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Rekam Medis', href: '/resepsionis/rekam-medis' },
];

export default function RekamMedisIndexResepsionis() {
    const { pasien } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPasien = pasien.filter(
        (p) =>
            p.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.nik.includes(searchQuery),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekam Medis" />

            <div className="p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Rekam Medis Pasien
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Lihat daftar pasien dan jumlah rekam medis yang tercatat.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pasien berdasarkan nama atau NIK..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NIK</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ditangani Oleh</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal Kunjungan</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Jumlah Rekam Medis</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {pasien.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{p.nama_lengkap}</td>
                                    <td className="px-6 py-4">{p.nik}</td>
                                    <td className="px-6 py-4 text-center">{p.rekam_medis_count}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            href={`/resepsionis/pasien/${p.id}`}
                                            className="text-emerald-600 hover:text-emerald-700"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filteredPasien.length} dari {pasien.length}{' '}
                        pasien
                    </p>
                </div>
            </div>

        </AppLayout>
    );
}
