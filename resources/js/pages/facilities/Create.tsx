import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Inertia } from "@inertiajs/inertia"
import { useState } from "react"


export default function CreateFasilitas() {
    const [data, setData] = useState({
        name: '',
        type: '',
        address: '',
        city: '',
        latitude: '',
        longitude: '',
        capacity: '',
        available_beds: '',
        specialization: '',
        image: '',

    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e:any) => {

    };

    return (
        <AppLayout>
            <Head title="Buat data fasilitas" />
            <div className="p-6">
            
            </div>
        </AppLayout>
    )
}