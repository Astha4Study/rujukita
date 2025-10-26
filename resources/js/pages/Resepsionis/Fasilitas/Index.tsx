import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    BedDouble,
    Building2,
    CheckCircle2,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Stethoscope,
    Users,
} from 'lucide-react';

interface Fasilitas {
    id: number;
    nama_fasilitas: string;
    alamat: string;
    jenis_fasilitas?: string;
    spesialisasi?: string;
    no_telepon?: string;
    email?: string;
    deskripsi: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    gambar?: string;
}

interface PageProps extends Record<string, any> {
    fasilitas: Fasilitas[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Fasilitas Kamu', href: '/resepsionis/fasilitas' },
];

export default function DashboardFasilitas() {
    const { props } = usePage<PageProps>();
    const f = props.fasilitas[0] || null;

    const gambar = f.gambar
        ? f.gambar.startsWith('http')
            ? f.gambar
            : `/storage/${f.gambar}`
        : null;
    const kapasitasTerisi =
        (f.kapasitas_total ?? 0) - (f.kapasitas_tersedia ?? 0);
    const okupansi =
        f.kapasitas_total && f.kapasitas_total > 0
            ? Math.round((kapasitasTerisi / f.kapasitas_total) * 100)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Fasilitas" />

            <div className="space-y-4 p-6">
                {/* Hero Image */}
                <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg md:h-96">
                    {gambar ? (
                        <img
                            src={gambar}
                            alt={f.nama_fasilitas}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-600">
                            <Building2 className="h-32 w-32 text-white/30" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/40" />

                    {/* Edit Button */}
                    <Link
                        href={`/resepsionis/fasilitas/${f.id}/edit`}
                        className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Kapasitas
                    </Link>

                    {/* Facility Info */}
                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white md:p-8">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                {f.jenis_fasilitas && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                                        <Building2 className="h-3.5 w-3.5" />
                                        {f.jenis_fasilitas}
                                    </span>
                                )}
                                {f.spesialisasi && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                                        <Stethoscope className="h-3.5 w-3.5" />
                                        {f.spesialisasi}
                                    </span>
                                )}
                            </div>

                            <h1 className="mb-2 text-3xl font-bold drop-shadow-lg md:text-4xl">
                                {f.nama_fasilitas}
                            </h1>

                            {f.alamat && (
                                <div className="flex max-w-3xl items-start gap-2 text-white/95">
                                    <MapPin className="mt-0.5 flex h-5 w-5 shrink-0" />
                                    <span className="text-base leading-relaxed drop-shadow">
                                        {f.alamat}
                                    </span>
                                </div>
                            )}

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90">
                                {f.kapasitas_total && (
                                    <div className="flex items-center gap-1.5">
                                        <BedDouble className="h-4 w-4" />
                                        <span>
                                            {f.kapasitas_total} total tempat
                                            tidur
                                        </span>
                                    </div>
                                )}
                                {typeof f.kapasitas_tersedia === 'number' && (
                                    <>
                                        <span className="text-white/60">•</span>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4" />
                                            <span>{okupansi}% okupansi</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            label: 'Total',
                            value: f.kapasitas_total ?? 0,
                            sub: 'Kapasitas Tempat Tidur',
                            icon: BedDouble,
                        },
                        {
                            label: 'Tersedia',
                            value: f.kapasitas_tersedia ?? 0,
                            sub: 'Tempat Tidur Kosong',
                            icon: CheckCircle2,
                        },
                        {
                            label: 'Terisi',
                            value: kapasitasTerisi,
                            sub: 'Pasien Saat Ini',
                            icon: Users,
                        },
                        {
                            label: 'Okupansi',
                            value: `${okupansi}%`,
                            sub: 'Tingkat Penggunaan',
                            icon: Activity,
                            bar: true,
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <item.icon className="h-5 w-5 text-emerald-600" />
                                <span className="text-xs font-semibold text-emerald-600">
                                    {item.label.toUpperCase()}
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-bold text-gray-900">
                                {item.value}
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-600">
                                {item.sub}
                            </p>
                            {item.bar && (
                                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                                        style={{ width: `${okupansi}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="grid gap-3 lg:grid-cols-5">
                    {/* Kontak */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3">
                        <div className="border-b border-gray-100 p-3">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-emerald-600" />
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Informasi Kontak
                                </h3>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {f.no_telepon && (
                                    <div className="flex items-center gap-3 rounded-lg p-3">
                                        <div className="flex h-10 w-10 items-center justify-center">
                                            <Phone className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-emerald-700">
                                                Telepon
                                            </p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {f.no_telepon}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {f.email && (
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center">
                                            <Mail className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-emerald-700">
                                                Email
                                            </p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {f.email}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    {f.deskripsi && (
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                            <div className="border-b border-gray-100 p-3">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-emerald-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Tentang Fasilitas
                                    </h3>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm leading-relaxed text-gray-700">
                                    {f.deskripsi}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
