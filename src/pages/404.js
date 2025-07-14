import Link  from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
