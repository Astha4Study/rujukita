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

interface Facilities {
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
}

interface ActionDropdownProps {
    facilities: Facilities;
    deleteFacilities: (id: number) => void;
}

export default function ActionDropdown({
    facilities,
    deleteFacilities,
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
                        href={`/facilities/${facilities.id}/edit`}
                        className="w-full text-yellow-600 hover:text-yellow-700 focus:text-yellow-700"
                    >
                        Edit Fasilitas
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => deleteFacilities(facilities.id)}
                    className="w-full cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                >
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
