import React from "react";
import BookList from "../BookList";
import {cleanup, render} from "@testing-library/react";

afterEach(cleanup);

test('<BookList/>', () =>{
    const {getByTestId} = render(<BookList/>);
    expect(getByTestId("loading")).toBeTruthy();
})