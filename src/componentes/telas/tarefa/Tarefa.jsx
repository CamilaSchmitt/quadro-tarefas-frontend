import { useState, useEffect } from "react";
import TarefaContext from "./TarefaContext";
import { getQuadrosAPI } from "../../../servicos/QuadroServico";
import {
    getTarefasAPI, getTarefaPorCodigoAPI,
    deleteTarefaAPI, cadastraTarefaAPI
} from "../../../servicos/TarefaServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Tarefa() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaQuadros, setListaQuadros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "", descricao: "", prioridade: "", 
        data_criacao: new Date().toISOString().slice(0, 10), quadro: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", titulo: "", descricao: "", prioridade: "",
            data_criacao: new Date().toISOString().slice(0, 10), quadro: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getTarefaPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraTarefaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaTarefas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaTarefas = async () => {
        setCarregando(true);
        setListaObjetos(await getTarefasAPI());
        setCarregando(false);
    }

    const recuperaQuadros = async () => {
        setListaQuadros(await getQuadrosAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteTarefaAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaTarefas();
        }
    }

    useEffect(() => {
        recuperaTarefas();
        recuperaQuadros();
    }, []);

    return (
        <TarefaContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaQuadros
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </TarefaContext.Provider>
    )



}

export default Tarefa;