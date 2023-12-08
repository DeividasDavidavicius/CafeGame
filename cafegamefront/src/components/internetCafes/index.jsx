import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { deleteInternetCafe, getInternetCafes } from "../../services/internetCafeService";
import { checkTokenValidity, refreshAccessToken } from "../../services/authentication";
import SnackbarContext from "../../contexts/SnackbarContext";
import { useUser } from "../../contexts/UserContext";

function InternetCafes() {
    const [internetCafesData, setInternetCafesData] = useState([]);
    const openSnackbar = useContext(SnackbarContext);
    const navigate = useNavigate();
    const { isLoggedIn, role, accessToken, refreshToken, setLogin, setLogout } = useUser();

    const LoadEdit = (id) => {
        navigate("edit/" + id)
    }

    const findInternetCafeById = (id) => {
        const foundCafe = internetCafesData.find((cafe) => cafe.id === id);

        return foundCafe;
      };

    const Remove = async (id) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!checkTokenValidity(accessToken)) {
            const result = await refreshAccessToken();
            if (!result.success) {
                openSnackbar('You need to login!', 'error');
                setLogout();
                navigate('/login');
                return;
            }

            setLogin(result.response.data.accessToken, result.response.data.refreshToken);
        }

        if(window.confirm(`Do you want to remove '${findInternetCafeById(id).name}'?`))
        {
            deleteInternetCafe(id);

            const updatedInternetCafes = internetCafesData.filter(
                (internetCafe) => internetCafe.id !== id
              );
            setInternetCafesData(updatedInternetCafes);
        }
    }

    useEffect(()=>{
        const getInternetCafesData = async () => {
            const result = await getInternetCafes();
            const sortedResult = [...result].sort((a, b) => a.id - b.id);
            setInternetCafesData(sortedResult);
        };

        getInternetCafesData();
    }, []);


    return (
        <div className="container">
            <div className ="card">
                <div className="card-title">
                    <h2>Internet cafe list</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="create" className="btn btn-outline-success">Add internet cafe (+)</Link>
                    </div>
                    <div style={{ height: '10px' }}/>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td className="bg-dark text-white">ID</td>
                                <td className="bg-dark text-white">Name</td>
                                <td className="bg-dark text-white">Address</td>
                                <td className="bg-dark text-white">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                internetCafesData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td><a onClick={()=>{LoadEdit(item.id)}} className="btn btn-outline-primary">Edit</a>
                                            <a onClick={()=>{Remove(item.id)}} className="btn btn-outline-danger">Remove</a>
                                            <a onClick={()=>{Remove(item.id)}} className="btn btn-outline-dark">Info</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InternetCafes;
