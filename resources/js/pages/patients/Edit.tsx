import { useForm, Link } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

type Patient = {
    id: number;
    name: string;
    nik: string;
    gender: string;
    age: number;
    address: string;
    phone: string;
};

type Props = {
    patient: Patient;
};

export default function Edit({ patient }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.name || "",
        nik: patient.nik || "",
        gender: patient.gender || "L",
        age: patient.age || 0,
        address: patient.address || "",
        phone: patient.phone || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/patients/${patient.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto p-6 bg-white text-gray-800 shadow rounded">
                <h1 className="text-2xl font-bold mb-6">Edit Pasien</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block">NIK</label>
                        <input
                            type="text"
                            value={data.nik}
                            onChange={(e) => setData("nik", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.nik && <div className="text-red-600">{errors.nik}</div>}
                    </div>

                    <div>
                        <label className="block">Jenis Kelamin</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.gender && <div className="text-red-600">{errors.gender}</div>}
                    </div>

                    <div>
                        <label className="block">Umur</label>
                        <input
                            type="number"
                            value={data.age}
                            onChange={(e) => setData("age", Number(e.target.value))}
                            className="w-full border rounded p-2"
                        />
                        {errors.age && <div className="text-red-600">{errors.age}</div>}
                    </div>

                    <div>
                        <label className="block">Alamat</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.address && <div className="text-red-600">{errors.address}</div>}
                    </div>

                    <div>
                        <label className="block">Nomor HP</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.phone && <div className="text-red-600">{errors.phone}</div>}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Link
                            href="/patients"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Kembali
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
