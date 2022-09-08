import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductContextProvider } from "./Context/ProductContext.jsx";
import Home from "./Home.jsx";
import NoPage from "./NoPage.jsx";
import Wishlist from "./Wishlist.jsx";
import Account from "./Account.jsx";
import ProductPage from "./ProductPage.jsx";
import styled from "styled-components";

const PageWrapper = styled.div`
  height: 100%;
`;

export default function App() {
  return (
    <PageWrapper>
      <ProductContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route exact path="/product/*" element={<ProductPage />} />
              <Route path="/error" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductContextProvider>
    </PageWrapper>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
