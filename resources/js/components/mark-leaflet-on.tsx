import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

// fix icon default hilang di React
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerDraggableOnProps {
    latitude: string | number;
    longitude: string | number;
    setData: (key: string, value: any) => void;
}

const MarkerDraggableOn: React.FC<MarkerDraggableOnProps> = ({
    latitude,
    longitude,
    setData,
}) => {
    const [position, setPosition] = useState<[number, number]>([
        Number(latitude) || -7.7956,
        Number(longitude) || 110.3695,
    ]);

    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            setData('latitude', e.latlng.lat);
            setData('longitude', e.latlng.lng);
        },
        locationfound(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            setData('latitude', e.latlng.lat);
            setData('longitude', e.latlng.lng);
            map.flyTo(e.latlng, 15);
        },
    });

    // deteksi lokasi user saat pertama kali
    useEffect(() => {
        map.locate({ setView: true, maxZoom: 16 });
    }, [map]);

    return (
        <Marker
            draggable
            position={position}
            eventHandlers={{
                dragend: (e) => {
                    const marker = e.target;
                    const newPos = marker.getLatLng();
                    setPosition([newPos.lat, newPos.lng]);
                    setData('latitude', newPos.lat);
                    setData('longitude', newPos.lng);
                },
            }}
        >
            <Popup>Geser marker atau klik peta untuk ubah posisi.</Popup>
        </Marker>
    );
};

export default MarkerDraggableOn;
