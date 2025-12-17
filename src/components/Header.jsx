import { deleteUsers } from '../api/endpoints';
import { useNavigate } from 'react-router';
import { isMobile } from "react-device-detect";
import { toast } from 'sonner';
const VITE_API_URL = import.meta.env.VITE_ADMIN_PASSWORD;

const Header = () => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        if (isMobile) return;
        try {
            const confirmed = await new Promise((resolve) => {
                const toastId = toast('Reiniciar actividad', {
                    action: {
                        label: 'Eliminar',
                        onClick: () => {
                            toast.dismiss(toastId);
                            resolve(true);
                        }
                    },
                    cancel: {
                        label: 'Cancelar',
                        onClick: () => {
                            toast.dismiss(toastId);
                            resolve(false);
                        }
                    },
                    duration: Infinity
                });
            });

            if (!confirmed) return;

            await deleteUsers(VITE_API_URL);
            toast.success('Actividad reiniciada correctamente');
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'No se pudo completar la eliminación. Intenta de nuevo.';
            toast.error(message);
        }
    }
    return (
        <div className='fixed top-0 left-0 right-0 flex w-full h-28 justify-center items-center px-4 py-2 z-20 bg-gradient-to-b from-black  to-transparent z-[200]'>
            <img src='/logo.png' alt='logo' className='h-12 drop-shadow-md shadow-black cursor-pointer' onClick={handleDelete} />
        </div>
    )
}

export default Header
