export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const validateLogin = async (user) => {
    try {
        if (user.name === "" || user.email === "" || user.lastName === "") {
            throw new Error("Todos los campos son obligatorios");
        }
        if (user.name.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }
        if (user.name.length > 30) {
            throw new Error("El nombre debe tener menos de 30 caracteres");
        }
        if (user.lastName.length < 3) {
            throw new Error("El apellido debe tener al menos 3 caracteres");
        }
        if (user.lastName.length > 30) {
            throw new Error("El apellido debe tener menos de 30 caracteres");
        }
        if (!emailRegex.test(user.email)) {
            throw new Error("El email no es válido");
        }
        if (user.email.length < 5) {
            throw new Error("El email debe tener al menos 5 caracteres");
        }
        if (user.email.length > 40) {
            throw new Error("El email debe tener menos de 40 caracteres");
        }
    } catch (error) {
        throw error;
    }
}