import React from 'react'
import Navbar from './Navbar'

const Home = () => {
    return (
        <div>
            <div className='box'>
                <form className="d-flex w-75 p-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <h2><u>Results</u></h2>
            <div className='box'>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Alternate contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>3065110809</td>
                            <td>3065101060</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
