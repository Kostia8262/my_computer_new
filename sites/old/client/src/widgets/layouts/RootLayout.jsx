import { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ModalContext } from '../../app/providers/ModalProvider'
import { DataProvider } from '../../app/providers/DataProvider'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ScrollToTop } from '../../shared/ui/ScrollTop'
import ModalSuccess from '../../modals/ModalSuccess'
import ModalOrder from '../../modals/ModalOrder'
import { ModalConsult } from '../../modals/ModalConsult'
import { ModalCookie } from '../../modals/ModalCookie'

import { ModalDiscount } from '../../modals/ModalDiscount'
import { getDiscounts } from '../../api'
import { initGA, pageview } from '../../utlis/analytics';

const RootLayout = () => {
    const { isModalOpen } = useContext(ModalContext);
    const [discount, setDiscount] = useState(null);
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);

    const location = useLocation();
    const [consent, setConsent] = useState(
        localStorage.getItem("ga_consent") !== "false"
    );

    useEffect(() => {
        getDiscounts()
            .then(data => {
                if (data.length === 0) throw new Error("No discounts found");
                setDiscount(data[0])
            })
            .then(() => { setDiscountModalOpen(true) })
            .catch(e => console.error(e))
    }, [])

    useEffect(() => {
        if (consent) {
            initGA();
        }
    }, [consent]);

    useEffect(() => {
        pageview(location.pathname + location.search);
    }, [location]);

    return (
        <DataProvider>
            <div className='global_wrapper'>
                <ScrollToTop />
                <Navbar />
                <Outlet />
                <Footer />
                {isModalOpen('success') ? <ModalSuccess /> : ""}
                {isModalOpen('order') ? <ModalOrder /> : ""}
                {isModalOpen('consult') ? <ModalConsult /> : ""}

                <ModalDiscount
                    open={isDiscountModalOpen}
                    onClose={() => { setDiscountModalOpen(false) }}
                    discount={discount}
                />
                <ModalCookie />
            </div>
        </DataProvider>
    )
}

export default RootLayout