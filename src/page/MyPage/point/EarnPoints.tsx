import React, { useEffect, useState } from 'react';
import './EarnPoints.scss'
import api from '../../../api/api';
import { formatDate } from '../../../utils/formatData';

interface PointHistory {
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

const EarnPoints = () => {
  const [pointHistories, setPointHistories] = useState<PointHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPointHistory();
  }, []);

  const getPointHistory = async () => {
    try {
      const response = await api.get<PointHistory[]>('/api/user/record');
      setPointHistories(response.data);
      setLoading(false);
    } catch (error) {
      setError('포인트 히스토리를 불러올 수 없습니다');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='transaction-table'>
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th>포인트</th>
            <th>내역</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {pointHistories.length > 0 ? (
            pointHistories.map((history, index) => (
              <tr key={index}>
                <td>{history.type}</td>
                <td>{history.points}</td>
                <td>{history.description}</td>
                <td>{formatDate(history.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>포인트 히스토리가 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EarnPoints;
