import React from 'react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,} from '@testing-library/dom'
import {render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Extract_page from '../extract_page.js'
import { withRouter } from "react-router";

const csvFilePath='C:/Users/takudzwa shumbamhini/OneDrive/Documents/FINAL_YEAR/2nd_Semester/EEE4022S/datasets/Black_pearl.csv';

afterEach(cleanup)

it('Inputs Login details', ()=>{
    const {getByTestId}=render(<Extract_page/>);
    fireEvent.change(getByTestId("file_input"), {target:{value: csvFilePath}})
    expect( (getByTestId("file_input"), csvFilePath) ).toBe(csvFilePath)
})
