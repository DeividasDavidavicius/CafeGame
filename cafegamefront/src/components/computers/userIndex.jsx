import { useNavigate, useParams } from "react-router-dom";
import { getInternetCafe } from "../../services/internetCafeService";
import { useContext, useEffect } from "react";
import SnackbarContext from "../../contexts/SnackbarContext";

const ComputersList = () => {
    const { internetCafeId } = useParams();
    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getInternetCafeData = async () => {
            try{
                await getInternetCafe(internetCafeId);
            }
            catch
            {
                openSnackbar('This internet cafe does not exist!', 'error');
                navigate('/');
            }
        };

        getInternetCafeData();
    }, []);

}

export default ComputersList;
