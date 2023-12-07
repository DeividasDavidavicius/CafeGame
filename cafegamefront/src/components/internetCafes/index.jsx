import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getInternetCafes } from "../../services/internetCafeService";

function InternetCafes() {
    const [internetCafesData, setInternetCafesData] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("Info/"+id)
    }

    const LoadEdit = (id) => {
        navigate("edit/" + id)
    }

    const Remove = (id) => {

    }

    useEffect(()=>{
        const getInternetCafesData = async () => {
            const result = await getInternetCafes();
            setInternetCafesData(result);
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
                                internetCafesData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td><a onClick={()=>{LoadEdit(item.id)}} className="btn btn-success">Edit</a>
                                            <a onClick={()=>{Remove(item.id)}} className="btn btn-danger">Remove</a>
                                            <a onClick={()=>{LoadDetail(item.id)}} className="btn btn-danger">INFO</a>
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
