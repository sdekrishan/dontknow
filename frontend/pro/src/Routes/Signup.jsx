import React from 'react'

const Signup = () => {
  return (
    <div>
        <form action="">
            <label htmlFor="">Username</label>
            <input type="text"  />
            <label htmlFor="">Email</label>
            <input type="email"  />
            <label htmlFor="">Date of Birth</label>
            <input type="date"  />
            <label htmlFor="">Role</label>
            <select name="" id="">
                <option value="">Admin</option>
                <option value="">Explorer</option>
            </select>

            <label htmlFor="">Location</label>
            <input type="text" />
            <label htmlFor="">Password</label>
            <input type="password"  />
            <label htmlFor="">Confirm  Password</label>
            <input type="password"  />

        </form>
    </div>
  )
}

export default Signup