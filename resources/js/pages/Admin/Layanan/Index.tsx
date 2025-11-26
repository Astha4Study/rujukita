import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Filter, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

interface Layanan {
    id: number;
    nama_layanan: string;
    harga: number;
    aktif: boolean;
    detail_layanan: Array<{ keterangan: string }>;
}

interface PageProps {
    layanan: Layanan[];
    role: string;
    [key: string]: any;
}

const tableName = ['nama layanan', 'keterangan', 'harga', 'status', 'aksi'];

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Daftar Layanan', href: '' }];

export default function LayananIndexAdmin() {
    const { props } = usePage<PageProps>();
    const { layanan, role } = props;

    const prefix = role === 'super_admin' ? '/super-admin' : '/admin';

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === layanan.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(layanan.map((l) => l.id));
        }
    };

    const deleteSelected = () => {
        if (selectedIds.length === 0) return;
        if (confirm(`Yakin ingin menghapus ${selectedIds.length} layanan?`)) {
            selectedIds.forEach((id) =>
                Inertia.delete(`${prefix}/layanan/${id}`),
            );
            setSelectedIds([]);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            Inertia.delete(`${prefix}/layanan/${id}`);
        }
    };

    const filteredLayanan = layanan.filter((l) =>
        l.nama_layanan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Layanan" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Layanan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola layanan yang tersedia di klinik
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari layanan berdasarkan nama..."
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

                    <Link
                        href={`${prefix}/layanan/create`}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Layanan
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedIds.length ===
                                                    layanan.length &&
                                                layanan.length > 0
                                            }
                                            onChange={toggleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    {tableName.map((v, i) => (
                                        <th
                                            key={i}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {v}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredLayanan.length > 0 ? (
                                    filteredLayanan.map((l) => (
                                        <tr
                                            key={l.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        l.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSelect(l.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {l.nama_layanan}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {l.detail_layanan
                                                    .map(
                                                        (d: any) =>
                                                            d.keterangan,
                                                    )
                                                    .join(', ')}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                Rp{' '}
                                                {l.harga.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {l.aktif ? (
                                                    <Badge className="bg-emerald-100 text-xs font-medium text-emerald-700">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-xs font-medium text-red-700">
                                                        Tidak Aktif
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="space-x-2 px-6 py-4 text-left">
                                                <Link
                                                    href={`${prefix}/layanan/${l.id}/edit`}
                                                    className="text-emerald-600 hover:text-emerald-700"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(l.id)
                                                    }
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada layanan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filteredLayanan.length} dari{' '}
                        {layanan.length} layanan
                    </p>
                </div>

                {/* Selection Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedIds.length} layanan dipilih
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
