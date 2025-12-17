import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { deleteUsers } from '../api/endpoints';

const Delete = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setBackground } = useOutletContext();

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password.trim()) {
      toast.error('Ingresa la contraseña de administrador.');
      return;
    }
    try {
      setLoading(true);
      await deleteUsers(password.trim());
      toast.success('Usuarios eliminados correctamente.');
      setPassword('');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'No se pudo completar la eliminación. Intenta de nuevo.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 relative h-dvh w-full flex flex-col justify-center items-center z-20'>
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-purple-400/45 to-transparent z-10' />
      <div className='flex flex-col justify-center items-center w-full max-w-lg z-20'>
        <motion.h1
          animate={{ opacity: [0, 1], translateY: [10, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='text-white text-2xl font-black text-center mb-4'
        >
          Eliminar participantes
        </motion.h1>
        <motion.p
          animate={{ opacity: [0, 1], translateY: [10, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className='text-white text-center mb-6'
        >
          Ingresa la contraseña de administrador para borrar todos los usuarios.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          animate={{ opacity: [0, 1], translateY: [10, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className='w-full flex flex-col gap-4 bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-md shadow-xl'
        >
          <label className='flex flex-col gap-2 text-white text-lg font-semibold'>
            Contraseña
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-12 bg-white text-black text-lg px-4 rounded-lg border-3 border-purple-400 focus:outline-none'
              placeholder='••••••'
              autoComplete='off'
            />
          </label>
          <button
            type='submit'
            disabled={loading}
            className='w-full h-12 bg-purple-500 text-white text-lg font-bold rounded-lg shadow-md transition hover:bg-purple-600 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Eliminando...' : 'Eliminar usuarios'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Delete;
