import { Link } from 'react-router-dom';
import { app } from '../api/Firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

export default function Card(props) {
  const [imageUrl, setImageUrl] = useState();
  const { id, data } = props.data;
  const storage = getStorage(app);
  const pathReference = ref(storage, `cover/${id}.jpg`);
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
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log(error);
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log(error);
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          console.log(error);
          break;
        default:
          console.log('unexpected error', error);
      }
    });
  return (
    <div className='md:max-w-xs max-h-96 h-auto lg:max-w-sm m-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <div>
        {imageUrl ? (
          <img className='rounded-t-lg' src={imageUrl} alt='' />
        ) : (
          <img className='rounded-t-lg' src='/logo512.png' alt='' />
        )}
      </div>
      <div className='p-5'>
        <div>
          <h5 className='mb-2 text-2xl font-bold tracking-tight overflow-hidden text-gray-900 dark:text-white'>
            {data.title}
          </h5>
        </div>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {data.context}
        </p>
        <Link
          to={`/game/${id}`}
          state={{
            props,
          }}
          className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          {...props}
        >
          시작하기
          <svg
            className='ml-2 -mr-1 w-4 h-4'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
