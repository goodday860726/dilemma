import { db } from '../api/Firebase';
import { useState, useEffect, createElement } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

export default function Result() {
  const params = useParams();
  const [gameId, setGameId] = useState();
  const [resultData, setResultData] = useState();
  useEffect(() => {
    setGameId(params.gId);
  }, []);
  useEffect(() => {
    async function fetchGameData() {
      if (!gameId) return;
      const gameDocRef = doc(db, 'result', gameId);
      const docSnaps = await getDoc(gameDocRef);
      if (docSnaps.exists()) {
        setResultData(docSnaps.data());
      } else {
        console.log('No such document!');
      }
    }
    fetchGameData();
  }, [gameId]);

  function renderResult() {
    return Object.entries(resultData).map(([key, val], i) => {
      return (
        <div key={key}>
          {key}: {val.length}
        </div>
      );
    });
  }

  return (
    <div className='w-full h-full overflow-y-scroll bg-red-300 flex justify-center'>
      {resultData ? <div>{renderResult()}</div> : 'Now Loading...'}
    </div>
  );
}
