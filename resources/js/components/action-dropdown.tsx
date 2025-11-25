import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

interface Klinik {
    id: number;
    nama_klinik: string;
    jenis_klinik:
        | 'Umum'
        | 'Gigi'
        | 'THT'
        | 'Kulit'
        | 'Kandungan'
        | 'Anak'
        | 'Bedah'
        | 'Mata'
        | 'Saraf';
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string | null;
    deskripsi: string;
    latitude: string;
    longitude: string;
    gambar: string | null;
    kapasitas_total: number;
    kapasitas_tersedia: number;
}

interface ActionDropdownProps {
    klinik: Klinik;
    deleteKlinik: (id: number) => void;
}

export default function ActionDropdown({
    klinik,
    deleteKlinik,
}: ActionDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Buka menu aksi</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link
                        href={`/klinik/${klinik.id}/edit`}
                        className="w-full text-yellow-600 hover:text-yellow-700 focus:text-yellow-700"
                    >
                        Edit Klinik
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => deleteKlinik(klinik.id)}
                    className="w-full cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                >
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
