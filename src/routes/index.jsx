import { Route, Routes } from 'react-router-dom';

import Pdf from '../pages/pdf';
import Edit from '../pages/edit';
import Home from '../pages/home';
import Login from '../pages/login';
import Listing from '../pages/listing';
import Holidays from '../pages/holidays';
import Developers from '../pages/developers';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/pdf/:id/:idCourse" exact element={<Pdf />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/edit/:id/:idCourse" element={<Edit />} />
        </Routes>
    );
}