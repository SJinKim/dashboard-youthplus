import Navbar from '../components/Navbar/navbar';
import User from '../components/User/user';

export default async function Home() {
  return (
    <>
      <Navbar />
      <h1 className='text-2xl'>HOME</h1>
      <h2>User session</h2>
      <User />
    </>
  );
}
