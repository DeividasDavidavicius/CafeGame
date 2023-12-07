import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getInternetCafes } from "../../services/internetCafeService";

const CafeList = () => {
    const [internetCafeData, setInternetCafeData] = useState([]);

    useEffect(()=>{
        const getInternetCafeData = async () => {
            const result = await getInternetCafes();
            setInternetCafeData(result);
            console.log(result);
        };

        getInternetCafeData();
    }, []);


    return (
        <div className="container">
            <div className ="card">
                <div className="card-title">
                    <h2>Internet cafe list</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="create" className="btn btn-primary">Add internet cafe (+)</Link>
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
                                internetCafeData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td><a className="btn btn-success">Edit</a>
                                            <a className="btn btn-danger">Remove</a>
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

export default CafeList;
