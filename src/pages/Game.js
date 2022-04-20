import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, app } from '../api/Firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

export default function Game() {
  const params = useParams();
  const [gameId, setGameId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [gameData, setGameData] = useState();
  const [selected, setSelected] = useState();
  const [choice, setChoice] = useState();
  const [resultData, setResultData] = useState();
  const storage = getStorage(app);

  useEffect(() => {
    setGameId(params.gId);
  }, []);
  useEffect(() => {
    async function fetchGameData() {
      if (!gameId) return;
      const gameDocRef = doc(db, 'dilemma', gameId);
      const resultDocRef = doc(db, 'result', gameId);
      const docSnaps = await getDoc(gameDocRef);
      const pathReference = ref(storage, `cover/${gameId}.jpg`);
      getDownloadURL(pathReference)
        .then((url) => {
          setImageUrl(url);
          // Insert url into an <img> tag to "download"
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              console.log('no image', error);
              break;
            default:
              console.log('unexpected error', error);
          }
        });

      if (docSnaps.exists()) {
        console.log('Document data:', docSnaps.data());
        setGameData(docSnaps.data());
      } else {
        console.log('No such document!');
      }
      const resultDocSnaps = await getDoc(resultDocRef);
      if (resultDocSnaps.exists()) {
        console.log('Document data:', resultDocSnaps.data());
        setResultData(resultDocSnaps.data());
      } else {
        console.log('No such document!');
      }
    }
    fetchGameData();
  }, [gameId]);
  let navigate = useNavigate();

  const onSubmit = async (event) => {
    if (!selected) {
      alert('고르고 눌러요!');
      return;
    }
    alert(`당신의 선택은! ${selected}`);
    if (selected) {
      try {
        const resultDocRef = doc(db, 'result', gameId);
        if (resultData === undefined) {
          console.log('undefined');
          let choice1 = gameData.choice1;
          let choice2 = gameData.choice2;
          let resultObj = {};
          resultObj[choice1] = [];
          resultObj[choice2] = [];
          if (choice1 === gameData[choice]) {
            resultObj[choice1].push(Timestamp.now());
          } else {
            resultObj[choice2].push(Timestamp.now());
          }
          await setDoc(resultDocRef, resultObj);
        } else {
          const selectedChoice = gameData[choice];
          resultData[selectedChoice].push(Timestamp.now());
          await updateDoc(resultDocRef, resultData);
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    navigate(`../result/${gameId}`);
  };
  const selectFunc = (event) => {
    const id = event.target.id;
    if (id === choice) {
      setChoice('');
    } else {
      setChoice(event.target.id);
    }
    const selectedStyle = 'bg-white';
    const textValue = event.target.textContent;
    document
      .querySelectorAll(`.${selectedStyle}`)
      .forEach((ele) => ele.classList.remove(selectedStyle));
    const selectedDiv = document.querySelector(`#${event.target.id}`);
    if (selected === textValue) {
      setSelected('');
      selectedDiv.classList.remove(selectedStyle);
    } else {
      setSelected(textValue);
      selectedDiv.classList.add(selectedStyle);
    }
  };
  return (
    <div className='w-full h-full overflow-y-scroll bg-red-300 flex justify-center'>
      {gameData ? (
        <div className='w-11/12 min-h-fit flex flex-col border-4 border-cyan-400 border-solid mt-4 p-6'>
          <div>
            <img className='rounded-t-lg' src={imageUrl} alt='' />
          </div>
          <div>
            질문
            <br />
            <span>{gameData.title}</span>
          </div>
          <div className='my-2 flex justify-evenly'>
            <span
              id='choice1'
              onClick={selectFunc}
              className='rounded-full text-center w-2/5 px-4 py-2 border-2 border-solid border-cyan-800 hover:bg-red-600'
            >
              {gameData.choice1}
            </span>
            <span
              id='choice2'
              onClick={selectFunc}
              className='rounded-full text-center w-2/5 px-4 py-2 border-2 border-solid border-cyan-800 hover:bg-red-600'
            >
              {gameData.choice2}
            </span>
          </div>
          <button onClick={onSubmit} className=' self-center'>
            결정
          </button>
        </div>
      ) : (
        'now Loading'
      )}
    </div>
  );
}
