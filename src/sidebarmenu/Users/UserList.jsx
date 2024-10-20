import React from 'react';


export default function UserList() {
    return (
        <div>
            <div className="flex flex-row justify-center py-2">
                <h2 className="text-green-600 font-semibold">User List</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-slate-200 font-semibold text-green-600 text-sm">
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://i.ibb.co.com/WvpK7VD/Ajoy-Ajoy-Paul.jpg"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Ajoy Kumar Paul</div>
                                        <div className="text-sm opacity-50">Web Application Developer</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                DoICT
                                <br />
                                <span className="badge badge-ghost badge-sm">ICT Work</span>
                            </td>
                            <td>Purple</td>
                            <th className="space-x-2">
                                <button className="btn btn-warning">Edit</button>
                                <button className="btn btn-error">Delete</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
