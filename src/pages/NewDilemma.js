import { db, app } from '../api/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

export default function NewDilemma() {
  const [coverFile, setCoverFile] = useState();

  const storage = getStorage(app);
  const changeHandler = (event) => {
    if (event.target.files[0]) {
      setCoverFile(event.target.files[0]);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, context, question, choice1, choice2, email } = event.target;
    try {
      const docRef = await addDoc(collection(db, 'dilemma'), {
        title: title.value,
        context: context.value,
        question: question.value,
        choice1: choice1.value,
        choice2: choice2.value,
        email: email.value,
      });
      const storageRef = ref(storage, `cover/${docRef.id}.jpg`);

      uploadBytes(storageRef, coverFile).then(() => {
        console.log('Uploaded file!');
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className='w-full h-full p-8 overflow-y-scroll bg-red-300 flex justify-center'>
      <form className='w-5/6' onSubmit={onSubmit}>
        <div className='grid xl:grid-cols-2 xl:gap-6'>
          <div className='relative z-0 mb-6 w-full group'>
            <input
              type='text'
              name='title'
              id='title'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder='.      메인에 표시되는 제목'
              required
            />
            <label
              htmlFor='title'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              제목
            </label>
          </div>
          <div className='relative z-0 mb-6 w-full group'>
            <input
              type='text'
              name='context'
              id='context'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder='.      메인에 표시되는 설명문'
              // required
            />
            <label
              htmlFor='context'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              설명
            </label>
          </div>
        </div>
        <div className='grid xl:grid-cols-2 xl:gap-6'>
          <div className='relative z-0 mb-6 w-full group'>
            <input
              type='text'
              name='question'
              id='question'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              // required
            />
            <label
              htmlFor='question'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              질문
            </label>
          </div>
          <div className='relative z-0 mb-6 w-full group'>
            <input
              type='text'
              name='choice1'
              id='choice1'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              // required
            />
            <label
              htmlFor='choice1'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              보기1
            </label>
          </div>
          <div className='relative z-0 mb-6 w-full group'>
            <input
              type='text'
              name='choice2'
              id='choice2'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              // required
            />
            <label
              htmlFor='choice2'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              보기2
            </label>
          </div>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='email'
            name='email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            // required
          />
          <label
            htmlFor='email'
            className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Email address
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='file'
            name='file'
            onChange={changeHandler}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            // required
          />
          <label
            htmlFor='file'
            className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Cover Image
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
