import React from 'react';

function LoginSignup() {
  return (
    <div>
      <h2>Welcome to the Login/Signup Page!</h2>
      <div>
        <form>
          <h3>Login</h3>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>

        <form>
          <h3>Signup</h3>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" required />
          </div>
          <div>
            <label htmlFor="signupEmail">Email:</label>
            <input type="email" id="signupEmail" name="signupEmail" required />
          </div>
          <div>
            <label htmlFor="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;