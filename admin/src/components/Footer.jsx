import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
        <footer className='text-center'>
      <div className='text-center text-white p-2'>
        © {currentYear} Copyright: {''}
        <Link className='text-decoration-none text-white fw-bold' href='#'>
           shoppet.com
        </Link>
      </div>
    </footer>
  
  );
};
export default Footer;
