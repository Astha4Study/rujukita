import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function IndexFasilitasPerawat() {
    return (
        <AppLayout>
            <Head title='Fasilitas' />
            <div>
                <Link
                    href="/perawat/fasilitas/create"
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Tambah Pasien
                </Link>
            </div>
        </AppLayout>
    )
}