import { usePage, Link, Head } from "@inertiajs/react";
import { Inertia, } from "@inertiajs/inertia";
import AppLayout from '@/layouts/app-layout';

type Patient = {
    id: number;
    name: string;
    nik: string;
    gender: string;
    age: number;
};

type PageProps = {
    patients: Patient[];
};

export default function IndexPasien() {
    const { patients } = usePage<PageProps>().props;

    const deletePatient = (id: number) => {
        if (confirm('Yakin ingin menghapus pasien ini?')) {
            Inertia.delete(`/patients/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Daftar Pasien" />
            <div className="p-6">
                <h1>Daftar Pasien</h1>
                <Link href="/patients/create">Tambah Pasien</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Gender</th>
                            <th>Umur</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patients: any) => (
                            <tr key={patients.id}>
                                <td>{patients.name}</td>
                                <td>{patients.nik}</td>
                                <td>{patients.gender}</td>
                                <td>{patients.age}</td>
                                <td>
                                    <Link href={`/patients/${patients.id}/edit`}>
                                        Edit
                                    </Link>
                                    <button onClick={() => deletePatient(patients.id)}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
