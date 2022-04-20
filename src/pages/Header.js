import { NavLink } from 'react-router-dom';

function Header() {
  const navStyle = 'w-1/3 uppercase';
  const activeStyle = 'underline text-white';
  return (
    <header className='w-full bg-slate-500 h-12 flex justify-between px-4 items-center'>
      <span>📚</span>
      <div className=' w-full h-full flex flex-row justify-evenly items-center text-center'>
        <NavLink
          className={(navData) =>
            navData.isActive ? `${activeStyle} ${navStyle}` : navStyle
          }
          to='/'
        >
          top
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? `${activeStyle} ${navStyle}` : navStyle
          }
          to='/newdilemma'
        >
          NewDilemma
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? `${activeStyle} ${navStyle}` : navStyle
          }
          to='/info'
        >
          Info
        </NavLink>
      </div>
      <div>
        <NavLink to='/login'>login</NavLink>
      </div>
    </header>
  );
}

export default Header;
