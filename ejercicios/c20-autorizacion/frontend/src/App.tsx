import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import Login from "./pages/login";
import {
  SinPermiso,
} from "./pages/SinPermiso";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  PrivateRoute,
} from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/sin-permiso"
            element={
              <SinPermiso />
            }
          />

          <Route
            path="/catalogo"
            element={<Catalogo />}
          />

          <Route
            path="/libros/:id"
            element={
              <LibroDetalle />
            }
          />

          <Route
            element={
              <PrivateRoute
                rol="ADMIN"
              />
            }
          >
            <Route
              path="/libros/nuevo"
              element={
                <LibroNuevo />
              }
            />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;