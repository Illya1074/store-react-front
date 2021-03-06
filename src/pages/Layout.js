import '../styles/layout.css';
import React,{ useEffect, lazy, Suspense, useState} from 'react'
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import axios from 'axios'
import '../styles/app.css'
import Loading from '../components/loading';
import { useSelector, useDispatch } from 'react-redux'
import { setMyCategories, setCart, setJwt, setTheme } from '../reducer/reducer'




const ConfirmationPage = lazy(() => import('../components/confirmationPage'))
const Signup = lazy(() => import('../components/signup'))
const Signin = lazy(() => import('../components/signin'))
const Home = lazy(() => import ('../components/HomeComponent'))
const NavbarPage = lazy(() => import('./NavbarPage'))
const CartPage = lazy(() => import('./CartPage'))
const ProductPage = lazy(() => import('./ProductPage'))
// import i18next from "i18next";



function App() {
  const state = useSelector((state) => state.state)
  const [navbarUploaded, setNavbarUploaded] = useState(false) 
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
      axios.get(`/categories`)
      .then(res => {
        // setMyCategories(res.data);
        setNavbarUploaded(true)
        console.log('here my data')
        dispatch(setMyCategories(res.data))
        // console.log(res.data[1]['under_categories'][0].id)
      })
      .catch((error) => console.log(error.message));
  }, [state.jwt]);


  return (
    <div className={state.theme == 'light' ? 'theme-light' : 'theme-dark'}>
      <div className='app'>
      </div>
        <Suspense fallback={<Loading/>}>
          <NavbarPage />

          <Switch>
              <Route exact path="/" >
                <Redirect to="/home"/> 
              </Route>
              <Route path="/home" >
                <Home theme={state.theme} myJwt={state.jwt}/>
              </Route>
              <Route path="/cart" >
                <CartPage cart={state.cart}/> 
              </Route>
              {/* <Route path="/buy" >
                {state.jwt ?  <BuyPage /> : <Redirect to="/signup"/>}
              </Route> */}
              <Route path="/confirmed" >
                <ConfirmationPage/>
              </Route>
              <Route path="/signup" >
                <Signup setMyJwt={(val) => dispatch(setJwt(val))}/>
              </Route>
              <Route  path="/signin" >
                <Signin setMyJwt={(val) => dispatch(setJwt(val))}/>
              </Route>
              { 
                state.myCategories.map((item, key) =>
                  <Route key={key} path={`/${item.Name}`}>
                    <ProductPage currentCategories={item['under_categories']} id={item['under_categories'][0].id}/>
                  </Route>
                )
              }
            
            </Switch>
        </Suspense>
        
      
      {/*  onClick={() => dispatch(increment())} */}

    </div>
  );
}

export default App;
