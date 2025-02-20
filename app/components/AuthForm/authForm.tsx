'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions/auth';
import { signIn } from 'next-auth/react';

const AuthForm: React.FC = () => {
  const router = useRouter();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  // Load stored email when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name); // Only needed for signup
        await signup(formData); // Pass FormData
        router.push('/'); // Redirect after signup
      } else {
        // Login using NextAuth credentials
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError('Invalid email or password');
          return;
        }
      }

      // Store email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      router.push('/'); // Redirect after login/signup
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img src='/yp_logo.png' alt='logo' className='w-13 h-12 mb-4' />
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              {isSignup ? 'Sign Up' : 'Log In'}
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              {isSignup && (
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isSignup && (
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        type='checkbox'
                        id='remember'
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='remember'
                        className='text-gray-500 dark:text-gray-300'
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
              )}
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                {isSignup
                  ? 'Already have an account?'
                  : 'Don’t have an account yet?'}{' '}
                <button
                  type='button'
                  onClick={() => setIsSignup(!isSignup)}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  {isSignup ? 'Log in' : 'Sign up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
