import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const endPoint = `https://viacep.com.br/ws/`;
  const [cepData, setCepData] = useState({});
  const [inputCep, setInputCep] = useState(""); // variável para capturar o valor do input

  const buscaCEP = async () => {
    try {
      const response = await axios.get(`${endPoint}${inputCep}/json`); // Usando o valor do inputCep
      setCepData(response.data);
    } catch (error) {
      console.log("Erro ao consultar cep", error);
    }
  };

  return (
    <>
      <label htmlFor="buscaCEP">Digite seu CEP </label>
      <input
        type="text"
        name="buscaCEP"
        id="buscaCEP"
        value={inputCep} // Valor do input controlado pela nova variável de estado
        onChange={(e) => setInputCep(e.target.value)} // Atualizando o valor digitado
      />
      {inputCep}
      <button type="button" onClick={buscaCEP}>
        Pesquisar
      </button>

      {/* Exibindo os dados do CEP, se disponíveis */}
      {cepData.cep ? (
        // Se o CEP for encontrado, exibe os dados
        <div>
          <p>
            <strong>CEP:</strong> {cepData.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {cepData.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {cepData.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {cepData.localidade}
          </p>
          <p>
            <strong>UF:</strong> {cepData.uf}
          </p>
        </div>
      ) : (
        // Senão, exibe uma mensagem alternativa
        <p>CEP não encontrado ou ainda não pesquisado.</p>
      )}
    </>
  );
}

export default App;
