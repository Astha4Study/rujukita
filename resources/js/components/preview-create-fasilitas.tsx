import {
    Activity,
    BedDouble,
    Building2,
    CheckCircle2,
    Mail,
    MapPin,
    Phone,
    Stethoscope,
    Users,
} from 'lucide-react';
import React from 'react';

interface FasilitasData {
    nama_fasilitas?: string;
    jenis_fasilitas?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    email?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    spesialisasi?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    gambar?: File | null;
}

interface PreviewCreateFasilitasProps {
    data: FasilitasData;
}

const PreviewCreateFasilitas: React.FC<PreviewCreateFasilitasProps> = ({
    data,
}) => {
    const kapasitasTerisi =
        (data.kapasitas_total ?? 0) - (data.kapasitas_tersedia ?? 0);
    const okupansi =
        data.kapasitas_total && data.kapasitas_total > 0
            ? Math.round((kapasitasTerisi / data.kapasitas_total) * 100)
            : 0;

    return (
        <div className="max-w-sm rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Hero Image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                    src={
                        data.gambar
                            ? URL.createObjectURL(data.gambar)
                            : 'https://via.placeholder.com/400x250?text=Preview'
                    }
                    alt={data.nama_fasilitas || 'Preview'}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {data.jenis_fasilitas && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            <Building2 className="h-3 w-3" />
                            {data.jenis_fasilitas}
                        </span>
                    )}
                    {data.spesialisasi && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            <Stethoscope className="h-3 w-3" />
                            {data.spesialisasi}
                        </span>
                    )}
                </div>

                {/* Nama Fasilitas & Alamat */}
                <div className="absolute bottom-3 left-3 max-w-[90%] text-white drop-shadow-lg">
                    {data.alamat && (
                        <div className="mb-1 inline-flex items-center gap-1 text-sm">
                            <MapPin size={16} />
                            <p className="line-clamp-2 max-w-[calc(100%-20px)] overflow-hidden">
                                {data.alamat}
                                {data.kota ? `, ${data.kota}` : ''}
                                {data.provinsi ? `, ${data.provinsi}` : ''}
                            </p>
                        </div>
                    )}
                    <h2 className="text-lg font-bold">
                        {data.nama_fasilitas || 'Nama Fasilitas'}
                    </h2>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="p-3 text-sm text-gray-700">
                {data.deskripsi || 'Belum ada deskripsi fasilitas.'}
            </div>

            {/* Info Ringkas */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4 text-emerald-600" />
                    <span>Total: {data.kapasitas_total ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Tersedia: {data.kapasitas_tersedia ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span>Terisi: {kapasitasTerisi}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    <span>{okupansi}% Okupansi</span>
                </div>
            </div>

            {/* Kontak Ringkas */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>{data.no_telepon || '-'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span>{data.email || '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewCreateFasilitas;
