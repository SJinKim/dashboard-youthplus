import React from 'react';

const SignupForm = () => {
  return (
    <>
      <form
        className='my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md'
        action=''
      >
        <div className='my-2'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' className='border mx-2 border-gray-500-rounded' />
        </div>
        <div className='my-2'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='border mx-2 border-gray-500-rounded'
          />
        </div>
        <button
          type='submit'
          className='bg-orange-300 mt-4 rounded flex justify-center items-center w-36'
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
