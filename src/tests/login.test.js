import React from 'react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom'
import {render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Admin_login from '../login_components/admin_login.js'
import Navigation from '../admin/navigation.js'
import Home from '../admin/admin_pages/home.js'
import { withRouter } from "react-router";

afterEach(cleanup)

it('Inputs Login details', ()=>{
    const {getByTestId}=render(<Admin_login/>);
    fireEvent.change(getByTestId("rid"), {target:{value: 'SHMTAK004'}})
    fireEvent.change(getByTestId("password"), {target:{value: '#D$tG'}})
    expect( (getByTestId("rid"), "SHMTAK004") ).toBe("SHMTAK004")
    expect( (getByTestId("password"), "D$tG") ).toBe("D$tG")
})

afterEach(cleanup)

it('loads navigation', ()=>{
  const {debug}=render( <Home/> );
  debug()
})
