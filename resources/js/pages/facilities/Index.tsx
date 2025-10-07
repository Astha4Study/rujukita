import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
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

type PageProps = {
  facilities: Facilities[];
};

export default function IndexFasilitas() {
  const { facilities } = usePage<PageProps>().props;

  const deleteFacilities = (id: number) => {
    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
      Inertia.delete(`/facilities/${id}`);
    }
  };

  return (
    <AppLayout>
      <Head title="Daftar Fasilitas" />
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Daftar Fasilitas</h1>
          <Link
            href="/facilities/create"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tambah Fasilitas
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Tipe</th>
                <th className="px-4 py-2 text-left">Alamat</th>
                <th className="px-4 py-2 text-left">Kota</th>
                <th className="px-4 py-2 text-left">Kapasitas</th>
                <th className="px-4 py-2 text-left">Tersedia</th>
                <th className="px-4 py-2 text-left">Spesialisasi</th>
                <th className="px-4 py-2 text-left">Gambar</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facilities) => (
                <tr key={facilities.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{facilities.name}</td>
                  <td className="px-4 py-2">{facilities.type}</td>
                  <td className="px-4 py-2">{facilities.address}</td>
                  <td className="px-4 py-2">{facilities.city}</td>
                  <td className="px-4 py-2">{facilities.capacity}</td>
                  <td className="px-4 py-2">{facilities.available_beds}</td>
                  <td className="px-4 py-2">{facilities.specialization}</td>
                  <td className="px-4 py-2">
                    {facilities.image ? (
                      <img
                        src={facilities.image}
                        alt={facilities.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link
                      href={`/facilities/${facilities.id}/edit`}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteFacilities(facilities.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {facilities.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    Belum ada data fasilitas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
