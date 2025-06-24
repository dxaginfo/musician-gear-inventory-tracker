import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null);
      await signIn(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid email address format.');
          break;
        case 'auth/user-disabled':
          setErrorMessage('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          setErrorMessage('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password.');
          break;
        default:
          setErrorMessage('Failed to login. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | Musician Gear Tracker</title>
        <meta name="description" content="Log in to manage your musical gear inventory" />
      </Head>

      <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-12 mx-auto"
            src="/logo.svg"
            alt="Musician Gear Tracker"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{' '}
            <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            {errorMessage && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                <p>{errorMessage}</p>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none sm:text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                    {...register('email', { 
                      required: 'Email is required', 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none sm:text-sm ${errors.password ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                    {...register('password', { 
                      required: 'Password is required', 
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-6">
                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C8.089 2 4.417 5.071 3.122 9.067a9.996 9.996 0 000 5.866C4.417 18.93 8.089 22 12.545 22c4.307 0 8.018-2.885 9.217-6.86a9.916 9.916 0 00.598-3.356 10.572 10.572 0 00-.116-1.545h-9.699z" />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}