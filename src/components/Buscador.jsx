import { useState } from "react";
import Input from "./Input";


const Buscador = ({ onSelect, placeholder }) => {
    const [inputValue, setInputValue] = useState('');
    const [paisesFiltrados, setPaisesFiltrados] = useState([]);
    // let url_base = `http://localhost:4000/v1/api-reservas/`;
    let url_base = `https://reservas-back-flame.vercel.app/v1/api-reservas/`;

    const handleInputChange = async (event) => {
        const input = event.target.value;
        setInputValue(input);

        if (input.length > 0) {
            fetch(`${url_base}search-paises`, {
                method: 'POST',
                body: JSON.stringify({ busqueda: input }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setPaisesFiltrados(response);
            });

        } else {
            setPaisesFiltrados([]);
        }
    };

    const seleccionarPais = (pais) => {
        onSelect(pais);
        setInputValue(pais.name);
        setPaisesFiltrados([]);
    };

    return (
        <div>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {paisesFiltrados.length > 0 && (
                <ul className="border rounded-md h-[200px] z-50 relative overflow-y-auto">
                    {paisesFiltrados.map((pais) => (
                        <li className="p-1 cursor-pointer hover:bg-dusty-red hover:text-white hover:rounded-md" key={pais._id} onClick={() => seleccionarPais(pais)}>
                            {pais.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Buscador;
