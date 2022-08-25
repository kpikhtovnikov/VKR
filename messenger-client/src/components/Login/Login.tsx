import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { initiateSignin, setAuthFailed } from "redux/reducers/auth";
import s from "./login.module.scss";
import { GoogleLogin } from "react-google-login";
import webLogo from "./tab-picture.png";
import { useState } from "react";

const passStateToProps = ({ authState }: any) => ({
  authLoading: authState.loading,
  authError: authState.error,
  authState: authState.auth,
});

const passDispatchToProps = (dispatch: any) => ({
  initiateSignin: (payload: any) => dispatch(initiateSignin(payload)),
  setAuthFailed: (payload: any) => dispatch(setAuthFailed(payload)),
});

export const Login = connect(
  passStateToProps,
  passDispatchToProps
)(({ initiateSignin, authLoading, authError, setAuthFailed }: any) => {

  const [company, setCompany] = useState('');
  const [employee, setEmployee] = useState('');
  const [age, setAge] = useState('');
  // let company = '';
  // let employee = '';
  // let age = '';

  const handleGoogleResponse = (response: any) => {
    // console.log(response);
    if (response.error) {
      setAuthFailed(response.error);
    } else {
      initiateSignin({
        idToken: response.tokenId,
        company: company,
        employee: employee,
        age: age,
        authType: "google",
      });
    }
  };

  const handleCompany = (response: any) => {
    // console.log(response.nativeEvent.data)
    // if(response.nativeEvent.data!=null)
    //   company = company + response.nativeEvent.data
    // else
    //   company = company.slice(0, -1)
    
    if(response.nativeEvent.data!=null)
      setCompany(company + response.nativeEvent.data)
    else
      setCompany(company.slice(0, -1))
    
    console.log(company);
  };

  const handleEmployee = (response: any) => {
    // if(response.nativeEvent.data!=null)
    //   employee = employee + response.nativeEvent.data
    // else
    //   employee = employee.slice(0, -1)

    if(response.nativeEvent.data!=null)
      setEmployee(employee + response.nativeEvent.data)
    else
      setEmployee(employee.slice(0, -1))
    
    console.log(employee)
  };

  const handleAge = (response: any) => {
    // if(response.nativeEvent.data!=null)
    //   age = age + response.nativeEvent.data
    // else
    //   age = age.slice(0, -1)

    if(response.nativeEvent.data!=null)
      setAge(age + response.nativeEvent.data)
    else
      setAge(age.slice(0, -1))
    
    console.log(age)
  };

  return (
    <div className={s.login}>
      <img src={webLogo} alt="app-icon" />
      {/* <p>Загрузка</p> */}
      <p>Войдите с помощью Google</p>
      {authLoading ? (
        <div className={s.loading}>
          <CircularProgress size="19px" color="inherit" />
        </div>
      ) : (
        <div className={s.loginControls}>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleResponse}
            clientId={process.env.REACT_APP_GAUTH_CLIENT_ID as string}
            render={(props: any) => (
              <button onClick={props.onClick} disabled={props.disabled}>
                Войти
              </button>
            )}
            cookiePolicy={"single_host_origin"}
          />
          <button className={s.buttonKnow}>
            Узнать больше
          </button>
          <button className={s.buttonConnect} >
            Связаться с представителем системы
          </button>
        </div>
      )}
    </div>
  );
});
