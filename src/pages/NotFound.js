import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='w-full h-full overflow-y-scroll bg-red-300 grid md:grid-cols-3 lg:grid-cols-5'>
    <h1>404 - Not Found!</h1>
    <Link to='/'>Go Home</Link>
  </div>
);

export default NotFound;
