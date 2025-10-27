import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import React from 'react';

// Define interfaces for the props
interface Pasien {
    id: number;
    nama_lengkap: string;
    golongan_darah: string;
}

interface Dokter {
    id: number;
    name: string;
}

interface CreateProps {
    pasien: Pasien;
    dokter: Dokter[];
}

// Define an interface for the form data
interface FormData {
    pasien_id: number;
    dokter_id: string;
    keluhan: string;
}

export default function Create({ pasien, dokter }: CreateProps) {
    const { data, setData, post, processing, reset } = useForm<FormData>({
        pasien_id: pasien.id,
        dokter_id: '',
        keluhan: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/resepsionis/antrian', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Nama Pasien</label>
                    <Input value={pasien.nama_lengkap} disabled />
                </div>
                <div>
                    <label>Golongan Darah</label>
                    <Input value={pasien.golongan_darah} disabled />
                </div>
                <div>
                    <label>Pilih Dokter</label>
                    <select
                        value={data.dokter_id}
                        onChange={(e) => setData('dokter_id', e.target.value)}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">-- Pilih Dokter --</option>
                        {dokter.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Keluhan</label>
                    <Input
                        value={data.keluhan}
                        onChange={(e) => setData('keluhan', e.target.value)}
                    />
                </div>

                <Button type="submit" disabled={processing}>
                    Simpan Antrian
                </Button>
            </form>
        </AppLayout>
    );
}
