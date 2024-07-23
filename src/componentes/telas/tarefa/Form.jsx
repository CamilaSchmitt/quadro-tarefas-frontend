import { useContext } from "react";
import TarefaContext from "./TarefaContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaQuadros }
        = useContext(TarefaContext);

    if(!objeto) return null;
    

    return (
        <Dialogo id="modalEdicao" titulo="Produto"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            {/* <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido="false"
                name="codigo" value={objeto.codigo} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} /> */}
            <CampoEntrada id="txtTitulo" label="Titulo" tipo="text"
                placeholder="Informe o titulo" requerido="true"
                name="titulo" value={objeto.titulo} onchange={handleChange}
                msgvalido="Campo titulo OK" msginvalido="Informe o titulo"
                readonly={false} />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                placeholder="Informe a descrição" requerido="true"
                name="descricao" value={objeto.descricao} onchange={handleChange}
                msgvalido="Campo descrição OK" msginvalido="Informe a descrição"
                readonly={false} />
            <CampoSelect id="selectPrioridade" label="Prioridade"
                requerido="true"
                name="prioridade" value={objeto.prioridade}
                onchange={handleChange}
                msgvalido="Campo prioridade OK" msginvalido="Informe a prioridade"
                readonly={false}>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
            </CampoSelect>
            <CampoEntrada id="txtData" label="Data de criação" tipo="date"
                placeholder="Informe a data de criação" requerido="true"
                name="data_criacao" value={objeto.data_criacao}
                onchange={handleChange}
                msgvalido="Campo data de criação OK" msginvalido="Informe a data de criação"
                readonly={false} />
            <CampoSelect id="selectQuadro" label="Quadro"
                requerido="true"
                name="quadro" value={objeto.quadro}
                onchange={handleChange}
                msgvalido="Campo Quadro OK" msginvalido="Informe o quadro"
                readonly={false}>
                {
                    listaQuadros.map((quadro) => (
                        <option value={quadro.codigo} key={quadro.codigo}>{quadro.nome}</option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;