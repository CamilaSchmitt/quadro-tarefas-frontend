import { useContext } from "react";
import QuadroContext from "./QuadroContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(QuadroContext);

    return (
        <Dialogo id="modalEdicao" titulo="Quadro"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            {/* <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido="false"
                name="codigo" value={objeto.codigo} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} /> */}
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                placeholder="Informe o nome" requerido="true"
                name="nome" value={objeto.nome} onchange={handleChange}
                msgvalido="Campo nome OK" msginvalido="Informe o nome"
                readonly={false} />
            <CampoEntrada id="txtAutor" label="Autor" tipo="text"
                placeholder="Informe o autor" requerido="true"
                name="autor" value={objeto.autor} onchange={handleChange}
                msgvalido="Campo autor OK" msginvalido="Informe o autor"
                readonly={false} />
        </Dialogo>
    )
}

export default Form;