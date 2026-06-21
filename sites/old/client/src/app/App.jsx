import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ModalProvider } from './providers/ModalProvider/ModalProvider';
import { ThemeProvider } from '@emotion/react';
import theme from '../shared/styles/theme';
import RootLayout from '../widgets/layouts/RootLayout';

import { Course } from '../pages/Course';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { HelmetProvider } from 'react-helmet-async';
import { Blog } from '../pages/Blog';
import { BlogDetail } from '../pages/BlogDetail';
import PrivacyPage from '../pages/legal/PrivacyPage';
import CookiesPage from '../pages/legal/CookiesPage';
import PublicOfferPage from '../pages/legal/PublicOfferPage';
import RefundPage from '../pages/legal/RefundPage';
import TermsPage from '../pages/legal/TermsPage';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout />} >
                <Route path='/' element={<Home />} />
                <Route path='course/:id' element={<Course />} />
                <Route path='posts/' element={<Blog />} />
                <Route path='posts/:id' element={<BlogDetail />} />
                <Route path='privacy/' element={<PrivacyPage />} />
                <Route path='cookies/' element={<CookiesPage />} />
                <Route path='public-offer/' element={<PublicOfferPage />} />
                <Route path='refund/' element={<RefundPage />} />
                <Route path='terms/' element={<TermsPage />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        )
    );

    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
