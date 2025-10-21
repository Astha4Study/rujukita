import React from "react";
import { MapPin, Phone, Mail, Globe2 } from "lucide-react";

interface FasilitasData {
    nama_fasilitas?: string;
    jenis_fasilitas?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    email?: string;
    latitude?: string;
    longitude?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    gambar?: File | null;
}

interface PreviewCreateFasilitasProps {
    data: FasilitasData;
}

const PreviewCreateFasilitas: React.FC<PreviewCreateFasilitasProps> = ({ data }) => {
    return (
        <div className="bg-white border h-fit border-gray-200 rounded-xl shadow-sm p-4">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={
                        data.gambar
                            ? URL.createObjectURL(data.gambar)
                            : "https://via.placeholder.com/400x250?text=Preview"
                    }
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>
            <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">
                    {data.nama_fasilitas || "Nama Fasilitas"}
                </p>
                <p className="text-sm text-gray-600">
                    {data.jenis_fasilitas || "Jenis Fasilitas"}
                </p>
                <div className="mt-2 flex items-center text-gray-500 text-sm gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                        {data.alamat
                            ? `${data.alamat}, ${data.kota || ""}, ${data.provinsi || ""}`
                            : "Alamat belum diisi"}
                    </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                    <p>
                        <Phone className="inline-block w-4 h-4 mr-1 text-emerald-600" />
                        {data.no_telepon || "-"}
                    </p>
                    <p>
                        <Mail className="inline-block w-4 h-4 mr-1 text-emerald-600" />
                        {data.email || "-"}
                    </p>
                </div>
                <div className="mt-4 text-sm text-gray-600 flex items-center gap-1">
                    <Globe2 className="w-4 h-4 text-emerald-600" />
                    <span>
                        {data.latitude && data.longitude
                            ? `${data.latitude}, ${data.longitude}`
                            : "Koordinat belum diisi"}
                    </span>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3 flex justify-between text-sm text-gray-600">
                    <span>Kapasitas: {data.kapasitas_total ?? 0}</span>
                    <span>Tersedia: {data.kapasitas_tersedia ?? 0}</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewCreateFasilitas;
