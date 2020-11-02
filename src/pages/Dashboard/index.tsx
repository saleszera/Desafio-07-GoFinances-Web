import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import alert from '../../assets/alert.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  EmptyContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      if (!response.data) {
        return;
      }

      const {
        transactions: transactionData,
        balance: balanceData,
      } = response.data;

      const transactionFormatted = transactionData.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Intl.DateTimeFormat().format(
            new Date(transaction.created_at),
          ),
        }),
      );

      const balanceFormatted = {
        income: formatValue(balanceData.income),
        outcome: formatValue(balanceData.outcome),
        total: formatValue(balanceData.total),
      };

      setTransactions(transactionFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header size={transactions.length ? 'large' : 'small'} />
      {transactions.length ? (
        <Container>
          <CardContainer>
            <Card>
              <header>
                <p>Entradas</p>
                <img src={income} alt="Income" />
              </header>
              <h1 data-testid="balance-income">{balance.income}</h1>
            </Card>
            <Card>
              <header>
                <p>Saídas</p>
                <img src={outcome} alt="Outcome" />
              </header>
              <h1 data-testid="balance-outcome">{balance.outcome}</h1>
            </Card>
            <Card total>
              <header>
                <p>Total</p>
                <img src={total} alt="Total" />
              </header>
              <h1 data-testid="balance-total">{balance.total}</h1>
            </Card>
          </CardContainer>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {transaction.formattedValue}
                    </td>
                    <td>
                      {transaction.category
                        ? transaction.category.title
                        : 'Sem Categoria'}
                    </td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Container>
      ) : (
        <Container>
          <EmptyContainer>
            <img src={alert} alt="alert" />
            <p>Nenhuma transação cadastrada até o momento</p>
            <span>
              Cadastre ou importe uma transação para que seja listada aqui!
            </span>
          </EmptyContainer>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
