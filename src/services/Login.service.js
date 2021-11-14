import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseURL = process.env.REACT_APP_API_URL;

const loginService = async (respGoogle, auth) => {
    const MySwal = withReactContent(Swal);

    if (respGoogle.error) {
        MySwal.fire({
            icon: "error",
            title: "Error",
            html: <h1>Error al iniciar sesión</h1>,
            timer: 2000,
            timerProgressBar: true,
        });
        return;
    } else {
        try {
            const { status, data } = await axios({
                method: "POST",
                url: `${baseURL}/auth/login`,
                headers: {
                    Authorization: `Bearer ${respGoogle.tokenId}`,
                },
            });
            if (status === 200) {
                auth.set_Token(data.token);
                auth.set_User({
                    name: data.name,
                    uid: data.uid,
                    picture: data.picture,
                    rol: data.rol,
                });
            } else if (status === 201) {
                MySwal.fire({
                    icon: "success",
                    title: "Bienvenido",
                    html: <h1>{data.msg}</h1>,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch ({ response }) {
            if (response.status === 401) {
                MySwal.fire({
                    icon: "warning",
                    title: "Opps...",
                    html: <h1>{response.data.msg}</h1>,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } else {
                MySwal.fire({
                    icon: "error",
                    title: "Error",
                    html: <h1>{response.data.msg}</h1>,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        }
    }
};

export { loginService };
