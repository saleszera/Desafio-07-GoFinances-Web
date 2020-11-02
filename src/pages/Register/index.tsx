import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import { Container, FormContainer, TypeContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import incomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const [type, setType] = useState(true);

  const history = useHistory();

  async function handleSubmitTransaction(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const data = {
      title: name,
      value: parseFloat(value),
      type: type ? 'income' : 'outcome',
      category,
    };

    console.log(data);

    try {
      await api.post('/transactions', data);

      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  return (
    <>
      <Header size="large" />
      <Container>
        <FormContainer onSubmit={handleSubmitTransaction}>
          <h1>Cadastrar</h1>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={value}
            required
            onChange={e => setValue(e.target.value)}
          />
          <TypeContainer>
            <button
              type="button"
              className={type ? 'active' : ''}
              onClick={() => setType(true)}
            >
              <img src={incomeIcon} alt="income" />
            </button>

            <button
              type="button"
              className={!type ? 'active' : ''}
              onClick={() => setType(false)}
            >
              <img src={outcomeIcon} alt="outcome" />
            </button>
          </TypeContainer>
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            required
            onChange={e => setCategory(e.target.value)}
          />

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Todos os campos devem ser preenchidos
            </p>
            <button type="submit">Enviar</button>
          </Footer>
        </FormContainer>
      </Container>
    </>
  );
};

export default Register;
