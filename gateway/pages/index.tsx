// gateway/pages/index.tsx
import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next'; // Tipe NextPage

// Mendefinisikan tipe data yang diharapkan dari GraphQL
interface GoalData {
  id: number;
  title: string;
  status: string;
  userId: number;
}

interface QueryResult {
  getGoal: GoalData | null;
}

const GET_GOAL_QUERY = gql`
  query GetGoalQuery($goalId: Int!) {
    getGoal(id: $goalId) {
      id
      title
      status
      userId
    }
  }
`;

const GoalDisplay: NextPage = () => {
  const GOAL_TO_FETCH = 42;

  // Menggunakan tipe QueryResult untuk useQuery
  const { loading, error, data } = useQuery<QueryResult>(GET_GOAL_QUERY, {
    variables: { goalId: GOAL_TO_FETCH },
  });

  if (loading) return <h1>Loading Goal #{GOAL_TO_FETCH}...</h1>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <h1>❌ Error loading goal: {error.message}</h1>;
  }

  const goal = data?.getGoal;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🎯 Goal Tracking App (Next.js TypeScript)</h1>
      {goal ? (
        <div style={{ border: '2px solid #0070f3', padding: '20px', background: '#e6f7ff' }}>
          <h2>✅ Data Berhasil Diterima dari GoLang</h2>
          <p><strong>Goal ID:</strong> {goal.id}</p>
          <p><strong>Title:</strong> {goal.title}</p>
          <p><strong>Status:</strong> {goal.status}</p>
          <p><strong>Source:</strong> Goal Service (GoLang)</p>
        </div>
      ) : (
        <p>Goal tidak ditemukan.</p>
      )}
    </div>
  );
};

export default GoalDisplay;