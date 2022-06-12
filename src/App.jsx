import * as React from "react";
import "./styles/output.css";


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMessage } from "./actions/messageAction";
import Landing from "./views/Landing";
import Search from "./views/Search";
import Login from "./views/Login";
import Register from './views/Register';
import ViewRestaurant from "./views/ViewRestaurant";
import Menu from "./views/Menu";
import CardPaymentReceived from "./components/Payment/CardPaymentReceived";
import Checkout from "./views/Checkout";
import FlutterwaveRedirect from "./components/Payment/FlutterwaveRedirect";
import ClientOrders from "./views/ClientOrders";
import InitiateResetPassword from "./views/InitiateResetPassword";
import ResetPasswordConfirmation from "./views/ResetPasswordConfirmation";
import PageNotFound from "./views/PageNotFound";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

function PublicRoute({ children, ...rest }) {
  if (!sessionStorage.getItem("token")) {
    localStorage.removeItem("user");
  }
  return (
    <Route
      {...rest}
      render={() => {
        return !sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(clearMessage());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/register">
          <Register />
        </PublicRoute>
        <PublicRoute exact path="/reset-password">
          <InitiateResetPassword />
        </PublicRoute>
        <PublicRoute exact path="/reset-password-confirmation">
          <ResetPasswordConfirmation />
        </PublicRoute>
        <Route exact path="/restaurants/:id">
          <ViewRestaurant />
        </Route>
        <PrivateRoute exact path="/restaurants/:id/menu">
          <Menu />
        </PrivateRoute>
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <Route exact path="/payment-initiated">
          <FlutterwaveRedirect />
        </Route>
        <PrivateRoute exact path="/payment-done">
          <CardPaymentReceived />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <ClientOrders />
        </PrivateRoute>
        
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
