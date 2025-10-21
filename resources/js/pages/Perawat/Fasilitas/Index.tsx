import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Pencil,
    MapPin,
    Phone,
    Mail,
    Stethoscope,
    BedDouble,
    ImageOff,
    Building2,
} from "lucide-react";
import { type BreadcrumbItem } from "@/types";

interface Fasilitas {
    id: number;
    nama_fasilitas: string;
    alamat: string;
    jenis_fasilitas?: string;
    spesialisasi?: string;
    no_telepon?: string;
    email?: string;
    deskripsi?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    gambar?: string;
}

interface PageProps extends Record<string, any> {
    fasilitas: Fasilitas[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Fasilitas Kamu", href: "/perawat/fasilitas" },
];

export default function DashboardFasilitas() {
    const { props } = usePage<PageProps>();
    const currentFasilitas = props.fasilitas[0] || null;

    if (!currentFasilitas) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Fasilitas" />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <ImageOff className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Belum Ada Fasilitas
                    </h2>
                    <p className="text-sm text-gray-500 max-w-sm mb-6">
                        Anda belum menambahkan fasilitas kesehatan. Silakan buat fasilitas terlebih dahulu.
                    </p>
                    <Link
                        href="/perawat/fasilitas/create"
                        className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        Tambah Fasilitas
                    </Link>
                </div>
            </AppLayout>
        );
    }

    const f = currentFasilitas;
    const gambar = f.gambar
        ? f.gambar.startsWith("http")
            ? f.gambar
            : `/storage/${f.gambar}`
        : null;

    const okupansi =
        f.kapasitas_total && f.kapasitas_total > 0
            ? Math.round(
                ((f.kapasitas_total - (f.kapasitas_tersedia ?? 0)) /
                    f.kapasitas_total) *
                100
            )
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Fasilitas" />

            <div className="p-6 space-y-6">
                {/* Main Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-emerald-600">
                        {gambar && (
                            <img
                                src={gambar}
                                alt={f.nama_fasilitas}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Tombol Edit */}
                        <Link
                            href={`/perawat/fasilitas/${f.id}/edit`}
                            className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-emerald-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-white transition-colors shadow-sm"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit
                        </Link>

                        {/* Judul */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h1 className="text-2xl font-bold mb-1">{f.nama_fasilitas}</h1>
                            {f.alamat && (
                                <div className="flex items-center gap-2 text-emerald-50">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{f.alamat}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Statistik Kapasitas */}
                    {(f.kapasitas_total || f.kapasitas_tersedia) && (
                        <>
                            <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
                                <div className="px-6 py-4 text-center">
                                    <p className="text-2xl font-bold text-gray-900">{f.kapasitas_total ?? 0}</p>
                                    <p className="text-xs text-gray-500 mt-1">Total Kapasitas</p>
                                </div>
                                <div className="px-6 py-4 text-center">
                                    <p className="text-2xl font-bold text-emerald-600">{f.kapasitas_tersedia ?? 0}</p>
                                    <p className="text-xs text-gray-500 mt-1">Tersedia</p>
                                </div>
                                <div className="px-6 py-4 text-center">
                                    <p className="text-2xl font-bold text-orange-500">{okupansi}%</p>
                                    <p className="text-xs text-gray-500 mt-1">Okupansi</p>
                                </div>
                            </div>

                            <div className="px-6 py-3 bg-gray-50">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                    <span>Status Kapasitas</span>
                                    <span className="font-medium">
                                        {(f.kapasitas_total ?? 0) - (f.kapasitas_tersedia ?? 0)} dari {f.kapasitas_total ?? 0} terisi
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all"
                                        style={{ width: `${okupansi}%` }}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Detail & Deskripsi */}
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Info Detail */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-3">
                                Informasi Detail
                            </h3>

                            {/* Ubah dari space-y ke grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {f.jenis_fasilitas && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                            <Building2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Jenis Fasilitas</p>
                                            <p className="text-sm font-medium text-gray-900">{f.jenis_fasilitas}</p>
                                        </div>
                                    </div>
                                )}

                                {f.spesialisasi && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Spesialisasi</p>
                                            <p className="text-sm font-medium text-gray-900">{f.spesialisasi}</p>
                                        </div>
                                    </div>
                                )}

                                {f.no_telepon && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Telepon</p>
                                            <p className="text-sm font-medium text-gray-900">{f.no_telepon}</p>
                                        </div>
                                    </div>
                                )}

                                {f.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm font-medium text-gray-900">{f.email}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Deskripsi */}
                        {f.deskripsi && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-3">
                                    Deskripsi
                                </h3>
                                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {f.deskripsi}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
