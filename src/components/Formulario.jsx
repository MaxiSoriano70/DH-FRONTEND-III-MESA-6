import { useState } from "react";

const Formulario = () => {
    const [usuarioDatos, setUsuarioDatos] = useState({
        nombre: "",
        edad: "",
        pokemon: ""
    });

    const [show, setShow] = useState(false);
    const [nombreValido, setNombreValido] = useState(false);
    const [edadValido, setEdadValido] = useState(false);
    const [pokemonValido, setPokemonValido] = useState(false);

    const [nombreError, setNombreError] = useState(true);
    const [edadError, setEdadError] = useState(true);
    const [pokemonError, setPokemonError] = useState(true);

    const resetFormulario = () => {
        setUsuarioDatos({
            nombre: "",
            edad: "",
            pokemon: ""
        });
        setNombreValido(false);
        setEdadValido(false);
        setPokemonValido(false);
        setNombreError(true);
        setEdadError(true);
        setPokemonError(true);
        setShow(false);
    };

    const handleChangeNombre = (e) => {
        setUsuarioDatos({ ...usuarioDatos, nombre: e.target.value });
        setNombreValido(validarNombre(e.target.value));
        setNombreError(validarNombre(e.target.value));
    };

    const handleChangeEdad = (e) => {
        setUsuarioDatos({ ...usuarioDatos, edad: e.target.value });
        setEdadValido(validarEdad(e.target.value));
        setEdadError(validarEdad(e.target.value));
    };

    const handleChangePokemon = (e) => {
        setUsuarioDatos({ ...usuarioDatos, pokemon: e.target.value });
        setPokemonValido(validarPokemon(e.target.value));
        setPokemonError(validarPokemon(e.target.value));
    };

    const validarNombre = (nombre) => {
        if(nombre.trim().length >= 3 && nombre.includes(" ")){
            return true;
        }
        else{
            return false;
        }
    };

    const validarEdad = (edad) => {
        const auxEdad = parseInt(edad, 10) || "";
        if(auxEdad >= 1 && auxEdad !== ""){
            return true;
        }
        else{
            return false;
        }
    };

    const validarPokemon = (pokemon) => {
        if(pokemon === "Lucario" || pokemon === "Charizard" || pokemon === "Buizel"){
            return true;
        }
        else{
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombreValido && edadValido && pokemonValido){
            setShow(true);
        }
        else{
            setShow(false);
            if(!nombreValido){
                setNombreError(false);
                setShow(false);
            }
            if(!edadValido){
                setEdadError(false);
                setShow(false);
            }
            if(!pokemonValido){
                setPokemonError(false);
                setShow(false);
            }
        }
    };

    return (
        <div className="container is-max-tablet">
            {show?
                <div className="card has-background-primary">
                    <div className="card-content">
                        <div className="content">
                            <p className="has-text-primary-invert">Nombre: {usuarioDatos.nombre}</p>
                            <p className="has-text-primary-invert">Edad: {usuarioDatos.edad}</p>
                            <p className="has-text-primary-invert">Pokemon: {usuarioDatos.pokemon}</p>
                        </div>
                        <div className="control">
                            <button className="button is-link is-dark" onClick={resetFormulario}>Volver a cargar datos</button>
                        </div>
                    </div>
                </div>
            :
            <form onSubmit={handleSubmit}>
                <div className="field m-4">
                    <label className="label" htmlFor="inputNombreApelldo">Nombre y apellido</label>
                    <div className="control">
                        <input
                            className={`input ${nombreError ? "is-success" : "is-danger"}`}
                            value={usuarioDatos.nombre}
                            type="text"
                            id="inputNombreApelldo"
                            onChange={handleChangeNombre}
                            onBlur={handleChangeNombre}
                            placeholder="Ingrese nombre y apellido..."
                        />
                    </div>
                    {!nombreError ?
                    <article className="m-2 message is-danger">
                        <div className="message-body">
                            Error ingrese su nombre y apellido.
                        </div>
                    </article>:
                    ""
                    }
                </div>
                <div className="field m-4">
                    <label className="label" htmlFor="inputEdad">Edad</label>
                    <div className="control">
                        <input
                            className={`input ${edadError ? "is-success" : "is-danger"}`}
                            value={usuarioDatos.edad}
                            type="number"
                            id="inputEdad"
                            onChange={handleChangeEdad}
                            onBlur={handleChangeEdad}
                            placeholder="Ingrese edad..."
                        />
                    </div>
                    {!edadError ?
                    <article className="m-2 message is-danger">
                        <div className="message-body">
                            Error ingrese su edad.
                        </div>
                    </article>:
                    ""
                    }
                </div>
                <div className="field m-4">
                    <label className="label" htmlFor="pokemon">Pokemon</label>
                    <div className="control">
                        <div className={`select ${pokemonError ? "is-success" : "is-danger"}`}>
                            <select id="pokemon" value={usuarioDatos.pokemon} onChange={handleChangePokemon} onBlur={handleChangePokemon}>
                                <option value="">Seleccione un Pokemon</option>
                                <option value="Lucario">Lucario</option>
                                <option value="Charizard">Charizard</option>
                                <option value="Buizel">Buizel</option>
                            </select>
                        </div>
                        {!pokemonError?
                        <article className="m-2 message is-danger">
                            <div className="message-body">
                                Error eliga un pokemon.
                            </div>
                        </article>:
                        ""
                        }
                    </div>
                </div>
                <div className="field m-4 is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Enviar</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" type="reset" onClick={resetFormulario}>Cancelar</button>
                    </div>
                </div>
            </form>
            }
        </div>
    );
};

export default Formulario;
