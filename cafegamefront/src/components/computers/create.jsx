import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import SnackbarContext from "../../contexts/SnackbarContext";

function CreateComputer() {
    const [ram, setRam] = useState("");
    const [cpu, setCpu] = useState("");
    const [gpu, setGpu] = useState("");
    const [monitorResolution, setMonitorResolution] = useState("");
    const [monitorRefreshRate, setMonitorRefreshRate] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, role, accessToken, refreshToken, setLogin, setLogout } = useUser();
    const openSnackbar = useContext(SnackbarContext);

    useEffect(() => {
        if (!role.includes("Admin")) {
            openSnackbar('Only admins can edit internet cafes!', 'error');
            navigate('/');
        }
    }, []);

}

export default CreateComputer;
