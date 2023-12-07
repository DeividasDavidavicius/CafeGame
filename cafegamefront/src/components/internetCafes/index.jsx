import { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const CafeList = () => {
    const [internetCafeData, setInternetCafeData] = useState(null);

    useEffect(()=>{
        const apiUrl = `${API_URL}/internetCafes`;

        axios.get(apiUrl)
        .then(response => {
            setInternetCafeData(response.data)
        })
        .catch(error => {
            console.error('Error fetching data', error);
        })
    }, []);

    console.log(internetCafeData);

    return (
        <div className="container">
            <div className ="card">
                <div className="card-title">
                    <h2>Internet cafe list</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Address</td>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CafeList;
