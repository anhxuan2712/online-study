import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes } from "./infrastructure/router";
import { PrivateRoute } from "./infrastructure/router/private-router";
import { useRecoilState } from "recoil";
import { ProfileState } from "./core/atoms/profile/profileState";
import authService from "./infrastructure/repositories/auth/service/auth.service";
import { useEffect } from "react";
import { isTokenStoraged } from "./infrastructure/utils/storage";

function App() {
  const [, setProfileState] = useRecoilState(ProfileState);
  const token = isTokenStoraged();
  const getProfileUser = async () => {
    if (token) {
      try {
        await authService.profile(
          () => { }
        ).then((response) => {
          if (response) {
            setProfileState(
              {
                user: response,
              }
            )
          }
        })
      } catch (error) {
        console.error(error);
      }
    }

  }

  useEffect(() => {
    if (token) {
      getProfileUser().then(() => { })
    }
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {privateRoutes.map((page, index) => {
            if (page.private) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <PrivateRoute component={<page.component />} />
                  } />
              )
            }
            else {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <page.component />
                  } />
              )
            }
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
