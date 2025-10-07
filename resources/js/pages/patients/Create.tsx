import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const [data, setData] = useState({
        name: '',
        nik: '',
        gender: 'L',
        age: '',
        address: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post('/patients', data, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 text-gray-800 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Tambah Pasien
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama lengkap"
                            value={data.name}
                            onChange={handleChange}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* NIK */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            NIK
                        </label>
                        <input
                            type="text"
                            name="nik"
                            placeholder="16 digit NIK"
                            value={data.nik}
                            maxLength={16}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                if (value.length <= 16) {
                                    setData({ ...data, nik: value });
                                }
                            }}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jenis Kelamin
                        </label>
                        <select
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        >
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>

                    {/* Umur */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Umur
                        </label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Umur"
                            value={data.age}
                            onChange={handleChange}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Alamat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Alamat lengkap"
                            value={data.address}
                            onChange={handleChange}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            No HP
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="No HP"
                            value={data.phone}
                            onChange={handleChange}
                            className="focus:ring-opacity-50 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex w-full items-center justify-center rounded-lg px-4 py-2 font-semibold text-white ${loading
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                    >
                        {loading ? (
                            <svg
                                className="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                                ></path>
                            </svg>
                        ) : null}
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
