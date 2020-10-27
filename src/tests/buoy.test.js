import React from 'react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import {render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { withRouter } from "react-router";
import Buoy_Form from '../buoy_form.js';

afterEach(cleanup)

it('Buoy form renders', ()=>{
    const {getByTestId}=render(<Buoy_Form/>);
    fireEvent.change(getByTestId("buoy_tag"), {target:{value: 'stormer'}})
    fireEvent.change(getByTestId("buoy_link"), {target:{value: 'link'}})
    fireEvent.change(getByTestId("param1"), {target:{value: 'temperature'}})
    fireEvent.change(getByTestId("param2"), {target:{value: 'pressure'}})

    expect( (getByTestId("buoy_tag"), "stormer") ).toBe("stormer")
    expect( (getByTestId("buoy_link"), "link") ).toBe("link")
    expect( (getByTestId("param1"), "temperature") ).toBe("temperature")
    expect( (getByTestId("param2"), "pressure") ).toBe("pressure")
})
