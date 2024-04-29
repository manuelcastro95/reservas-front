// Reservas.js
import React, { useEffect, useState } from 'react';
import Label from '../components/Label';
import Buscador from '../components/Buscador';
import Input from '../components/Input';
import fondo from '../assets/reservas.png';
import Swal from 'sweetalert2'

const Reservas = () => {
    const [key, setKey] = useState(0); 
    const [fecha, setFecha] = useState('');
    const [paisOrigen, setPaisOrigen] = useState(null);
    const [paisDestino, setPaisDestino] = useState(null);
    const [reservas, setReservas] = useState([]);
    // const url_base = `http://localhost:4000/v1/api-reservas/`;
    const url_base = `https://reservas-back-flame.vercel.app/v1/api-reservas/`;

    const cargarReservas = async () => {
        let data = await fetch(`${url_base}get-reservas`)
            .then(res => res.json())
            .then(data => data)
        setReservas(data)
    }


    const registrarReserva = async (e) => {
        e.preventDefault();

        if(paisOrigen == null ){
            Swal.fire({
                title: '',
                text: `Debe seleccionar un pais Origen`,
                icon: 'warning',
                confirmButtonText: 'Cerrar'
            })
            return null;
        }
        if(paisDestino == null ){
            Swal.fire({
                title: '',
                text: `Debe seleccionar un pais Origen`,
                icon: 'warning',
                confirmButtonText: 'Cerrar'
            })
            return null;
        }

    
        let datos = {
            pais_origen_id: paisOrigen._id,
            pais_destino_id: paisDestino._id,
            fecha: fecha
        }

        fetch(`${url_base}store-reserva`, {
            'method': 'POST',
            'body': JSON.stringify(datos),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => {
                Swal.fire({
                    title: '',
                    text: `${error}`,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            })
            .then((response) => {
                
                if(response.icon === 'success'){
                    setFecha(''); 
                    setPaisOrigen(null);
                    setPaisDestino(null);
                    setKey(prevKey => prevKey + 1);
                    cargarReservas();
                }
                Swal.fire({
                    title: '',
                    text: `${response.mensaje}`,
                    icon: `${response.icon}`,
                    confirmButtonText: 'Cerrar'
                })
            });
    }

    const formatear_fecha = (fecha) => {
        // Crear una fecha en UTC
        let f_format = new Date(fecha);
        f_format = new Date(f_format.getTime() + f_format.getTimezoneOffset() * 60000);
    
        let dia = f_format.getUTCDate();
        dia = dia < 10 ? `0${dia}` : dia;
    
        let mes = f_format.getUTCMonth() + 1;
        mes = mes < 10 ? `0${mes}` : mes;
    
        let anio = f_format.getUTCFullYear();
    
        return `${dia}-${mes}-${anio}`;
    }
    
    useEffect(() => {
        cargarReservas();
    }, [])

    return (
        <div className="container flex items-center justify-center">
            <div className="border p-6 w-[900px] mx-auto mt-8 h-[700px] rounded-xl">
                <div className='w-full mb-6'>
                    <img
                        src={fondo}
                        alt="fondo"
                        className='rounded-md h-24 w-full object-fill '
                    />
                </div>
                <form className="grid grid-cols-2 gap-4" onSubmit={registrarReserva}>
                    <div>
                        <Label htmlFor="origen" className="text-dark-charcoal">Pais Origen</Label>
                        <Buscador
                            onSelect={(pais) => setPaisOrigen(pais)}
                            placeholder="Buscar pais de origen"
                        />
                    </div>
                    <div>
                        <Label htmlFor="destino" className="text-dark-charcoal">Pais Destino</Label>
                        <Buscador
                            onSelect={(pais) => setPaisDestino(pais)}
                            placeholder="Buscar pais de destino"
                        />
                    </div>
                    <div>
                        <Label htmlFor="fecha" className="text-dark-charcoal">Fecha</Label>
                        <Input
                            key={key}
                            type="date"
                            id="fecha"
                            name="fecha"
                            required
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-dusty-red hover:bg-dusty-red-dark text-white border border-dusty-red hover:border-dusty-red-dark focus:ring-4 focus:outline-none focus:ring-dusty-red-light font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
                <div className=' w-44 mx-auto mt-6'>
                    <h1>Reservas Realizadas</h1>
                </div>

                <div className='mt-6'>
                    <div className="w-full relative overflow-y-auto h-[300px]">
                        <table className="table w-full">
                            <thead className="text-background-light bg-dusty-red rounded-xl">
                                <tr>
                                    <th className="py-2 border-b px-5 text-left rounded-tl-xl">Origen</th>
                                    <th className="py-2 border-b px-5 text-left">Destino</th>
                                    <th className="py-2 border-b px-5 text-left rounded-tr-xl">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark-charcoal">
                                {reservas.map((reserva, i) =>
                                    <tr key={i}>
                                        <td className="border-b p-2">{reserva.pais_origen.name}</td>
                                        <td className="border-b p-2">{reserva.pais_destino.name}</td>
                                        <td className="border-b p-2">{formatear_fecha(reserva.fecha)}</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservas;
