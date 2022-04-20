import { useEffect, useState } from 'react';
import Card from './Card';
import { db } from '../api/Firebase';
import { collection, getDocs } from 'firebase/firestore';
function Main(props) {
  const [dilemmas, setDilemmas] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let docs = [];
      const querySnapshot = await getDocs(collection(db, 'dilemma'));
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() });
      });
      setDilemmas(docs);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [props.data]);
  return (
    <div className='w-full h-full overflow-y-scroll bg-red-300 grid md:grid-cols-3 lg:grid-cols-5'>
      {dilemmas?.map((dilemma) => {
        return <Card key={dilemma.id} data={dilemma} />;
      })}
    </div>
  );
}

export default Main;
