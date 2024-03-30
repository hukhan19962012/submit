import { loginAuthUser } from '../func/authUser'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


export const Login = (props) => {
    const [state, setState] = useState({ selectedUser: '', shouldRedirect: false })
    const handleChange = (id) => {
        setState((preState) => ({ selectedUser: id }))
    }

    const login = (e) => {
        e.preventDefault()

        let uId = state.selectedUser
        let user = users.find(x => x.id === uId)
        let name = user.name
        let picture = picture.avatarURL
        dispatch(loginAuthUser(uId, name, picture))
        setState((prevState) => ({
            ...prevState,
            shouldRedirect: true
        }))
    }

    let { from } = window.location.pathname || { from: { pathname: '/' } }
    if (from.pathname === '/login' || from.pathname === '/logout') {
        from.pathname = '/'
    }

    if (state.shouldRedirect === true) {
        return <Redirect to={from} />
    }

    return (<>
        <h3 className='text-center'>Please login:</h3>
        <br></br>
        {loading ? null :
            <>
                <div className='row justify-content-center'>
                    {Object.keys(users).map(u => (
                        <div key={u.id} className={'card m-2 loginCard ' + (u.id === state.selectedUser ? 'border-success' : '')} style={{ width: 14 + 'rem', cursor: 'pointer' }} onClick={() => handleChange(u.id)}>
                            <img className="card-img-top" src={u.avatarURL} alt="Avatar" />
                            <div className="card-body">
                                <p className="card-text text-center">{u.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <button className="btn btn-lg btn-outline-success mx-auto" type="button" onClick={login} disabled={!state.selectedUser.length > 0}>Login</button>
                </div>
            </>}
    </>)

}

function mapStateToProps({ users }) {
    return {
        users,
        loading: users === null,
    }
}

export default connect(mapStateToProps)(Login)