import { useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

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

type Props = {
    facilities: Facilities;
};

export default function EditFasilitas({ facilities }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: facilities.name || "",
        type: facilities.type || "RSU",
        address: facilities.address || "",
        city: facilities.city || "",
        latitude: facilities.latitude || "",
        longitude: facilities.longitude || "",
        capacity: facilities.capacity || 0,
        available_beds: facilities.available_beds || 0,
        specialization: facilities.specialization || "",
        image: facilities.image || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/facilities/${facilities.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
                <h1 className="text-2xl font-semibold mb-6">Edit Data Fasilitas</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Fasilitas</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full mt-1 border rounded-md p-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipe</label>
                        <select
                            name="type"
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            className="w-full mt-1 border rounded-md p-2"
                        >
                            <option value="Puskesmas">Puskesmas</option>
                            <option value="Klinik">Klinik</option>
                            <option value="RSU">RSU</option>
                            <option value="Rumah Sakit Rujukan">Rumah Sakit Rujukan</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full mt-1 border rounded-md p-2"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kota</label>
                            <input
                                type="text"
                                name="city"
                                value={data.city}
                                onChange={(e) => setData("city", e.target.value)}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Spesialisasi</label>
                            <input
                                type="text"
                                name="specialization"
                                value={data.specialization}
                                onChange={(e) => setData("specialization", e.target.value)}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={data.latitude}
                                onChange={(e) => setData("latitude", e.target.value)}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                            {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={data.longitude}
                                onChange={(e) => setData("longitude", e.target.value)}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                            {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kapasitas</label>
                            <input
                                type="number"
                                name="capacity"
                                value={data.capacity}
                                onChange={(e) => setData("capacity", Number(e.target.value))}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tempat Tidur Tersedia</label>
                            <input
                                type="number"
                                name="available_beds"
                                value={data.available_beds}
                                onChange={(e) => setData("available_beds", Number(e.target.value))}
                                className="w-full mt-1 border rounded-md p-2"
                            />
                            {errors.available_beds && <p className="text-red-500 text-sm">{errors.available_beds}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gambar (URL)</label>
                        <input
                            type="text"
                            name="image"
                            value={data.image}
                            onChange={(e) => setData("image", e.target.value)}
                            className="w-full mt-1 border rounded-md p-2"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${processing ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
