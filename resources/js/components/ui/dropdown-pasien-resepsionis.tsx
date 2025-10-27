import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { MoreHorizontal, MoreVertical } from "lucide-react";

interface DropdownPasienResepsionisProps {
  id: number;
}

const DropdownPasienResepsionis: React.FC<DropdownPasienResepsionisProps> = ({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/resepsionis/pasien/${id}/edit`}
            className="w-full text-left text-emerald-600 hover:text-emerald-700"
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Link
                href={`/resepsionis/antrian/create/pasien/${id}`}
                className="w-full text-left text-yellow-600 hover:text-yellow-700"
            >
                Buat Antrian
            </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownPasienResepsionis;
